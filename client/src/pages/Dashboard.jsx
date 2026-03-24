import LayoutWrapper from "../components/Layout-Wrapper";

// ── Placeholder cards ─────────────────────────────────────────────────────────
const CARDS = [
  { label: "Today's schedule",  icon: "📅", text: "Calendar coming soon"  },
  { label: "Budget · March",    icon: "💰", text: "Budgeting coming soon" },
  { label: "Lists · Today",     icon: "✅", text: "Lists coming soon"     },
  { label: "Recent note",       icon: "📝", text: "Notes coming soon"     },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <LayoutWrapper pageTitle="Dashboard">
      <div className="dash-body">
        {CARDS.map((card) => (
          <div key={card.label} className="dash-card">
            <p className="card-label">{card.label}</p>
            <div className="card-placeholder">
              <span>{card.icon}</span>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .dash-body {
          padding: clamp(14px, 2vw, 20px) clamp(16px, 2.5vw, 24px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.5vw, 16px);
          align-content: start;
        }
        @media (max-width: 600px) {
          .dash-body { grid-template-columns: 1fr; }
        }
        .dash-card {
          background: #fff;
          border-radius: 14px;
          padding: clamp(14px, 1.8vw, 18px);
          border: 1px solid rgba(0,0,0,0.07);
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .card-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #999;
          font-weight: 500;
        }
        .card-placeholder {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: clamp(24px, 3vw, 36px) 0;
        }
        .card-placeholder span { font-size: clamp(24px, 3vw, 32px); }
        .card-placeholder p    { font-size: 12px; color: #bbb; font-weight: 300; }
      `}</style>
    </LayoutWrapper>
  );
}