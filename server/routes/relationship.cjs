const express = require("express");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const requireAuth = require("../middleware/requireAuth.cjs");

const prisma = new PrismaClient();
const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const INVITE_TTL_HOURS = 48;

function sha256(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

// Human-friendly key generation:
// MAG-482193 or MAG-19KF3A etc.
// Keep it simple: numbers only reduces brute-force space, but easiest for users.
// Base32 increases space while staying readable.
// We'll do base32-ish without confusing chars (no O/0, I/1).
const CODE_CHARS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function randomCode(len = 8) {
  const bytes = crypto.randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) {
    out += CODE_CHARS[bytes[i] % CODE_CHARS.length];
  }
  return out;
}

async function generateUniqueSharedCode() {
  // format: MAG-XXXXXX (6 chars) or MAG-XXXXXXXX (8 chars)
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = `MAG-${randomCode(6)}`;
    const exists = await prisma.partnerInvite.findUnique({ where: { sharedCode: code } });
    if (!exists) return code;
  }
  throw new Error("Failed to generate unique invite code");
}

async function getUserRelationship(userId) {
  // A user can only belong to one relationship for MVP.
  const membership = await prisma.relationshipMember.findFirst({
    where: { userId },
    include: {
      relationship: {
        include: {
          members: { include: { user: true } },
        },
      },
    },
  });

  return membership?.relationship || null;
}

async function expireInviteIfNeeded(invite) {
  if (!invite) return invite;
  if (invite.status !== "PENDING") return invite;
  if (invite.expiresAt > new Date()) return invite;

  // Mark expired
  return prisma.partnerInvite.update({
    where: { id: invite.id },
    data: { status: "EXPIRED" },
    include: { inviter: true, relationship: true },
  });
}

/**
 * GET /relationship/me
 * Returns:
 * - state: "UNLINKED" | "WAITING" | "LINKED"
 * - invite (if waiting)
 * - relationship (if linked)
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const relationship = await getUserRelationship(userId);
    if (relationship && relationship.status === "ACTIVE") {
      return res.json({
        state: "LINKED",
        relationship: {
          id: relationship.id,
          status: relationship.status,
          members: relationship.members.map((m) => ({
            user: {
              id: m.user.id,
              firstName: m.user.firstName,
              lastName: m.user.lastName,
              email: m.user.email,
            },
          })),
        },
      });
    }

    // If user has a relationship but pending (inviter created and waiting)
    if (relationship) {
      // Find newest pending invite created by this user for this relationship
      let invite = await prisma.partnerInvite.findFirst({
        where: {
          relationshipId: relationship.id,
          inviterUserId: userId,
          status: "PENDING",
        },
        orderBy: { createdAt: "desc" },
      });

      invite = await expireInviteIfNeeded(invite);

      if (invite && invite.status === "PENDING") {
        return res.json({
          state: "WAITING",
          invite: {
            sharedCode: invite.sharedCode,
            expiresAt: invite.expiresAt,
            // We never return raw token again once created (token only shown on creation)
          },
          relationship: { id: relationship.id, status: relationship.status },
        });
      }

      // No active invite and relationship isn't active -> treat as unlinked for UI purposes
      return res.json({ state: "UNLINKED" });
    }

    return res.json({ state: "UNLINKED" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch relationship status" });
  }
});

/**
 * POST /relationship/invite
 * Creates:
 * - Relationship (PENDING)
 * - RelationshipMember for inviter
 * - PartnerInvite (PENDING) with tokenHash + sharedCode
 * Returns:
 * - sharedCode, expiresAt, link (with raw token)
 */
