import { useNavigate, useLocation } from "react-router-dom";

// ── SVG icons ─────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12L12 4l9 8v8a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-8z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="14" x2="8" y2="14"/>
    <line x1="12" y1="14" x2="12" y2="14"/>
    <line x1="16" y1="14" x2="16" y2="14"/>
    <line x1="8" y1="18" x2="8" y2="18"/>
    <line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);

const NotepadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="11" x2="16" y2="11"/>
    <line x1="8" y1="15" x2="16" y2="15"/>
    <line x1="8" y1="19" x2="12" y2="19"/>
  </svg>
);

const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 6v1.5"/>
    <path d="M12 15.5V17"/>
    <path d="M9 9.5a3 3 0 015.5 1.5c0 2-3 2.5-3 4.5"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <nav className="dash-sidebar" aria-label="Main navigation">
        <button
          className={`nav-item${isActive("/dashboard") ? " nav-item--active" : ""}`}
          aria-label="Home"
          data-tooltip="Home"
          aria-current={isActive("/dashboard") ? "page" : undefined}
          onClick={() => navigate("/dashboard")}
        >
          <HomeIcon />
        </button>

        <button
          className={`nav-item${isActive("/calendar") ? " nav-item--active" : ""}`}
          aria-label="Calendar"
          data-tooltip="Calendar"
          aria-current={isActive("/calendar") ? "page" : undefined}
          onClick={() => navigate("/calendar")}
        >
          <CalendarIcon />
        </button>

        <button
          className={`nav-item${isActive("/budget") ? " nav-item--active" : ""}`}
          aria-label="Budget"
          data-tooltip="Budget"
          aria-current={isActive("/budget") ? "page" : undefined}
          onClick={() => navigate("/budget")}
        >
          <BudgetIcon />
        </button>

        <button
          className={`nav-item${isActive("/notes") ? " nav-item--active" : ""}`}
          aria-label="Notes"
          data-tooltip="Notes"
          aria-current={isActive("/notes") ? "page" : undefined}
          onClick={() => navigate("/notes")}
        >
          <NotepadIcon />
        </button>

        <div className="nav-spacer" />

        <button
          className={`nav-item${isActive("/settings") ? " nav-item--active" : ""}`}
          aria-label="Settings"
          data-tooltip="Settings"
          aria-current={isActive("/settings") ? "page" : undefined}
          onClick={() => navigate("/settings")}
        >
          <SettingsIcon />
        </button>
      </nav>

      <style>{`
        .dash-sidebar {
          width: 64px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 0 20px;
          gap: 4px;
          position: relative;
          z-index: 10;
        }

        .nav-item {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.75);
          background: none;
          border: none;
          flex-shrink: 0;
          transition: background 0.15s ease, color 0.15s ease;
          position: relative;
        }
        .nav-item svg            { width: 18px; height: 18px; }
        .nav-item:hover          { background: rgba(255,255,255,0.12); color: #fff; }
        .nav-item--active        { background: rgba(255,255,255,0.18); color: #fff; }
        .nav-item:disabled       { opacity: 0.4; cursor: default; }
        .nav-item:disabled:hover { background: none; }
        .nav-item:focus-visible  {
          outline: 2px solid rgba(255,255,255,0.45);
          outline-offset: 2px;
          border-radius: 12px;
        }

        /* ── Tooltip ── */
        .nav-item::after {
          content: attr(data-tooltip);
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%) translateX(-4px);
          background: rgba(20, 20, 20, 0.92);
          color: #fff;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 7px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s ease, transform 0.15s ease;
          z-index: 100;
        }

        .nav-item:hover::after {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        .nav-spacer { flex: 1; }
      `}</style>
    </>
  );
}