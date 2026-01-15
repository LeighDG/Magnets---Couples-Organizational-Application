// Layout.jsx
import Sidebar from './Sidebar';
import Navbar from './NavigationBar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar stays fixed on the left */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;