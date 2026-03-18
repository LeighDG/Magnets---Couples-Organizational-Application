import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate   = useNavigate();
  const { login }  = useAuth();
  const location   = useLocation();

  const next       = new URLSearchParams(location.search).get("next");
  const redirectTo = next ? decodeURIComponent(next) : "/dashboard";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      {/* ── Blobs ── */}
      <div className="blob b1" aria-hidden="true" />
      <div className="blob b2" aria-hidden="true" />
      <div className="blob b3" aria-hidden="true" />

      {/* ── Topbar ── */}
      <header className="auth-topbar">
        <button className="brand" onClick={() => navigate("/")} aria-label="Go to home">
          MAGNETIC
        </button>
      </header>

      {/* ── Card ── */}
      <main className="auth-main">
        <div className="auth-card glass-card">

          {/* Left panel — decorative */}
          <aside className="auth-panel" aria-hidden="true">
            <div className="panel-avatar-pair">
              <div className="av av-green">🧑</div>
              <div className="av av-gold">👩</div>
            </div>
            <p className="panel-title">Welcome back.</p>
            <p className="panel-sub">Pick up right where you left off — your shared space is waiting.</p>
            <div className="panel-pills">
              <div className="pill">📅 Calendar</div>
              <div className="pill">💰 Budget</div>
              <div className="pill">✅ Lists</div>
              <div className="pill">📝 Notes</div>
            </div>
          </aside>

          {/* Right panel — form */}
          <section className="auth-form-panel" aria-label="Login form">
            <div className="form-eyebrow">Welcome back</div>
            <h1 className="form-title">Log in to<br /><em>Magnetic</em></h1>
            <p className="form-sub">Enter your details to continue.</p>

            {error && (
              <div className="error-banner" role="alert">
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label className="field-label" htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  className="field-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Logging in…" : "Log In"}
              </button>
            </form>

            <p className="form-footer">
              Don't have an account?{" "}
              <button
                className="form-link"
                onClick={() => navigate(`/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`)}
              >
                Sign up free
              </button>
            </p>
          </section>
        </div>
      </main>

      <style>{`
        /* ---------- TOKENS ---------- */
        .auth-root {
          --teal-dark:  #1a3d35;
          --teal-mid:   #2d5a4e;
          --teal-light: #4a7c6f;
          --gold:       #e8b84b;
          --white-95:   rgba(255,255,255,0.95);
          --white-90:   rgba(255,255,255,0.90);
          --white-75:   rgba(255,255,255,0.75);
          --white-55:   rgba(255,255,255,0.55);
          --white-45:   rgba(255,255,255,0.45);
          --white-20:   rgba(255,255,255,0.20);
          --white-15:   rgba(255,255,255,0.15);
          --white-12:   rgba(255,255,255,0.12);
          --white-10:   rgba(255,255,255,0.10);
          --white-08:   rgba(255,255,255,0.08);
          --font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          --font-sans:  'DM Sans', system-ui, -apple-system, sans-serif;
        }

        /* ---------- ROOT ---------- */
        .auth-root {
          position: relative;
          min-height: 100svh;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: var(--font-sans);
          background: linear-gradient(145deg, var(--teal-light) 0%, var(--teal-mid) 45%, var(--teal-dark) 100%);
          background: -webkit-linear-gradient(145deg, #4a7c6f 0%, #2d5a4e 45%, #1a3d35 100%);
          overflow-x: hidden;
        }

        /* ---------- BLOBS ---------- */
        .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          -webkit-filter: blur(70px);
          filter: blur(70px);
        }
        .b1 { width: 350px; height: 350px; background: #a8d5c2; top: -100px; left: -60px;  opacity: 0.22; }
        .b2 { width: 260px; height: 260px; background: #e8c97a; bottom: -60px; right: 80px; opacity: 0.16; }
        .b3 { width: 200px; height: 200px; background: #d4a898; top: 200px; right: -30px;   opacity: 0.15; }

        /* ---------- TOPBAR ---------- */
        .auth-topbar {
          position: relative;
          z-index: 10;
          padding: clamp(14px, 2.5vw, 22px) clamp(20px, 5vw, 48px);
        }

        .brand {
          font-family: var(--font-serif);
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 500;
          letter-spacing: 6px;
          color: var(--white-90);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: opacity 0.15s ease;
        }
        .brand:hover         { opacity: 0.75; }
        .brand:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 4px; border-radius: 4px; }

        /* ---------- MAIN ---------- */
        .auth-main {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(16px, 3vw, 32px) clamp(16px, 5vw, 48px) clamp(32px, 5vw, 56px);
        }

        /* ---------- CARD ---------- */
        .auth-card {
          width: 100%;
          max-width: 860px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        @media (min-width: 720px) {
          .auth-card { flex-direction: row; }
        }

        /* ---------- GLASS ---------- */
        .glass-card {
          border-radius: 24px;
          border: 1px solid var(--white-15);
          background: var(--white-10);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }

        @supports not (backdrop-filter: blur(1px)) {
          .glass-card { background: rgba(30, 70, 60, 0.88); }
        }

        /* ---------- LEFT DECORATIVE PANEL ---------- */
        .auth-panel {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          padding: clamp(32px, 4vw, 48px);
          background: var(--white-08);
          border-right: 1px solid var(--white-12);
        }

        @media (min-width: 720px) {
          .auth-panel {
            display: flex;
            flex: 0 0 clamp(220px, 35%, 280px);
          }
        }

        .panel-avatar-pair { display: flex; margin-bottom: 4px; }
        .av {
          width: clamp(40px, 4vw, 52px);
          height: clamp(40px, 4vw, 52px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(18px, 2vw, 24px);
          border: 2.5px solid var(--white-15);
          flex-shrink: 0;
        }
        .av-green { background: rgba(126,212,184,0.3); }
        .av-gold  { background: rgba(232,184,75,0.3); margin-left: -14px; }

        .panel-title {
          font-family: var(--font-serif);
          font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 400;
          color: var(--white-90);
          line-height: 1.2;
        }
        .panel-sub {
          font-size: clamp(11px, 0.9vw, 12px);
          color: var(--white-55);
          line-height: 1.7;
          font-weight: 300;
        }

        .panel-pills {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }

        .pill {
          background: var(--white-08);
          border: 1px solid var(--white-12);
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 11px;
          color: var(--white-55);
          font-weight: 300;
        }

        /* ---------- FORM PANEL ---------- */
        .auth-form-panel {
          flex: 1;
          padding: clamp(28px, 4vw, 48px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .form-eyebrow {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
          font-weight: 500;
        }

        .form-title {
          font-family: var(--font-serif);
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 400;
          color: var(--white-95);
          line-height: 1.15;
          margin-bottom: 8px;
        }
        .form-title em { font-style: italic; color: var(--white-55); }

        .form-sub {
          font-size: clamp(12px, 1vw, 13px);
          color: var(--white-55);
          margin-bottom: clamp(20px, 3vw, 28px);
          font-weight: 300;
        }

        /* ---------- ERROR ---------- */
        .error-banner {
          background: rgba(220, 80, 80, 0.18);
          border: 1px solid rgba(220, 80, 80, 0.3);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: rgba(255, 180, 180, 0.95);
          margin-bottom: 16px;
          line-height: 1.5;
        }

        /* ---------- FORM ---------- */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 1.8vw, 18px);
          margin-bottom: clamp(20px, 2.5vw, 28px);
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--white-55);
          font-weight: 500;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.92);
          border: none;
          border-radius: 10px;
          padding: clamp(11px, 1.3vw, 14px) clamp(14px, 1.5vw, 16px);
          font-size: clamp(13px, 1vw, 14px);
          font-family: var(--font-sans);
          color: #1a3d35;
          outline: none;
          transition: background 0.15s ease, box-shadow 0.15s ease;
          /* Minimum tap target */
          min-height: 44px;
        }
        .field-input::placeholder { color: rgba(0,0,0,0.3); }
        .field-input:focus {
          background: #fff;
          box-shadow: 0 0 0 3px rgba(168, 213, 194, 0.45);
        }

        /* ---------- SUBMIT ---------- */
        .btn-submit {
          width: 100%;
          padding: clamp(13px, 1.5vw, 16px);
          background: rgba(255,255,255,0.95);
          color: var(--teal-dark);
          border: none;
          border-radius: 50px;
          font-size: clamp(13px, 1vw, 14px);
          font-weight: 500;
          font-family: var(--font-sans);
          cursor: pointer;
          min-height: 44px;
          margin-top: 4px;
          transition: background 0.15s ease, -webkit-transform 0.1s ease, transform 0.1s ease;
        }
        .btn-submit:hover:not(:disabled) {
          background: #fff;
          -webkit-transform: translateY(-1px);
          transform: translateY(-1px);
        }
        .btn-submit:disabled { opacity: 0.65; cursor: default; }
        .btn-submit:focus-visible { outline: 2px solid rgba(255,255,255,0.6); outline-offset: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .btn-submit:hover { transform: none; -webkit-transform: none; }
        }

        /* ---------- FOOTER LINK ---------- */
        .form-footer {
          font-size: clamp(12px, 1vw, 13px);
          color: var(--white-55);
          text-align: center;
        }

        .form-link {
          background: none;
          border: none;
          color: var(--white-90);
          font-size: inherit;
          font-family: var(--font-sans);
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.15s ease;
          padding: 0;
        }
        .form-link:hover         { opacity: 0.7; }
        .form-link:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 3px; border-radius: 3px; }

        /* ---------- SMALL MOBILE ---------- */
        @media (max-width: 400px) {
          .auth-panel { display: none; }
        }
      `}</style>
    </div>
  );
}