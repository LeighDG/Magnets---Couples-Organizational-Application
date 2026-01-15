// Header.jsx
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="h-20 bg-[#F2E9E1] flex items-center justify-between px-8 shadow-sm">
      <h1 className="text-2xl font-medium tracking-wide">DASHBOARD</h1>
      
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="flex items-center text-[#3D3D3D]">
          <UserCircleIcon className="h-10 w-10" />
          <UserCircleIcon className="h-10 w-10 -ml-4" /> {/* Overlapping icons from your design */}
        </div>
        <ChevronDownIcon className="h-4 w-4 text-gray-600 group-hover:translate-y-0.5 transition-transform" />
      </div>
    </header>
  );
};

export default Header;