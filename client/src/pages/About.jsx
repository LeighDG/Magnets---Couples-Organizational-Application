import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

const HELPS = [
  {
    icon: "📅",
    title: "Never miss what matters",
    desc: "A shared calendar means both of you always know what's coming — dinners, appointments, trips, and the little things that slip through the cracks when life gets busy.",
  },
  {
    icon: "💰",
    title: "Money, without the awkwardness",
    desc: 'Shared budgeting keeps you both on the same page — no more end-of-month surprises, and no more "I thought you were covering that" conversations.',
  },
  {
    icon: "✅",
    title: "Lists you actually share",
    desc: "From the weekly shop to big life to-dos, your lists update in real time for both of you. Tick something off, and your partner sees it instantly — no chasing needed.",
  },
  {
    icon: "📝",
    title: "A place for your thoughts",
    desc: "Keep notes to yourself or share them with your partner. Ideas for trips, things you want to remember, plans you're still working out — all in one quiet place.",
  },
];

const VISION_PILLS = [
  { icon: "🗓️", text: "Plan together" },
  { icon: "💚", text: "Stay connected" },
  { icon: "✨", text: "Grow together" },
];

const SOCIAL = [FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF];
const NAV_LINKS = ["Home", "About"];

export default function AboutPage() {
  const navigate = useNavigate();
  const [navigating, setNavigating] = useState(null);

  const handleNav = (dest) => {
    setNavigating(dest);
    navigate(dest === "signup" ? "/signup" : "/login");
  };

  return (
    <div className="about-root">
      {/* ── Blobs ── */}
      <div className="blob b1" aria-hidden="true" />
      <div className="blob b2" aria-hidden="true" />
      <div className="blob b3" aria-hidden="true" />

      {/* ── Topbar ── */}
      <header className="about-topbar">
        <span className="brand">MAGNETIC</span>
        <nav className="topbar-nav" aria-label="Site navigation">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`nav-link${l === "About" ? " nav-link--active" : ""}`}
              onClick={() => l === "Home" && navigate("/")}
              disabled={l !== "Home"}
              title={l !== "Home" ? "Coming soon" : undefined}
            >
              {l}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="about-hero" aria-labelledby="about-title">
        <p className="eyebrow">About Magnetic</p>
        <h1 className="hero-title" id="about-title">
          We think staying organised<br />
          together should feel <em>easy.</em>
        </h1>
        <p className="hero-sub">
          Magnetic was born from the small frustrations that quietly add up — missed events,
          forgotten grocery runs, and the "did you pay that?" conversations. We thought there
          had to be a better way.
        </p>
      </section>

      <div className="rule" role="separator" />

      {/* ── Story ── */}
      <section className="story-section" aria-label="Our story">
        <div className="story-left">
          <p className="sec-label">Our story</p>
          <h2 className="story-title">
            It started with a<br /><em>shared notes app.</em>
          </h2>
          <p className="story-body">
            Like most couples, we started with workarounds. A shared note here, a spreadsheet
            there, a WhatsApp thread that got buried under everything else. It kind of worked
            — until it didn't.
          </p>
          <p className="story-body">
            We wanted something that felt like it was actually built for two people in a
            relationship. Not just a productivity tool with a sharing feature bolted on — but
            something that understood that two people share a life, not just a to-do list.
          </p>
          <p className="story-body">
            So we built Magnetic. A single, calm space where couples can plan, budget, and
            stay in sync — without the mess.
          </p>
        </div>

        <div className="story-right">
          <div className="moment-card glass-card">
            <span className="moment-emoji" aria-hidden="true">💬</span>
            <blockquote className="moment-quote">
              "Did you book that for Saturday or Sunday? I thought you added it to the calendar?"
            </blockquote>
            <p className="moment-attr">— A conversation Magnetic exists to prevent</p>
          </div>
        </div>
      </section>

      <div className="rule" role="separator" />

      {/* ── How Magnetic Helps ── */}
      <section className="helps-section" aria-labelledby="helps-title">
        <p className="sec-label" id="helps-title">How Magnetic helps</p>
        <div className="helps-grid" role="list">
          {HELPS.map((h) => (
            <div key={h.title} className="help-card glass-card" role="listitem">
              <div className="help-icon" aria-hidden="true">{h.icon}</div>
              <h3 className="help-title">{h.title}</h3>
              <p className="help-desc">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="vision-section glass-card" aria-labelledby="vision-title">
        <div className="vision-left">
          <p className="vision-eyebrow">Where we're headed</p>
          <h2 className="vision-title" id="vision-title">
            A home for your<br /><em>shared life.</em>
          </h2>
          <p className="vision-body">
            Right now, Magnetic covers the everyday essentials. But our vision is bigger — a
            space that grows with your relationship. Whether you're planning a holiday, saving
            for something special, or just trying to remember whose turn it is to cook, we
            want Magnetic to be the first place you both look.
          </p>
          <p className="vision-body">
            We're building carefully, one piece at a time. Because the best tools are the ones
            that quietly make your life a little smoother — without getting in the way.
          </p>
        </div>
        <div className="vision-pills" role="list" aria-label="Vision pillars">
          {VISION_PILLS.map((p) => (
            <div key={p.text} className="vpill" role="listitem">
              <div className="vpill-emoji" aria-hidden="true">{p.icon}</div>
              <p className="vpill-text">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" aria-label="Call to action">
        <div className="cta-text">
          <h2 className="cta-title">Ready to try it with your partner?</h2>
          <p className="cta-sub">
            Sign up free, then invite your partner with a single link. You'll be set up
            together in under two minutes.
          </p>
        </div>
        <div className="cta-btns">
          <button
            className="btn-white"
            onClick={() => handleNav("signup")}
            disabled={navigating !== null}
            aria-label="Create a free account"
          >
            {navigating === "signup" ? "Loading…" : "Get Started — it's free"}
          </button>
          <button
            className="btn-ghost"
            onClick={() => handleNav("login")}
            disabled={navigating !== null}
            aria-label="Log in to your account"
          >
            {navigating === "login" ? "Loading…" : "Log In"}
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="about-footer" aria-label="Social media links">
        <span className="soc-label">Follow us</span>
        {SOCIAL.map((Icon, i) => (
          <button key={i} className="soc-icon" aria-label="Social media">
            <Icon />
          </button>
        ))}
      </footer>

      {/* ── Styles ── */}
      <style>{`
        /* ---------- TOKENS ---------- */
        .about-root {
          --teal-dark:  #1a3d35;
          --teal-mid:   #2d5a4e;
          --teal-light: #4a7c6f;
          --gold:       #e8b84b;
          --white-95:   rgba(255,255,255,0.95);
          --white-90:   rgba(255,255,255,0.90);
          --white-78:   rgba(255,255,255,0.78);
          --white-50:   rgba(255,255,255,0.50);
          --white-48:   rgba(255,255,255,0.48);
          --white-45:   rgba(255,255,255,0.45);
          --white-42:   rgba(255,255,255,0.42);
          --white-28:   rgba(255,255,255,0.28);
          --white-25:   rgba(255,255,255,0.25);
          --white-15:   rgba(255,255,255,0.15);
          --white-12:   rgba(255,255,255,0.12);
          --white-10:   rgba(255,255,255,0.10);
          --white-09:   rgba(255,255,255,0.09);
          --white-08:   rgba(255,255,255,0.08);
          --white-07:   rgba(255,255,255,0.07);
          --white-06:   rgba(255,255,255,0.06);
          --glass-blur: blur(8px);
          --font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          --font-sans:  'DM Sans', system-ui, -apple-system, sans-serif;
          --pad-x:      clamp(20px, 5vw, 48px);
          --radius-lg:  20px;
          --radius-md:  16px;
        }

        /* ---------- ROOT ---------- */
        .about-root {
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
        .b1 { width: 400px; height: 400px; background: #a8d5c2; top: -120px; left: -80px;  opacity: 0.18; }
        .b2 { width: 260px; height: 260px; background: #e8c97a; bottom: -40px; right: 80px; opacity: 0.12; }
        .b3 { width: 200px; height: 200px; background: #d4a898; top: 360px; right: -30px;  opacity: 0.12; }

        /* ---------- TOPBAR ---------- */
        .about-topbar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: clamp(14px, 2.5vw, 22px) var(--pad-x);
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
          flex-wrap: wrap;
        }

        .nav-link {
          font-size: 12px;
          font-weight: 400;
          color: var(--white-50);
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          min-height: 44px;
          display: flex;
          align-items: center;
          padding: 4px 0;
          transition: color 0.15s ease;
        }
        .nav-link:hover         { color: var(--white-90); }
        .nav-link--active       { color: var(--white-90); }
        .nav-link:disabled      { cursor: default; }
        .nav-link:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 4px; border-radius: 4px; }

        /* ---------- HERO ---------- */
        .about-hero {
          position: relative;
          z-index: 2;
          padding: clamp(36px, 5vw, 56px) var(--pad-x) clamp(28px, 4vw, 44px);
          text-align: center;
        }

        .eyebrow {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
          font-weight: 500;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 400;
          line-height: 1.12;
          color: var(--white-95);
          margin-bottom: clamp(14px, 2vw, 20px);
        }
        .hero-title em { font-style: italic; color: var(--white-48); }

        .hero-sub {
          font-size: clamp(13px, 1.1vw, 14px);
          line-height: 1.85;
          color: var(--white-50);
          max-width: 500px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* ---------- RULE ---------- */
        .rule {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 0 var(--pad-x);
          position: relative;
          z-index: 2;
        }

        /* ---------- STORY ---------- */
        .story-section {
          position: relative;
          z-index: 2;
          padding: clamp(28px, 4vw, 44px) var(--pad-x);
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3vw, 40px);
        }

        @media (min-width: 768px) {
          .story-section {
            flex-direction: row;
            align-items: center;
          }
          .story-left  { flex: 1.1; }
          .story-right { flex: 0.85; }
        }

        .sec-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--white-28);
          margin-bottom: 14px;
        }

        .story-title {
          font-family: var(--font-serif);
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 400;
          color: rgba(255,255,255,0.92);
          line-height: 1.2;
          margin-bottom: 18px;
        }
        .story-title em { font-style: italic; color: var(--white-45); }

        .story-body {
          font-size: clamp(12px, 1vw, 13px);
          line-height: 1.9;
          color: var(--white-48);
          font-weight: 300;
          margin-bottom: 14px;
        }

        /* ---------- GLASS CARD (shared) ---------- */
        .glass-card {
          border-radius: var(--radius-lg);
          border: 1px solid var(--white-12);
          background: var(--white-08);
          -webkit-backdrop-filter: var(--glass-blur);
          backdrop-filter: var(--glass-blur);
        }

        @supports not (backdrop-filter: blur(1px)) {
          .glass-card { background: rgba(30, 70, 60, 0.85); }
        }

        /* ---------- MOMENT CARD ---------- */
        .moment-card {
          padding: clamp(18px, 2.5vw, 26px);
        }

        .moment-emoji {
          font-size: 30px;
          margin-bottom: 12px;
          display: block;
        }

        .moment-quote {
          font-family: var(--font-serif);
          font-size: clamp(14px, 1.3vw, 17px);
          font-style: italic;
          color: var(--white-78);
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .moment-attr {
          font-size: 10px;
          color: var(--white-28);
          letter-spacing: 0.5px;
        }

        /* ---------- HELPS ---------- */
        .helps-section {
          position: relative;
          z-index: 2;
          padding: 0 var(--pad-x) clamp(28px, 4vw, 44px);
        }

        .helps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(10px, 1.2vw, 14px);
          margin-top: 18px;
        }

        @media (min-width: 600px) {
          .helps-grid { grid-template-columns: 1fr 1fr; }
        }

        .help-card {
          background: var(--white-06);
          border-color: var(--white-09);
          padding: clamp(16px, 2vw, 24px) clamp(14px, 1.8vw, 22px);
          transition: background 0.15s ease;
          cursor: default;
        }
        .help-card:hover { background: var(--white-10); }

        .help-icon  { font-size: clamp(22px, 2vw, 28px); margin-bottom: 12px; }
        .help-title { font-size: clamp(13px, 1.1vw, 14px); font-weight: 500; color: rgba(255,255,255,0.88); margin-bottom: 8px; }
        .help-desc  { font-size: clamp(11px, 0.9vw, 12px); color: var(--white-42); line-height: 1.75; font-weight: 300; }

        /* ---------- VISION ---------- */
        .vision-section {
          margin: 0 var(--pad-x) clamp(20px, 3vw, 36px);
          position: relative;
          z-index: 2;
          background: var(--white-06);
          border-color: rgba(255,255,255,0.10);
          padding: clamp(24px, 3.5vw, 38px);
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 36px);
        }

        @media (min-width: 640px) {
          .vision-section   { flex-direction: row; align-items: center; }
          .vision-left      { flex: 1; }
          .vision-pills     { flex-shrink: 0; width: clamp(120px, 15vw, 160px); }
        }

        .vision-eyebrow {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
        }

        .vision-title {
          font-family: var(--font-serif);
          font-size: clamp(22px, 2.5vw, 30px);
          font-weight: 400;
          color: rgba(255,255,255,0.92);
          line-height: 1.25;
          margin-bottom: 16px;
        }
        .vision-title em { font-style: italic; color: var(--white-45); }

        .vision-body {
          font-size: clamp(12px, 1vw, 13px);
          color: rgba(255,255,255,0.47);
          line-height: 1.85;
          font-weight: 300;
          margin-bottom: 12px;
        }

        .vision-pills {
          display: flex;
          flex-direction: row;
          gap: 10px;
          flex-wrap: wrap;
        }

        @media (min-width: 640px) {
          .vision-pills { flex-direction: column; }
        }

        .vpill {
          background: var(--white-07);
          border: 1px solid var(--white-10);
          border-radius: 12px;
          padding: clamp(10px, 1.2vw, 16px);
          text-align: center;
          flex: 1;
          min-width: 80px;
        }
        .vpill-emoji { font-size: clamp(16px, 1.5vw, 20px); margin-bottom: 5px; }
        .vpill-text  { font-size: clamp(10px, 0.85vw, 11px); color: var(--white-50); line-height: 1.4; }

        /* ---------- CTA ---------- */
        .cta-section {
          margin: 0 var(--pad-x) clamp(20px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(16px, 2vw, 20px);
          background: var(--teal-mid);
          border: 1px solid var(--white-10);
          border-radius: 18px;
          padding: clamp(20px, 3vw, 28px) clamp(20px, 3vw, 32px);
          position: relative;
          z-index: 2;
        }

        @media (min-width: 640px) {
          .cta-section {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .cta-title {
          font-family: var(--font-serif);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 400;
          color: var(--white-95);
          margin-bottom: 5px;
        }
        .cta-sub {
          font-size: clamp(11px, 0.9vw, 12px);
          color: var(--white-42);
          font-weight: 300;
          line-height: 1.6;
          max-width: 420px;
        }

        .cta-btns {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .btn-white,
        .btn-ghost {
          font-family: var(--font-sans);
          border-radius: 50px;
          cursor: pointer;
          font-size: clamp(12px, 1vw, 13px);
          font-weight: 500;
          white-space: nowrap;
          min-height: 44px;
          transition: background 0.15s ease, border-color 0.15s ease,
                      color 0.15s ease, -webkit-transform 0.1s ease, transform 0.1s ease;
        }
        .btn-white:focus-visible,
        .btn-ghost:focus-visible {
          outline: 2px solid rgba(255,255,255,0.6);
          outline-offset: 3px;
        }
        .btn-white:disabled,
        .btn-ghost:disabled { opacity: 0.6; cursor: default; }

        .btn-white {
          padding: clamp(10px, 1.2vw, 13px) clamp(18px, 2vw, 26px);
          background: rgba(255,255,255,0.95);
          color: var(--teal-dark);
          border: none;
        }
        .btn-white:hover:not(:disabled) { background: #fff; -webkit-transform: translateY(-1px); transform: translateY(-1px); }

        .btn-ghost {
          padding: clamp(9px, 1.1vw, 12px) clamp(16px, 1.8vw, 22px);
          background: transparent;
          color: rgba(255,255,255,0.65);
          border: 1.5px solid rgba(255,255,255,0.2);
        }
        .btn-ghost:hover:not(:disabled) { border-color: rgba(255,255,255,0.45); color: #fff; }

        @media (prefers-reduced-motion: reduce) {
          .btn-white:hover { transform: none; -webkit-transform: none; }
        }

        /* ---------- FOOTER ---------- */
        .about-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 0 var(--pad-x) clamp(24px, 3.5vw, 36px);
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
        }

        .soc-label {
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 1px;
        }

        .soc-icon {
          width: 36px;
          height: 36px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 50%;
          border: 1px solid var(--white-12);
          background: var(--white-06);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.55);
          font-size: 11px;
          transition: background 0.15s ease;
        }
        .soc-icon:hover         { background: var(--white-12); }
        .soc-icon:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 3px; }

        /* ---------- SMALL MOBILE ---------- */
        @media (max-width: 400px) {
          .topbar-nav  { display: none; }
          .helps-grid  { grid-template-columns: 1fr; }
          .cta-btns    { width: 100%; flex-direction: column; }
          .btn-white,
          .btn-ghost   { width: 100%; text-align: center; justify-content: center; }
        }
      `}</style>
    </div>
  );
}