import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm opacity-70">Loading...</p>
      </div>
    );
  }

  if (!token || !user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return (
      <Navigate to={`/login?next=${next}`} replace/>
      );
  }

  return <Outlet />;
}
