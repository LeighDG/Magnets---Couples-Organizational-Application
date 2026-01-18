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
  const token = query.get("token");

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
        // If token exists, attempt accept-by-token first (after login, route is protected)
        if (token) {
          const accepted = await relationshipService.acceptByToken(token);

          if (cancelled) return;

          setRelationship(accepted.relationship);
          setInvite(null);
          setView(VIEW.DETAILS);
          setActiveKey("DETAILS");

          // clean URL (remove token)
          navigate("/relationship", { replace: true });
          return;
        }

        const data = await relationshipService.getMyRelationship();
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

        // UNLINKED
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
  }, [token, navigate]);

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
    // data: { relationship }
    setRelationship(data.relationship);
    setInvite(null);
    setView(VIEW.DETAILS);
    setActiveKey("DETAILS");
  };

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
            lookupInviteByCode={lookupInviteByCode}
            acceptInviteByCode={acceptInviteByCode}
          />
        )}

        {!loading && !pageError && view === VIEW.DETAILS && (
          <Details relationship={relationship} />
        )}
      </LayoutWrapper>
    </BackgroundLayout>
  );
}