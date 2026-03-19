import { useNavigate } from "react-router-dom";

// ── SVG icons ─────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12L12 4l9 8v8a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-8z"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 000-7.8z"/>
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ── Flyout items ──────────────────────────────────────────────────────────────
const FLYOUT_ITEMS = [
  { key: "CALENDAR",  label: "CALENDAR"  },
  { key: "BUDGETING", label: "BUDGETING" },
  { key: "LISTS",     label: "LISTS"     },
  { key: "NOTES",     label: "NOTES"     },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Sidebar({ flyoutOpen, onToggleFlyout, activeFlyoutKey, onFlyoutSelect }) {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Icon sidebar ─────────────────────────────────────────────────── */}
      <nav className="dash-sidebar" aria-label="Main navigation">
        <button
          className="nav-item nav-item--active"
          aria-label="Home"
          aria-current="page"
          onClick={() => navigate("/dashboard")}
        >
          <HomeIcon />
        </button>

        <button
          className="nav-item"
          aria-label="Partner relationship"
          onClick={() => navigate("/relationship")}
        >
          <HeartIcon />
        </button>

        <button
          className={`nav-item${flyoutOpen ? " nav-item--active" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={flyoutOpen}
          onClick={onToggleFlyout}
        >
          <MenuIcon />
        </button>

        <div className="nav-spacer" />

        <button
          className="nav-item"
          aria-label="About Magnetic"
          onClick={() => navigate("/about")}
        >
          <InfoIcon />
        </button>

        <button
          className="nav-item"
          aria-label="Profile"
          onClick={() => navigate("/relationship")}
        >
          <UserIcon />
        </button>

        <button
          className="nav-item"
          aria-label="Settings"
          title="Coming soon"
          disabled
        >
          <SettingsIcon />
        </button>
      </nav>

      {/* ── Flyout panel ─────────────────────────────────────────────────── */}
      <div
        className={`dash-flyout${flyoutOpen ? " dash-flyout--open" : ""}`}
        aria-hidden={!flyoutOpen}
      >
        <div className="flyout-inner" role="menu">
          {FLYOUT_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`flyout-item${activeFlyoutKey === item.key ? " flyout-item--active" : ""}`}
              role="menuitem"
              onClick={() => onFlyoutSelect?.(item.key)}
              title="Coming soon"
              disabled
            >
              <span>{item.label}</span>
              <ChevronIcon />
            </button>
          ))}
        </div>
      </div>

      {/* ── Styles ───────────────────────────────────────────────────────── */}
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
        }
        .nav-item svg          { width: 18px; height: 18px; }
        .nav-item:hover        { background: rgba(255,255,255,0.12); color: #fff; }
        .nav-item--active      { background: rgba(255,255,255,0.18); color: #fff; }
        .nav-item:disabled     { opacity: 0.4; cursor: default; }
        .nav-item:disabled:hover { background: none; }
        .nav-item:focus-visible  {
          outline: 2px solid rgba(255,255,255,0.45);
          outline-offset: 2px;
          border-radius: 12px;
        }

        .nav-spacer { flex: 1; }

        /* ── Flyout ── */
        .dash-flyout {
          width: 0;
          flex-shrink: 0;
          overflow: hidden;
          transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
          display: flex;
          align-items: flex-start;
          padding-top: 4px;
          z-index: 9;
        }
        .dash-flyout--open { width: 168px; }

        .flyout-inner {
          width: 168px;
          flex-shrink: 0;
          background: rgba(48, 78, 68, 0.97);
          border-radius: 14px;
          padding: 10px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border: 1px solid rgba(255,255,255,0.10);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }

        @supports not (backdrop-filter: blur(1px)) {
          .flyout-inner { background: #243d36; }
        }

        .flyout-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 10px;
          background: none;
          border: none;
          font-family: 'DM Sans', system-ui, sans-serif;
          color: rgba(255,255,255,0.82);
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 500;
          white-space: nowrap;
          width: 100%;
          cursor: pointer;
          min-height: 44px;
          transition: background 0.12s ease, color 0.12s ease;
        }
        .flyout-item svg           { width: 13px; height: 13px; flex-shrink: 0; }
        .flyout-item:hover:not(:disabled) { background: rgba(255,255,255,0.12); color: #fff; }
        .flyout-item--active       { background: rgba(255,255,255,0.15); color: #fff; }
        .flyout-item:disabled      { opacity: 0.5; cursor: default; }
        .flyout-item:focus-visible {
          outline: 2px solid rgba(255,255,255,0.4);
          outline-offset: 2px;
          border-radius: 10px;
        }

        @media (prefers-reduced-motion: reduce) {
          .dash-flyout { transition: none; }
        }

        @media (max-width: 400px) {
          .dash-sidebar { display: none; }
        }
      `}</style>
    </>
  );
}