// src/pages/relationship/RelationshipPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LayoutWrapper from "../../components/Layout-Wrapper";

import Invite  from "./Invite";
import Waiting from "./Waiting";
import Accept  from "./Accept";
import Details from "./Details";
import RelationshipNav from "./RelationshipNavBar";

import * as relationshipService from "../../services/relationshipService";
import useRealtimeStream from "../../hooks/useRealtimeStream.cjs";

// ── View constants ─────────────────────────────────────────────────────────────

const VIEW = {
  INVITE:  "INVITE",
  WAITING: "WAITING",
  JOIN:    "JOIN",
  DETAILS: "DETAILS",
};

// ── Nav visibility rules ───────────────────────────────────────────────────────
//
//  State 1 — unlinked, no pending invite    → [ INVITE,   JOIN ]
//  State 2 — unlinked, invite sent (waiting)→ [ WAITING*, JOIN ]   * locked / amber
//  State 3 — unlinked, user joining         → [ INVITE,   JOIN ]   JOIN is active
//  State 4 — linked                         → [ DETAILS ]
//
//  INVITE/WAITING/JOIN are NEVER shown when linked.
//  DETAILS is NEVER shown when not linked.

function visibleNavKeys(view) {
  switch (view) {
    case VIEW.DETAILS: return [VIEW.DETAILS];
    case VIEW.WAITING: return [VIEW.WAITING, VIEW.JOIN];
    case VIEW.JOIN:    return [VIEW.INVITE,  VIEW.JOIN];
    default:           return [VIEW.INVITE,  VIEW.JOIN];  // INVITE view
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function RelationshipPage() {
  const navigate     = useNavigate();
  const query        = useQuery();
  const codeFromLink = query.get("code");

  const [view,         setView]         = useState(VIEW.INVITE);
  const [loading,      setLoading]      = useState(true);
  const [pageError,    setPageError]    = useState("");
  const [invite,       setInvite]       = useState(null);
  const [relationship, setRelationship] = useState(null);

  const navKeys  = useMemo(() => visibleNavKeys(view), [view]);
  const activeKey = view;

  // ── Nav selection ──────────────────────────────────────────────────────────
  // WAITING is a locked state — it cannot be selected directly.
  // DETAILS is only reachable when linked (navKeys won't include it otherwise).
  // INVITE is blocked when in WAITING (user must cancel first via the Waiting UI).
  const onNavSelect = (key) => {
    if (key === VIEW.WAITING) return;             // locked — no direct nav
    if (key === VIEW.DETAILS && view !== VIEW.DETAILS) return; // shouldn't be visible anyway
    if (key === VIEW.INVITE  && view === VIEW.WAITING) return; // must cancel invite first
    setView(key);
  };

  // ── Bootstrap: determine correct state on every page load / return ─────────
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setLoading(true);
      setPageError("");

      try {
        const data = await relationshipService.getMyRelationship();

        if (cancelled) return;

        // State 3 — user is linked → always DETAILS, no other views available
        if (data.state === "LINKED") {
          setRelationship(data.relationship);
          setInvite(null);
          setView(VIEW.DETAILS);
          // Strip any stale ?code= from the URL
          if (codeFromLink) navigate("/relationship", { replace: true });
          return;
        }

        // State 5 — user generated an invite and returned to the page
        if (data.state === "WAITING") {
          setInvite({
            sharedCode: data.invite?.sharedCode || null,
            expiresAt:  data.invite?.expiresAt  || null,
            // The real shareable link is only returned on creation;
            // reconstruct the code-based link for the waiting screen.
            link: data.invite?.sharedCode
              ? `${window.location.origin}/relationship?code=${encodeURIComponent(data.invite.sharedCode)}`
              : `${window.location.origin}/relationship`,
          });
          setRelationship(null);
          setView(VIEW.WAITING);
          return;
        }

        // State 2 — user arrived via an invite link → go straight to JOIN
        if (codeFromLink) {
          setRelationship(null);
          setInvite(null);
          setView(VIEW.JOIN);
          return;
        }

        // State 1 — unlinked, nothing pending
        setRelationship(null);
        setInvite(null);
        setView(VIEW.INVITE);

      } catch (e) {
        if (!cancelled) setPageError(e.message || "Failed to load relationship state");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    boot();
    return () => { cancelled = true; };
  }, [codeFromLink, navigate]);

  // ── Actions ────────────────────────────────────────────────────────────────

  // State 1 → State 2
  const onCreateInvite = async () => {
    setPageError("");
    try {
      const data = await relationshipService.createInvite();
      setInvite({
        sharedCode: data.sharedCode,
        expiresAt:  data.expiresAt,
        link:       data.link,
      });
      setView(VIEW.WAITING);
    } catch (e) {
      setPageError(e.message || "Failed to create invite");
    }
  };

  const onCopyLink = async () => {
    if (invite?.link) await navigator.clipboard.writeText(invite.link);
  };

  // State 2 → State 1 (cancel invite)
  const onCancel = async () => {
    setPageError("");
    try {
      await relationshipService.revokeInvite();
      setInvite(null);
      setView(VIEW.INVITE);
    } catch (e) {
      setPageError(e.message || "Failed to cancel invite");
    }
  };

  const lookupInviteByCode = (code) => relationshipService.lookupByCode(code);

  // State 2 acceptee / State 3 for both users
  const acceptInviteByCode = async (code) => {
    const data = await relationshipService.acceptByCode(code);
    setRelationship(data.relationship);
    setInvite(null);
    setView(VIEW.DETAILS);
    navigate("/relationship", { replace: true });
    Object.keys(localStorage)
      .filter(k => k.startsWith("inviteLink:"))
      .forEach(k => localStorage.removeItem(k));
  };

  // State 3 → State 4 (unlink → back to INVITE)
  const onUnlink = async () => {
    setPageError("");
    const ok = window.confirm(
      "Are you sure you want to unlink? Shared features will stop syncing."
    );
    if (!ok) return;
    try {
      await relationshipService.unlinkRelationship();
      setRelationship(null);
      setInvite(null);
      setView(VIEW.INVITE);
    } catch (e) {
      setPageError(e.message || "Failed to unlink relationship");
    }
  };

  // ── Real-time events ───────────────────────────────────────────────────────

  useRealtimeStream({
    // Partner accepted → inviter jumps to DETAILS (State 2 → State 3)
    onRelationshipLinked: async () => {
      try {
        const data = await relationshipService.getMyRelationship();
        if (data.state === "LINKED") {
          setRelationship(data.relationship);
          setInvite(null);
          setView(VIEW.DETAILS);
          navigate("/relationship", { replace: true });
        }
      } catch { /* ignore */ }
    },

    // Either user unlinked remotely → both go back to INVITE (State 4)
    onRelationshipUnlinked: () => {
      Object.keys(localStorage)
        .filter(k => k.startsWith("inviteLink:"))
        .forEach(k => localStorage.removeItem(k));
      setRelationship(null);
      setInvite(null);
      setView(VIEW.INVITE);
    },
  });

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <LayoutWrapper pageTitle="Your Relationship" >
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 pb-28">

          {loading && (
            <div className="max-w-4xl mx-auto mt-12 px-4 text-white text-sm opacity-60 tracking-wide">
              Loading...
            </div>
          )}

          {!loading && pageError && (
            <div className="max-w-4xl mx-auto mt-12 px-4">
              <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-4 py-3 rounded text-sm">
                {pageError}
              </div>
            </div>
          )}

          {/* State 1 — unlinked, no invite */}
          {!loading && !pageError && view === VIEW.INVITE && (
            <Invite onCreateInvite={onCreateInvite} />
          )}

          {/* State 2 / State 5 — invite sent, awaiting partner */}
          {!loading && !pageError && view === VIEW.WAITING && (
            <Waiting invite={invite} onCopyLink={onCopyLink} onCancel={onCancel} />
          )}

          {/* State 2 (acceptee) — arrived via invite link or navigated to JOIN */}
          {!loading && !pageError && view === VIEW.JOIN && (
            <Accept
              initialCode={codeFromLink || ""}
              lookupInviteByCode={lookupInviteByCode}
              acceptInviteByCode={acceptInviteByCode}
            />
          )}

          {/* State 3 — linked */}
          {!loading && !pageError && view === VIEW.DETAILS && (
            <Details relationship={relationship} onUnlink={onUnlink} />
          )}

        </main>
      </div>

      {/* Floating bottom nav — rendered after loading resolves */}
      {!loading && (
        <RelationshipNav
          visibleKeys={navKeys}
          activeKey={activeKey}
          onSelect={onNavSelect}
        />
      )}
    </LayoutWrapper>
  );
}