router.post("/invite", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Guard: user cannot create invite if already in active relationship
    const existingRel = await getUserRelationship(userId);
    if (existingRel && existingRel.status === "ACTIVE") {
      return res.status(409).json({ message: "You are already linked to a partner" });
    }

    // If they had a pending relationship, reuse it (optional). For MVP, easiest is:
    // - If pending relationship exists, revoke old invites and create a new invite on the same relationship.
    let relationship = existingRel;

    if (!relationship) {
      relationship = await prisma.relationship.create({
        data: {
          status: "PENDING",
          members: {
            create: { userId },
          },
        },
        include: { members: true },
      });
    }

    // Enforce max 2 members (MVP)
    const memberCount = await prisma.relationshipMember.count({
      where: { relationshipId: relationship.id },
    });

    if (memberCount >= 2) {
      return res.status(409).json({
        message: "This relationship is already full",
      });
    }


    // Revoke any existing pending invites for this relationship created by this user
    await prisma.partnerInvite.updateMany({
      where: {
        relationshipId: relationship.id,
        inviterUserId: userId,
        status: "PENDING",
      },
      data: { status: "REVOKED", revokedAt: new Date() },
    });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(rawToken);
    const sharedCode = await generateUniqueSharedCode();

    const expiresAt = new Date(Date.now() + INVITE_TTL_HOURS * 60 * 60 * 1000);

    const invite = await prisma.partnerInvite.create({
      data: {
        relationshipId: relationship.id,
        inviterUserId: userId,
        tokenHash,
        sharedCode,
        expiresAt,
        status: "PENDING",
      },
    });

    const link = `${CLIENT_URL}/relationship?token=${rawToken}`;

    return res.status(201).json({
      sharedCode: invite.sharedCode,
      expiresAt: invite.expiresAt,
      link,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to create invite" });
  }
});

/**
 * POST /relationship/lookup-code
 * Body: { code }
 * Returns inviter preview info for auto-preview UI.
 */
router.post("/lookup-code", requireAuth, async (req, res) => {
  try {
    const code = String(req.body?.code || "").trim().toUpperCase();
    if (!code) return res.status(400).json({ message: "Missing code" });

    let invite = await prisma.partnerInvite.findFirst({
      where: {
        sharedCode: code,
        status: "PENDING",
      },
      include: { inviter: true },
      orderBy: { createdAt: "desc" },
    });

    invite = await expireInviteIfNeeded(invite);

    if (!invite || invite.status !== "PENDING") {
      return res.status(404).json({ message: "Invalid or expired code" });
    }

    // Prevent self-link preview confusion
    if (invite.inviterUserId === req.user.id) {
      return res.status(400).json({ message: "You cannot use your own invite code" });
    }

    return res.json({
      inviterName: `${invite.inviter.firstName} ${invite.inviter.lastName}`,
      inviterEmail: invite.inviter.email,
      expiresAt: invite.expiresAt,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to lookup code" });
  }
});

/**
 * POST /relationship/accept-code
 * Body: { code }
 * Joins relationship + marks invite accepted + activates relationship.
 */
router.post("/accept-code", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const code = String(req.body?.code || "").trim().toUpperCase();
    if (!code) return res.status(400).json({ message: "Missing code" });

    // Guard: user cannot already be in active relationship
    const existingRel = await getUserRelationship(userId);
    if (existingRel && existingRel.status === "ACTIVE") {
      return res.status(409).json({ message: "This account is already linked to a partner" });
    }

    let invite = await prisma.partnerInvite.findFirst({
      where: { sharedCode: code, status: "PENDING" },
      include: { relationship: true },
      orderBy: { createdAt: "desc" },
    });

    invite = await expireInviteIfNeeded(invite);

    if (!invite || invite.status !== "PENDING") {
      return res.status(404).json({ message: "Invalid or expired code" });
    }

    if (invite.inviterUserId === userId) {
      return res.status(400).json({ message: "You cannot accept your own invite" });
    }

    // Transaction: add member + accept invite + activate relationship
    const result = await prisma.$transaction(async (tx) => {
      // Ensure relationship still exists
      const relationship = await tx.relationship.findUnique({
        where: { id: invite.relationshipId },
        });
            if (!relationship) throw new Error("Relationship not found");

            // Enforce max 2 members for MVP
            const memberCount = await tx.relationshipMember.count({
            where: { relationshipId: invite.relationshipId },
            });

            if (memberCount >= 2) {
            // Optionally expire/revoke the invite to avoid reuse
            await tx.partnerInvite.update({
                where: { id: invite.id },
                data: { status: "EXPIRED" },
            });

            // Throw to abort transaction
            const err = new Error("This relationship is already full");
            err.statusCode = 409;
            throw err;
            }

            // Add membership
            await tx.relationshipMember.create({
            data: {
                relationshipId: invite.relationshipId,
                userId,
            },
        });

      // Mark invite accepted
      await tx.partnerInvite.update({
        where: { id: invite.id },
        data: {
          status: "ACCEPTED",
          acceptedAt: new Date(),
          acceptedByUserId: userId,
        },
      });

      // Activate relationship
      const updatedRelationship = await tx.relationship.update({
        where: { id: invite.relationshipId },
        data: { status: "ACTIVE" },
        include: {
          members: { include: { user: true } },
        },
      });

      return updatedRelationship;
    });

    return res.json({
      message: "Linked successfully",
      relationship: {
        id: result.id,
        status: result.status,
        members: result.members.map((m) => ({
          user: {
            id: m.user.id,
            firstName: m.user.firstName,
            lastName: m.user.lastName,
            email: m.user.email,
          },
        })),
      },
    });
  } catch (e) {
    console.error(e);
    // Prisma unique constraint errors etc.
   const status = e.statusCode || 500;
return res.status(status).json({ message: e.message || "Failed to accept invite" });

  }
});

