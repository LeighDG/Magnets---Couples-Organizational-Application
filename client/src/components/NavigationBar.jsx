import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

function todayLabel() {
  return new Date().toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
export default function NavigationBar({ pageTitle = "Dashboard" }) {
  const navigate     = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="content-header">
      {/* Left — page title */}
      <h1 className="content-title">{pageTitle}</h1>

      {/* Right — date, notifications, user */}
      <div className="header-right">
        <span className="date-chip">{todayLabel()}</span>

        <button
          className="notif-btn"
          aria-label="Notifications"
          title="Coming soon"
          disabled
        >
          <BellIcon />
          <span className="notif-dot" aria-hidden="true" />
        </button>

        {/* User menu */}
        <div className="user-menu-wrapper">
          <button className="user-btn" aria-label="User menu" aria-haspopup="true">
            <div className="user-avatar">
              <UserIcon />
            </div>
            <span className="user-name">
              {user?.firstName ?? "Account"}
            </span>
            <ChevronDownIcon />
          </button>

          <div className="user-dropdown" role="menu">
            <button
              className="dropdown-item"
              role="menuitem"
              onClick={() => navigate("/relationship")}
            >
              Manage Relationship
            </button>
            <button
              className="dropdown-item"
              role="menuitem"
              onClick={() => navigate("/about")}
            >
              About Magnetic
            </button>
            <div className="dropdown-divider" />
            <button
              className="dropdown-item dropdown-item--danger"
              role="menuitem"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        .content-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(12px, 1.8vw, 18px) clamp(16px, 2.5vw, 24px);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          flex-shrink: 0;
          background: #f5f0e8;
          gap: 12px;
          flex-wrap: wrap;
        }

        .content-title {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 500;
          color: #2d2d2d;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: nowrap;
        }

        /* ── Date chip ── */
        .date-chip {
          font-size: clamp(11px, 0.9vw, 12px);
          color: #7a7a72;
          background: rgba(0,0,0,0.06);
          padding: 5px 12px;
          border-radius: 20px;
          white-space: nowrap;
        }

        @media (max-width: 560px) {
          .date-chip { display: none; }
        }

        /* ── Notification button ── */
        .notif-btn {
          width: 34px;
          height: 34px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 10px;
          background: #e8b84b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          position: relative;
          flex-shrink: 0;
          transition: opacity 0.15s ease;
        }
        .notif-btn svg                  { width: 16px; height: 16px; color: #5a3a00; }
        .notif-btn:hover:not(:disabled) { opacity: 0.85; }
        .notif-btn:disabled             { opacity: 0.6; cursor: default; }
        .notif-btn:focus-visible        { outline: 2px solid rgba(0,0,0,0.3); outline-offset: 3px; }

        .notif-dot {
          width: 8px;
          height: 8px;
          background: #d64545;
          border-radius: 50%;
          position: absolute;
          top: 5px;
          right: 5px;
          border: 1.5px solid #f5f0e8;
        }

        /* ── User menu ── */
        .user-menu-wrapper {
          position: relative;
        }

        .user-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 22px;
          padding: 5px 10px 5px 5px;
          cursor: pointer;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px;
          color: #2d2d2d;
          min-height: 44px;
          transition: background 0.15s ease;
        }
        .user-btn:hover         { background: rgba(0,0,0,0.08); }
        .user-btn:focus-visible { outline: 2px solid rgba(74,124,111,0.5); outline-offset: 3px; border-radius: 22px; }
        .user-btn svg           { width: 14px; height: 14px; color: #666; }

        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(74,124,111,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .user-avatar svg { width: 16px; height: 16px; color: #4a7c6f; }

        .user-name {
          font-weight: 500;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .user-name { display: none; }
        }

        /* ── Dropdown ── */
        .user-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 200px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          padding: 6px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          display: none;
          z-index: 50;
          flex-direction: column;
          gap: 2px;
        }

        /* Show on parent hover OR focus-within */
        .user-menu-wrapper:hover .user-dropdown,
        .user-menu-wrapper:focus-within .user-dropdown {
          display: flex;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 9px 14px;
          border-radius: 9px;
          background: none;
          border: none;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px;
          color: #2d2d2d;
          cursor: pointer;
          text-align: left;
          min-height: 44px;
          transition: background 0.12s ease;
        }
        .dropdown-item:hover          { background: rgba(0,0,0,0.05); }
        .dropdown-item:focus-visible  { outline: 2px solid rgba(74,124,111,0.4); outline-offset: 2px; border-radius: 9px; }
        .dropdown-item--danger        { color: #c0392b; }
        .dropdown-item--danger:hover  { background: rgba(192,57,43,0.07); }

        .dropdown-divider {
          height: 1px;
          background: rgba(0,0,0,0.07);
          margin: 4px 6px;
        }
      `}</style>
    </header>
  );
}