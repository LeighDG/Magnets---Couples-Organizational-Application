import { useNavigate } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

const FEATURES = [
  { icon: "📅", title: "Shared Calendar", desc: "Events you both can see and edit" },
  { icon: "💰", title: "Budgeting",        desc: "Track spending without the awkward convos" },
  { icon: "✅", title: "Lists",            desc: "Groceries, errands, big life stuff" },
  { icon: "📝", title: "Notes",            desc: "Ideas, thoughts, plans — yours or shared" },
];

const SOCIAL = [FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF];
const NAV    = ["About", "Features", "Contact"];

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-root">
      {/* ── Ambient blobs ── */}
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />

      {/* ── Topbar ── */}
      <header className="welcome-topbar">
        <span className="brand">MAGNETIC</span>
        <nav className="topbar-nav" aria-label="Site navigation">
          {NAV.map((l) => (
            <button key={l} className="nav-link">{l}</button>
          ))}
        </nav>
      </header>

      {/* ── Hero ── */}
      <main className="welcome-hero">

        {/* LEFT */}
        <section className="hero-left" aria-label="Hero content">
          <span className="wave-emoji" aria-hidden="true">👋</span>

          <h1 className="headline">
            Life's better<br />
            <em>together.</em>
          </h1>

          <p className="subline">
            Magnetic is your shared space to plan, budget, and stay in sync —
            built for the two of you, no spreadsheets required.
          </p>

          <div className="cta-row">
            <button
              className="btn-primary"
              onClick={() => navigate("/signup")}
              aria-label="Create a free account"
            >
              Get Started — it's free
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/login")}
              aria-label="Log in to your account"
            >
              Log In
            </button>
          </div>

          <div className="social-row" aria-label="Social media links">
            <span className="social-label">Find us</span>
            {SOCIAL.map((Icon, i) => (
              <button key={i} className="social-icon" aria-label="Social media">
                <Icon />
              </button>
            ))}
          </div>
        </section>

        {/* RIGHT */}
        <aside className="hero-right" aria-label="App preview">

          {/* Partner card */}
          <div className="glass-card partner-card">
            <div className="avatar-pair" aria-hidden="true">
              <div className="av av-green">🧑</div>
              <div className="av av-gold">👩</div>
            </div>
            <div className="partner-text">
              <p className="partner-title">You + your partner, in sync</p>
              <p className="partner-sub">Link accounts and share everything that matters</p>
            </div>
            <div className="heart-badge" aria-hidden="true">💚</div>
          </div>

          {/* Feature grid */}
          <div className="feature-grid" role="list">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass-card fcard" role="listitem">
                <div className="fcard-icon" aria-hidden="true">{f.icon}</div>
                <p className="fcard-title">{f.title}</p>
                <p className="fcard-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="glass-card bottom-note">
            <span className="note-icon" aria-hidden="true">🔗</span>
            <p className="note-text">
              Sign up, then <strong>invite your partner</strong> with a simple
              link — you'll both be set up in under two minutes.
            </p>
          </div>
        </aside>
      </main>

      {/* ── Styles ── */}
      <style>{`
        /* ---------- FONTS ---------- */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        /* ---------- TOKENS ---------- */
        .welcome-root {
          --teal-dark:   #1a3d35;
          --teal-mid:    #2d5a4e;
          --teal-light:  #4a7c6f;
          --white-90:    rgba(255,255,255,0.90);
          --white-75:    rgba(255,255,255,0.75);
          --white-55:    rgba(255,255,255,0.55);
          --white-45:    rgba(255,255,255,0.45);
          --white-42:    rgba(255,255,255,0.42);
          --white-30:    rgba(255,255,255,0.30);
          --white-15:    rgba(255,255,255,0.15);
          --white-12:    rgba(255,255,255,0.12);
          --white-10:    rgba(255,255,255,0.10);
          --white-08:    rgba(255,255,255,0.08);
          --white-07:    rgba(255,255,255,0.07);
          --glass-blur:  blur(8px);
          --font-serif:  'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          --font-sans:   'DM Sans', system-ui, -apple-system, sans-serif;
          --radius-card: 20px;
          --radius-sm:   16px;
        }

        /* ---------- ROOT ---------- */
        .welcome-root {
          position: relative;
          min-height: 100svh; /* svh = small viewport height, handles mobile browser chrome */
          min-height: 100vh;  /* fallback for browsers without svh support */
          display: flex;
          flex-direction: column;
          font-family: var(--font-sans);
          /* Gradient fallback chain: modern → older Webkit → hex fallback */
          background: linear-gradient(145deg, var(--teal-light) 0%, var(--teal-mid) 45%, var(--teal-dark) 100%);
          background: -webkit-linear-gradient(145deg, #4a7c6f 0%, #2d5a4e 45%, #1a3d35 100%);
          overflow: hidden;
        }

        /* ---------- BLOBS ---------- */
        .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          /* Use filter with a fallback — older IE/Edge ignore this gracefully */
          -webkit-filter: blur(70px);
          filter: blur(70px);
        }
        .blob-1 { width: 350px; height: 350px; background: #a8d5c2; top: -100px; left: -60px;  opacity: 0.25; }
        .blob-2 { width: 260px; height: 260px; background: #e8c97a; bottom: -60px; right: 80px; opacity: 0.20; }
        .blob-3 { width: 200px; height: 200px; background: #d4a898; top: 180px; right: -30px;   opacity: 0.18; }

        /* ---------- TOPBAR ---------- */
        .welcome-topbar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(14px, 2.5vw, 24px) clamp(20px, 4vw, 40px);
        }

        .brand {
          font-family: var(--font-serif);
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 500;
          letter-spacing: 6px;
          color: var(--white-90);
        }

        .topbar-nav {
          display: flex;
          gap: clamp(12px, 2vw, 24px);
          align-items: center;
        }

        .nav-link {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          padding: 4px 0;
          transition: color 0.15s ease;
          /* Minimum tap target for mobile */
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        .nav-link:hover  { color: var(--white-90); }
        .nav-link:focus-visible {
          outline: 2px solid rgba(255,255,255,0.5);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* ---------- HERO LAYOUT ---------- */
        .welcome-hero {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          padding: clamp(16px, 3vw, 24px) clamp(20px, 5vw, 48px) clamp(24px, 4vw, 48px);
          gap: clamp(24px, 4vw, 48px);
          /* Stack on mobile, row on tablet+ */
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .welcome-hero { flex-direction: row; align-items: center; }
        }

        /* ---------- HERO LEFT ---------- */
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          text-align: center;
        }

        @media (min-width: 768px) {
          .hero-left {
            flex: 1.4;
            text-align: left;
          }
        }

        .wave-emoji {
          display: inline-block;
          font-size: clamp(28px, 4vw, 40px);
          margin-bottom: clamp(10px, 1.5vw, 16px);
          -webkit-animation: wave 2.2s ease-in-out infinite;
          animation: wave 2.2s ease-in-out infinite;
          transform-origin: 70% 70%;
        }

        @-webkit-keyframes wave {
          0%,100% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
          25%      { -webkit-transform: rotate(18deg); transform: rotate(10deg); }
          75%      { -webkit-transform: rotate(-8deg); transform: rotate(0deg); }
        }
        @keyframes wave {
          0%,100% { transform: rotate(0deg); }
          25%      { transform: rotate(10deg); }
          75%      { transform: rotate(0deg); }
        }

        /* Prefers-reduced-motion: respect user accessibility setting */
        @media (prefers-reduced-motion: reduce) {
          .wave-emoji { animation: none; -webkit-animation: none; }
        }

        .headline {
          font-family: var(--font-serif);
          /* clamp(min, preferred, max) — scales smoothly with viewport */
          font-size: clamp(40px, 6vw, 76px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--white-90);
          margin-bottom: clamp(14px, 2vw, 24px);
        }
        .headline em {
          font-style: italic;
          color: var(--white-55);
        }

        .subline {
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.8;
          color: rgba(255,255,255,0.65);
          max-width: 420px;
          margin: 0 auto clamp(24px, 3vw, 40px);
          font-weight: 300;
        }

        @media (min-width: 768px) {
          .subline { margin-left: 0; }
        }

        /* ---------- CTA ROW ---------- */
        .cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: clamp(24px, 3vw, 40px);
        }

        @media (min-width: 768px) {
          .cta-row { justify-content: flex-start; }
        }

        /* Shared button base */
        .btn-primary,
        .btn-secondary {
          font-family: var(--font-sans);
          border-radius: 50px;
          cursor: pointer;
          font-size: clamp(13px, 1vw, 14px);
          font-weight: 500;
          transition: background 0.15s ease, border-color 0.15s ease,
                      color 0.15s ease, transform 0.1s ease;
          /* Minimum tap target */
          min-height: 44px;
          white-space: nowrap;
        }
        .btn-primary:focus-visible,
        .btn-secondary:focus-visible {
          outline: 2px solid rgba(255,255,255,0.6);
          outline-offset: 3px;
        }

        .btn-primary {
          padding: clamp(12px, 1.2vw, 16px) clamp(24px, 2.5vw, 36px);
          background: rgba(255,255,255,0.95);
          color: var(--teal-dark);
          border: none;
        }
        .btn-primary:hover  { background: #fff; -webkit-transform: translateY(-1px); transform: translateY(-1px); }
        .btn-primary:active { -webkit-transform: translateY(0); transform: translateY(0); }

        .btn-secondary {
          padding: clamp(11px, 1.1vw, 15px) clamp(22px, 2.2vw, 32px);
          background: transparent;
          color: var(--white-75);
          border: 1.5px solid rgba(255,255,255,0.25);
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.55); color: #fff; }

        /* ---------- SOCIAL ROW ---------- */
        .social-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        @media (min-width: 768px) {
          .social-row { justify-content: flex-start; }
        }

        .social-label {
          font-size: 11px;
          color: var(--white-30);
        }

        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--white-15);
          background: var(--white-07);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          transition: border-color 0.15s ease, background 0.15s ease;
          /* Minimum tap target */
          min-width: 44px;
          min-height: 44px;
        }
        .social-icon:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.13);
        }
        .social-icon:focus-visible {
          outline: 2px solid rgba(255,255,255,0.5);
          outline-offset: 3px;
        }

        /* ---------- HERO RIGHT ---------- */
        .hero-right {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.2vw, 14px);
          width: 100%;
        }

        @media (min-width: 768px) {
          .hero-right { flex: 0.6; }
        }

        /* ---------- GLASS CARD (shared base) ---------- */
        .glass-card {
          border-radius: var(--radius-card);
          border: 1px solid var(--white-15);
          /* Progressive enhancement: blur if supported, solid fallback otherwise */
          background: var(--white-10);
          -webkit-backdrop-filter: var(--glass-blur);
          backdrop-filter: var(--glass-blur);
        }

        /* Fallback for browsers without backdrop-filter */
        @supports not (backdrop-filter: blur(1px)) {
          .glass-card { background: rgba(30, 70, 60, 0.85); }
        }

        /* ---------- PARTNER CARD ---------- */
        .partner-card {
          display: flex;
          align-items: center;
          gap: clamp(12px, 1.5vw, 18px);
          padding: clamp(14px, 1.8vw, 22px);
        }

        .avatar-pair { display: flex; }
        .av {
          width: clamp(36px, 3.5vw, 44px);
          height: clamp(36px, 3.5vw, 44px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(16px, 1.6vw, 20px);
          border: 2.5px solid var(--white-15);
          flex-shrink: 0;
        }
        .av-green { background: rgba(126,212,184,0.3); }
        .av-gold  { background: rgba(232,184,75,0.3); margin-left: -12px; }

        .partner-text { flex: 1; min-width: 0; }
        .partner-title {
          font-size: clamp(12px, 1vw, 13px);
          font-weight: 500;
          color: var(--white-90);
          margin-bottom: 3px;
          /* Prevent text overflow on very small screens */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .partner-sub {
          font-size: 11px;
          color: var(--white-45);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .heart-badge {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--white-10);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        /* ---------- FEATURE GRID ---------- */
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(8px, 1vw, 12px);
        }

        .fcard {
          padding: clamp(12px, 1.5vw, 18px);
          background: var(--white-08);
          border-color: var(--white-12);
          transition: background 0.15s ease, -webkit-transform 0.15s ease, transform 0.15s ease;
          cursor: default;
        }
        .fcard:hover {
          background: rgba(255,255,255,0.13);
          -webkit-transform: translateY(-2px);
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .fcard:hover { transform: none; -webkit-transform: none; }
        }

        .fcard-icon {
          width: clamp(30px, 2.5vw, 38px);
          height: clamp(30px, 2.5vw, 38px);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: clamp(8px, 1vw, 12px);
          font-size: clamp(16px, 1.4vw, 20px);
          background: var(--white-10);
        }
        .fcard-title {
          font-size: clamp(11px, 0.9vw, 13px);
          font-weight: 500;
          color: rgba(255,255,255,0.88);
          margin-bottom: 3px;
        }
        .fcard-desc {
          font-size: clamp(10px, 0.8vw, 11px);
          color: var(--white-42);
          line-height: 1.5;
          font-weight: 300;
        }

        /* ---------- BOTTOM NOTE ---------- */
        .bottom-note {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: clamp(12px, 1.4vw, 16px) clamp(14px, 1.6vw, 20px);
          background: var(--white-08);
          border-color: var(--white-12);
        }
        .note-icon { font-size: clamp(16px, 1.4vw, 20px); flex-shrink: 0; }
        .note-text {
          font-size: clamp(11px, 0.85vw, 12px);
          color: var(--white-45);
          line-height: 1.6;
          font-weight: 300;
        }
        .note-text strong {
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        /* ---------- SMALL MOBILE (< 400px) ---------- */
        @media (max-width: 400px) {
          .topbar-nav   { display: none; }   /* hide nav links on very small screens */
          .feature-grid { grid-template-columns: 1fr; } /* single column feature list */
          .cta-row      { flex-direction: column; width: 100%; }
          .btn-primary,
          .btn-secondary { width: 100%; justify-content: center; text-align: center; }
        }
      `}</style>
    </div>
  );
}