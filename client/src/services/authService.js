import { apiClient } from "./apiClient";

export function signup({ firstName, lastName, email, password }) {
  return apiClient("/auth/signup", {
    method: "POST",
    body: { firstName, lastName, email, password },
  });
}

export function login({ email, password }) {
  return apiClient("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function me() {
  return apiClient("/auth/me");
}
