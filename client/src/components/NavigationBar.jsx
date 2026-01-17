// Header.jsx
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  UserCircleIcon, 
  ChevronDownIcon, 
  StarIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline';

const Header = () => {
  const menuItems = [
    { label: 'ACCOUNT OPTIONS', href: '/account' },
    { label: 'PARTNER LINK', href: '/link' },
    { label: 'About Magnetic', href: '/about' },
    { label: 'Logout', href: '/logout' },
  ];

  return (
    <header className="h-20 bg-[#F2E9E1] flex items-center justify-between px-8 shadow-sm relative z-50">
      <h1 className="text-2xl font-medium tracking-wide">DASHBOARD</h1>
      
      <Menu as="div" className="relative">
        {/* The Trigger: Your existing icon setup */}
        <Menu.Button className="flex items-center gap-2 cursor-pointer group outline-none">
          <div className="flex items-center text-[#3D3D3D]">
            {/* Added a solid background to icons to match the "clean" overlap in the image */}
            <UserCircleIcon className="h-10 w-10 bg-[#F2E9E1] rounded-full" />
            <UserCircleIcon className="h-10 w-10 -ml-4 bg-[#F2E9E1] rounded-full" />
          </div>
          <ChevronDownIcon className="h-4 w-4 text-gray-600 group-hover:translate-y-0.5 transition-transform" />
        </Menu.Button>

        {/* The Dropdown Menu */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-7 w-72 origin-top-right outline-none">
            {/* The outer "glass" container from image_d83b67.png */}
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-[2.5rem] shadow-2xl border border-white/30">
              
              {/* Inner Content Card */}
              <div className="bg-[#F9F5F2] rounded-[2rem] overflow-hidden py-2">
                {menuItems.map((item) => (
                  <Menu.Item key={item.label}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={`flex items-center justify-between px-6 py-4 text-[13px] font-bold tracking-wider transition-colors
                          ${active ? 'bg-black/5' : ''} text-[#1A1A1A]`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Circular Star Icon as seen in your crop */}
                          <div className="border border-black rounded-full p-0.5">
                            <StarIcon className="h-3 w-3 fill-black" />
                          </div>
                          {item.label}
                        </div>
                        <ChevronRightIcon className="h-3 w-3 stroke-[3px]" />
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
};

export default Header;