// src/pages/relationship/RelationshipNav.jsx
import { useEffect, useRef, useState } from "react";

// ── Icons defined first so they're available when VIEWS is built ──────────────

function SendIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ClockIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LinkIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function HeartIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// ── View metadata ─────────────────────────────────────────────────────────────

const VIEWS = {
  INVITE:  { key: "INVITE",  label: "Invite Partner",    Icon: SendIcon,  locked: false },
  WAITING: { key: "WAITING", label: "Awaiting Response", Icon: ClockIcon, locked: true  },
  JOIN:    { key: "JOIN",    label: "Join Relationship", Icon: LinkIcon,  locked: false },
  DETAILS: { key: "DETAILS", label: "Relationship",      Icon: HeartIcon, locked: false },
};

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * visibleKeys  — ordered array of view keys currently allowed
 * activeKey    — the currently active view
 * onSelect     — callback(key) — won't fire for locked keys
 */
export default function RelationshipNav({ visibleKeys = [], activeKey, onSelect }) {
  // Keep a rendered list so exiting items can animate out before being removed
  const [renderedKeys, setRenderedKeys] = useState(visibleKeys);
  const [exitingKeys,  setExitingKeys]  = useState([]);
  const prevKeysRef = useRef(visibleKeys);

  useEffect(() => {
    const prev    = prevKeysRef.current;
    const removed = prev.filter(k => !visibleKeys.includes(k));
    const added   = visibleKeys.filter(k => !prev.includes(k));

    prevKeysRef.current = visibleKeys;

    if (removed.length === 0 && added.length === 0) return;

    // Immediately merge in new keys so they can start their enter transition
    if (added.length) {
      setRenderedKeys(prev => [...new Set([...prev, ...visibleKeys])]);
    }

    if (removed.length) {
      // Mark removed keys as exiting
      setExitingKeys(ex => [...new Set([...ex, ...removed])]);

      // After the CSS transition finishes, drop them from rendered list
      const t = setTimeout(() => {
        setRenderedKeys(visibleKeys);
        setExitingKeys(ex => ex.filter(k => !removed.includes(k)));
      }, 380);

      return () => clearTimeout(t);
    }

    if (!removed.length) setRenderedKeys(visibleKeys);
  }, [visibleKeys]);

  if (renderedKeys.length === 0) return null;

  return (
    <div
      style={{
        position:        "fixed",
        bottom:          "2rem",
        left:            "50%",
        transform:       "translateX(-50%)",
        zIndex:          50,
        display:         "flex",
        alignItems:      "center",
        gap:             "0.375rem",
        padding:         "0.45rem 0.6rem",
        background:      "rgba(15, 12, 9, 0.75)",
        backdropFilter:  "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border:          "1px solid rgba(255,255,255,0.1)",
        borderRadius:    "9999px",
        boxShadow:       "0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {renderedKeys.map((key, i) => {
        const item = VIEWS[key];
        if (!item) return null;

        const { Icon, label, locked } = item;
        const isActive  = key === activeKey;
        const isExiting = exitingKeys.includes(key);
        const isClickable = !isExiting && !locked;

        return (
          <button
            key={key}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onSelect(key)}
            title={locked ? `${label} (in progress)` : label}
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            "0.45rem",
              padding:        "0.5rem 0.9rem",
              borderRadius:   "9999px",
              border:         "none",
              outline:        "none",
              cursor:         isExiting ? "default" : locked ? "default" : "pointer",

              fontFamily:     "system-ui, sans-serif",
              fontSize:       "0.7rem",
              fontWeight:     600,
              letterSpacing:  "0.07em",
              textTransform:  "uppercase",
              whiteSpace:     "nowrap",
              userSelect:     "none",

              // Exit animation
              opacity:        isExiting ? 0 : 1,
              transform:      isExiting
                ? "scale(0.82) translateY(6px)"
                : "scale(1) translateY(0)",
              maxWidth:       isExiting ? "0px" : "220px",
              overflow:       "hidden",
              pointerEvents:  isExiting ? "none" : "auto",

              transition:     "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",

              // Active pill — white with dark text
              // Locked (WAITING) — amber tint to signal "in progress"
              // Idle — subtle ghost
              background: isActive && locked
                ? "hsla(43, 96%, 56%, 0.18)"
                : isActive
                  ? "rgba(255,255,255,0.94)"
                  : "rgba(255,255,255,0.05)",

              color: isActive && locked
                ? "rgba(251, 191, 36, 0.95)"
                : isActive
                  ? "#16110a"
                  : "rgba(255,255,255,0.55)",

              boxShadow: isActive && !locked
                ? "0 2px 14px rgba(0,0,0,0.35)"
                : isActive && locked
                  ? "0 2px 14px rgba(251,191,36,0.15)"
                  : "none",
            }}
            onMouseEnter={e => {
              if (!isActive && !isExiting && !locked) {
                e.currentTarget.style.background = "rgba(255,255,255,0.11)";
                e.currentTarget.style.color      = "rgba(255,255,255,0.85)";
              }
            }}
            onMouseLeave={e => {
              if (!isActive && !isExiting && !locked) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color      = "rgba(255,255,255,0.55)";
              }
            }}
          >
            <Icon size={14} />

            {/* Label — always visible for accessibility, but visually clipped when idle */}
            <span
              aria-hidden={!isActive}
              style={{
                display:    "inline-block",
                maxWidth:   isActive ? "160px" : "0px",
                opacity:    isActive ? 1 : 0,
                overflow:   "hidden",
                transition: "max-width 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}