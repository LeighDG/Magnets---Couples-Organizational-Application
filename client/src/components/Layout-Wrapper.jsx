// Layout.jsx
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar stays fixed on the left */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;