/**
 * POST /relationship/accept-token
 * Body: { token }
 * Same as accept-code but uses the long link token.
 */
router.post("/accept-token", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const token = String(req.body?.token || "").trim();
    if (!token) return res.status(400).json({ message: "Missing token" });

    const tokenHash = sha256(token);

    let invite = await prisma.partnerInvite.findFirst({
      where: { tokenHash, status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });

    invite = await expireInviteIfNeeded(invite);

    if (!invite || invite.status !== "PENDING") {
      return res.status(404).json({ message: "Invalid or expired invite" });
    }

    if (invite.inviterUserId === userId) {
      return res.status(400).json({ message: "You cannot accept your own invite" });
    }

    // Reuse accept logic via code path is possible, but keep it explicit for clarity
    const result = await prisma.$transaction(async (tx) => {
  // Enforce max 2 members for MVP
  const memberCount = await tx.relationshipMember.count({
    where: { relationshipId: invite.relationshipId },
  });

  if (memberCount >= 2) {
    await tx.partnerInvite.update({
      where: { id: invite.id },
      data: { status: "EXPIRED" },
    });

    const err = new Error("This relationship is already full");
    err.statusCode = 409;
    throw err;
  }

  await tx.relationshipMember.create({
    data: { relationshipId: invite.relationshipId, userId },
  });

  await tx.partnerInvite.update({
    where: { id: invite.id },
    data: { status: "ACCEPTED", acceptedAt: new Date(), acceptedByUserId: userId },
  });

  return tx.relationship.update({
    where: { id: invite.relationshipId },
    data: { status: "ACTIVE" },
    include: { members: { include: { user: true } } },
  });
});


    return res.json({
      message: "Linked successfully",
      relationship: {
        id: result.id,
        status: result.status,
        members: result.members.map((m) => ({
          user: {
            id: m.user.id,
            firstName: m.user.firstName,
            lastName: m.user.lastName,
            email: m.user.email,
          },
        })),
      },
    });
  } catch (e) {
  console.error(e);
  const status = e.statusCode || 500;
  return res.status(status).json({ message: e.message || "Failed to accept invite" });
}
});

/**
 * POST /relationship/revoke
 * Revokes latest pending invite created by this user (optional).
 */
router.post("/revoke", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const relationship = await getUserRelationship(userId);
    if (!relationship) return res.status(404).json({ message: "No relationship found" });

    const invite = await prisma.partnerInvite.findFirst({
      where: {
        relationshipId: relationship.id,
        inviterUserId: userId,
        status: "PENDING",
      },
      orderBy: { createdAt: "desc" },
    });

    if (!invite) return res.status(404).json({ message: "No pending invite to revoke" });

    await prisma.partnerInvite.update({
      where: { id: invite.id },
      data: { status: "REVOKED", revokedAt: new Date() },
    });

    return res.json({ message: "Invite revoked" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to revoke invite" });
  }
});

module.exports = router;
