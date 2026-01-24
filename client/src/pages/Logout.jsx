import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // clear auth
    logout();

    // clear any invite/link residue your app stores
    Object.keys(localStorage)
      .filter((k) => k.startsWith("inviteLink:"))
      .forEach((k) => localStorage.removeItem(k));

    // IMPORTANT: go to a clean login with NO next=
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return null;
}
