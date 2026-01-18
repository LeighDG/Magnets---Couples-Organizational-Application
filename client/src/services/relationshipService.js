// src/services/relationshipService.js
import { apiClient } from "./apiClient";

// GET /relationship/me
export async function getMyRelationship() {
  return apiClient("/relationship/me", { method: "GET" });
}

// POST /relationship/invite
export async function createInvite() {
  return apiClient("/relationship/invite", { method: "POST" });
}

// POST /relationship/lookup-code
export async function lookupByCode(code) {
  return apiClient("/relationship/lookup-code", {
    method: "POST",
    body: { code },
  });
}

// POST /relationship/accept-code
export async function acceptByCode(code) {
  return apiClient("/relationship/accept-code", {
    method: "POST",
    body: { code },
  });
}

// POST /relationship/accept-token
export async function acceptByToken(token) {
  return apiClient("/relationship/accept-token", {
    method: "POST",
    body: { token },
  });
}

// POST /relationship/revoke (optional)
export async function revokeInvite() {
  return apiClient("/relationship/revoke", { method: "POST" });
}