// Sidebar.jsx
const DEFAULT_ITEMS = [
  { key: "CALENDAR", label: "SHARED CALENDAR" },
  { key: "BUDGET", label: "PARTNER BUDGETING" },
  { key: "SETTINGS", label: "APP SETTINGS" },
];

export default function Sidebar({
  title = "MAGNETIC",
  items = DEFAULT_ITEMS,
  activeKey = null,
  onSelect = null,
}) {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#7A958F] to-[#F2E7DD] h-screen flex flex-col p-6 shadow-xl">
      <div className="text-white text-3xl font-light tracking-widest mb-20">
        {title}
      </div>

      <nav className="flex flex-col gap-4">
        {items.map((item) => {
          const isActive = activeKey && item.key === activeKey;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect?.(item.key)}
              className={[
                "w-full py-3 px-4 text-xs font-semibold rounded-md transition-all text-left text-white",
                isActive
                  ? "bg-[#1f1b18] shadow-lg"
                  : "bg-[#292421] hover:bg-[#2D2D2D] hover:shadow-lg",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
