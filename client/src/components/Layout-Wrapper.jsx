// Layout.jsx
import Sidebar from "./Sidebar";
import Navbar from "./NavigationBar";

export default function Layout({
  children,
  sidebarTitle = "MAGNETIC",
  sidebarItems,        // optional
  activeSidebarKey,    // optional
  onSidebarSelect,     // optional
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar
        title={sidebarTitle}
        items={sidebarItems}
        activeKey={activeSidebarKey}
        onSelect={onSidebarSelect}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
