// src/pages/relationship/RelationshipPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BackgroundLayout from "../../components/BackgroundLayout";
import LayoutWrapper from "../../components/Layout-Wrapper";

import Invite from "./Invite";
import Waiting from "./Waiting";
import Accept from "./Accept";
import Details from "./Details";
import { RELATIONSHIP_NAV } from "./relationshipNav";

import * as relationshipService from "../../services/relationshipService";
import useRealtimeStream from "../../hooks/useRealtimeStream.cjs";


const VIEW = {
  INVITE: "INVITE",
  WAITING: "WAITING",
  JOIN: "JOIN",
  DETAILS: "DETAILS",
};

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function RelationshipPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const codeFromLink = query.get("code"); // new link format

  const [view, setView] = useState(VIEW.INVITE);
  const [activeKey, setActiveKey] = useState("INVITE");

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [invite, setInvite] = useState(null);
  const [relationship, setRelationship] = useState(null);

  const sidebarItems = useMemo(() => RELATIONSHIP_NAV, []);

  const onSidebarSelect = (key) => {
    setActiveKey(key);

    if (key === "INVITE") setView(invite ? VIEW.WAITING : VIEW.INVITE);
    if (key === "JOIN") setView(VIEW.JOIN);
    if (key === "DETAILS") setView(VIEW.DETAILS);
  };

  // Bootstrap state from backend: /relationship/me
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setLoading(true);
      setPageError("");

      try {
        const data = await relationshipService.getMyRelationship();

        // If user arrived via invite link, force JOIN view and keep code
        if (codeFromLink) {
          setRelationship(null);
          setInvite(null);
          setView(VIEW.JOIN);
          setActiveKey("JOIN");
          return;
        }


        if (cancelled) return;

        if (data.state === "LINKED") {
          setRelationship(data.relationship);
          setInvite(null);
          setView(VIEW.DETAILS);
          setActiveKey("DETAILS");
          return;
        }

        if (data.state === "WAITING") {
          // /relationship/me does NOT return link token; we’ll reconstruct link client-side
          const link = `${window.location.origin}/relationship`; // token only returned when created
          setInvite({
            sharedCode: data.invite?.sharedCode || null,
            expiresAt: data.invite?.expiresAt || null,
            link: link, // placeholder; real link shown only right after creation
          });
          setRelationship(null);
          setView(VIEW.WAITING);
          setActiveKey("INVITE");
          return;
        }

        // UNLINKED (default)
        setRelationship(null);
        setInvite(null);
        setView(VIEW.INVITE);
        setActiveKey("INVITE");

      } catch (e) {
        if (!cancelled) setPageError(e.message || "Failed to load relationship state");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [codeFromLink, navigate]);

  // Create invite (real)
  const onCreateInvite = async () => {
    setPageError("");
    try {
      const data = await relationshipService.createInvite();
      // data: { sharedCode, expiresAt, link }
      setInvite({
        sharedCode: data.sharedCode,
        expiresAt: data.expiresAt,
        link: data.link,
      });
      setView(VIEW.WAITING);
      setActiveKey("INVITE");
    } catch (e) {
      setPageError(e.message || "Failed to create invite");
    }
  };

  const onCopyLink = async () => {
    if (!invite?.link) return;
    await navigator.clipboard.writeText(invite.link);
  };

  const onCancel = async () => {
    setPageError("");
    try {
      await relationshipService.revokeInvite();
      setInvite(null);
      setView(VIEW.INVITE);
      setActiveKey("INVITE");
    } catch (e) {
      setPageError(e.message || "Failed to cancel invite");
    }
  };

  // Accept page hooks
  const lookupInviteByCode = async (code) => {
    return relationshipService.lookupByCode(code);
  };

  const acceptInviteByCode = async (code) => {
   const data = await relationshipService.acceptByCode(code);

  setRelationship(data.relationship);
  setInvite(null);
  setView(VIEW.DETAILS);
  setActiveKey("DETAILS");

  // remove ?code= from the URL once accepted
  navigate("/relationship", { replace: true });

  // clear any invite residue your app stores
  Object.keys(localStorage)
    .filter((k) => k.startsWith("inviteLink:"))
    .forEach((k) => localStorage.removeItem(k));

  };

  const onUnlink = async () => {
  setPageError("");
  try {
    const ok = window.confirm(
      "Are you sure you want to unlink? Shared features will stop syncing."
    );
    if (!ok) return;

    await relationshipService.unlinkRelationship();

    // Reset UI state to unlinked
    setRelationship(null);
    setInvite(null);
    setView(VIEW.INVITE);
    setActiveKey("INVITE");
  } catch (e) {
    setPageError(e.message || "Failed to unlink relationship");
  }
};

  // Real-time: when partner accepts, jump inviter to DETAILS
  useRealtimeStream({
    onRelationshipLinked: async () => {
      try {
        const data = await relationshipService.getMyRelationship();
        if (data.state === "LINKED") {
          setRelationship(data.relationship);
          setInvite(null);
          setView(VIEW.DETAILS);
          setActiveKey("DETAILS");

          // if user somehow has ?code= in the URL, strip it
          if (codeFromLink) navigate("/relationship", { replace: true });
        }
      } catch {
        // ignore
      }
    },

     onRelationshipUnlinked: async () => {
      // cleanup any stored invite links
      Object.keys(localStorage)
      .filter((k) => k.startsWith("inviteLink:"))
      .forEach((k) => localStorage.removeItem(k));

      // Force reset to unlinked state
      setRelationship(null);
      setInvite(null);
      setView(VIEW.INVITE);
      setActiveKey("INVITE");
  },
  });

  return (
    <BackgroundLayout>
      <LayoutWrapper
        sidebarItems={sidebarItems}
        activeSidebarKey={activeKey}
        onSidebarSelect={onSidebarSelect}
      >
        {loading ? (
          <div className="max-w-4xl mx-auto mt-12 text-white">
            Loading...
          </div>
        ) : null}

        {!loading && pageError ? (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-4 py-3 rounded">
              {pageError}
            </div>
          </div>
        ) : null}

        {!loading && !pageError && view === VIEW.INVITE && (
          <Invite onCreateInvite={onCreateInvite} />
        )}

        {!loading && !pageError && view === VIEW.WAITING && (
          <Waiting invite={invite} onCopyLink={onCopyLink} onCancel={onCancel} />
        )}

        {!loading && !pageError && view === VIEW.JOIN && (
          <Accept
            initialCode={codeFromLink || ""}
            lookupInviteByCode={lookupInviteByCode}
            acceptInviteByCode={acceptInviteByCode}
          />
        )}

        {!loading && !pageError && view === VIEW.DETAILS && (
          <Details relationship={relationship} onUnlink={onUnlink}/>
        )}
      </LayoutWrapper>
    </BackgroundLayout>
  );
}