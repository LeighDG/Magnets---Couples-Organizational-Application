import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackgroundLayout from "../../components/BackgroundLayout";
import LayoutWrapper from "../../components/Layout-Wrapper";

import Invite from "./Invite";
import Waiting from "./Waiting";
import Accept from "./Accept";
import Details from "./Details";
import { RELATIONSHIP_NAV } from "./relationshipNav";

// Later these will come from partnerService
async function mockLookupInviteByCode(code) {
  // Replace with real API call: partnerService.lookupByCode(code)
  if (code === "K3T6-123F" || code === "MAG-482193") {
    return {
      inviterName: "Partner 1",
      inviterEmail: "partner1@email.com",
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    };
  }
  throw new Error("Invalid or expired code");
}

async function mockAcceptInviteByCode(code) {
  // Replace with real API call: partnerService.acceptByCode(code)
  return true;
}

const VIEW = {
  INVITE: "INVITE",
  WAITING: "WAITING",
  JOIN: "JOIN",
  DETAILS: "DETAILS",
};

export default function RelationshipPage() {
  const navigate = useNavigate();

  // In real build this state should come from GET /partner/me + invite status
  const [view, setView] = useState(VIEW.INVITE);

  const sidebarItems = useMemo(() => RELATIONSHIP_NAV, []);
  const activeKey = useMemo(() => {
    if (view === VIEW.INVITE || view === VIEW.WAITING) return "INVITE";
    if (view === VIEW.JOIN) return "JOIN";
    return "DETAILS";
  }, [view]);

  const onSidebarSelect = (key) => {
    if (key === "INVITE") setView(VIEW.INVITE);
    if (key === "JOIN") setView(VIEW.JOIN);
    if (key === "DETAILS") setView(VIEW.DETAILS);
  };

  // Placeholder invite data; later from POST /partner/invite
  const [invite, setInvite] = useState({
    sharedCode: "K3T6-123F",
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    link: `${window.location.origin}/relationship?token=demo`,
  });

  const onCreateInvite = async () => {
    // later: const data = await partnerService.createInvite()
    // setInvite(data)
    setView(VIEW.WAITING);
  };

  const onCopyCode = async () => {
    await navigator.clipboard.writeText(invite.sharedCode);
  };

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(invite.link);
  };

  const onCancel = async () => {
    // later: await partnerService.revokeInvite(inviteId)
    setView(VIEW.INVITE);
  };

  const lookupInviteByCode = async (code) => {
    return mockLookupInviteByCode(code);
  };

  const acceptInviteByCode = async (code) => {
    await mockAcceptInviteByCode(code);
    // After accept, go to details (or dashboard). Your screenshots show details page next.
    setView(VIEW.DETAILS);
    // or: navigate("/dashboard");
  };

  const relationship = {
    members: [
      { user: { id: "1", firstName: "You", lastName: "", email: "you@email.com" } },
      { user: { id: "2", firstName: "Partner", lastName: "One", email: "partner@email.com" } },
    ],
  };

  return (
    <BackgroundLayout>
      <LayoutWrapper
        sidebarItems={sidebarItems}
        activeSidebarKey={activeKey}
        onSidebarSelect={onSidebarSelect}
      >
        {view === VIEW.INVITE && <Invite onCreateInvite={onCreateInvite} />}

        {view === VIEW.WAITING && (
          <Waiting
            invite={invite}
            onCopyCode={onCopyCode}
            onCopyLink={onCopyLink}
            onCancel={onCancel}
          />
        )}

        {view === VIEW.JOIN && (
          <Accept
            lookupInviteByCode={lookupInviteByCode}
            acceptInviteByCode={acceptInviteByCode}
          />
        )}

        {view === VIEW.DETAILS && <Details relationship={relationship} />}
      </LayoutWrapper>
    </BackgroundLayout>
  );
}