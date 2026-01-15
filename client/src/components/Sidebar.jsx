// Sidebar.jsx
const Sidebar = () => {
  const navItems = ["SHARED CALENDAR", "PARTNER BUDGETING", "APP SETTINGS"];

  return (
    /* 
        Background gradient from top to bottom
        from-[#84A59D] is your primary sage green
        to-[#A5C0B9] is a lighter shade to create that soft fade effect
    */
    <aside className="w-64 bg-gradient-to-b from-[#7A958F] to-[#F2E7DD] h-screen flex flex-col p-6 shadow-xl">
      <div className="text-white text-3xl font-light tracking-widest mb-20">
        MAGNETIC
      </div>
      
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <button 
            key={item}
            className="w-full py-3 px-4 bg-[#292421] text-white text-xs font-semibold rounded-md hover:bg-[#2D2D2D] transition-all hover:shadow-lg text-left"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;