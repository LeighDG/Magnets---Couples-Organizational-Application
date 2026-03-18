import { useNavigate } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(145deg, #4a7c6f 0%, #2d5a4e 45%, #1a3d35 100%)", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Blobs */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 350, height: 350, background: "#a8d5c2", top: -100, left: -60, filter: "blur(70px)", opacity: 0.25 }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 260, height: 260, background: "#e8c97a", bottom: -60, right: 80, filter: "blur(70px)", opacity: 0.2 }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 200, height: 200, background: "#d4a898", top: 180, right: -30, filter: "blur(70px)", opacity: 0.18 }} />

      {/* Topbar */}
      <div className="relative z-10 flex items-center justify-between px-9 py-6">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 35, fontWeight: 500, letterSpacing: 6, color: "rgba(255,255,255,0.9)" }}>
          MAGNETIC
        </span>
        <div className="flex gap-6">
          {["About", "Features", "Contact"].map(l => (
            <span key={l} className="text-xs cursor-pointer transition" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.9)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 flex flex-1 items-center px-10 pb-10 gap-10">

        {/* Left */}
        <div className="flex flex-col justify-center" style={{ flex: 1.4 }}>
          <div className="text-4xl mb-4" style={{ display: "inline-block", animation: "wave 2.2s ease-in-out infinite", transformOrigin: "70% 70%" }}>👋</div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 72, fontWeight: 400, lineHeight: 1.1, color: "rgba(255,255,255,0.95)", marginBottom: 22 }}>
            Life's better<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>together.</em>
          </h1>

          <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 420, fontWeight: 300, fontSize: 16 }}>
            Magnetic is your shared space to plan, budget, and stay in sync — built for the two of you, no spreadsheets required.
          </p>

          <div className="flex items-center gap-3 mb-9">
            <button onClick={() => navigate("/signup")}
              className="transition"
              style={{ padding: "16px 36px", background: "rgba(255,255,255,0.95)", color: "#1a3d35", border: "none", borderRadius: 50, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.95)"; e.target.style.transform = "translateY(0)"; }}>
              Get Started — it's free
            </button>
            <button onClick={() => navigate("/login")}
              className="transition"
              style={{ padding: "15px 32px", background: "transparent", color: "rgba(255,255,255,0.75)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 50, fontSize: 14,  fontWeight: 400, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.55)"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.color = "rgba(255,255,255,0.75)"; }}>
              Log In
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Find us</span>
            {[FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF].map((Icon, i) => (
              <div key={i} className="flex items-center justify-center cursor-pointer transition"
                style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.13)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}>
                <Icon style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3" style={{ flex: 0.6 }}>

          {/* Partner card */}
          <div className="flex items-center gap-4 rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
            <div className="flex">
              {["🧑", "👩"].map((e, i) => (
                <div key={i} className="flex items-center justify-center text-lg rounded-full"
                  style={{ width: 42, height: 42, border: "2.5px solid rgba(255,255,255,0.15)", marginLeft: i === 1 ? -12 : 0, background: i === 0 ? "rgba(126,212,184,0.3)" : "rgba(232,184,75,0.3)" }}>
                  {e}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>You + your partner, in sync</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Link accounts and share everything that matters</div>
            </div>
            <div className="flex items-center justify-center text-lg rounded-full"
              style={{ width: 34, height: 34, background: "rgba(255,255,255,0.1)" }}>💚</div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "📅", title: "Shared Calendar", desc: "Events you both can see and edit" },
              { icon: "💰", title: "Budgeting", desc: "Track spending without the awkward convos" },
              { icon: "✅", title: "Lists", desc: "Groceries, errands, big life stuff" },
              { icon: "📝", title: "Notes", desc: "Ideas, thoughts, plans — yours or shared" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-4 transition cursor-default"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div className="flex items-center justify-center rounded-xl text-lg mb-3"
                  style={{ width: 36, height: 36, background: "rgba(255,255,255,0.1)" }}>{f.icon}</div>
                <div className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.88)" }}>{f.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", fontWeight: 300 }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}>
            <span className="text-xl">🔗</span>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
              Sign up, then <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>invite your partner</strong> with a simple link — you'll both be set up in under two minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Wave animation keyframe */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}