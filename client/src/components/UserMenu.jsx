// UserMenu.jsx
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  UserCircleIcon, 
  ChevronDownIcon, 
  StarIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline';

const menuItems = [
  { label: 'ACCOUNT OPTIONS', href: '#' },
  { label: 'PARTNER LINK', href: '#' },
  { label: 'About Magnetic', href: '#' },
  { label: 'Logout', href: '#' },
];

const UserMenu = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Trigger Button */}
      <Menu.Button className="flex items-center gap-2 group outline-none">
        <div className="flex items-center">
          <div className="bg-[#E5D9F2] p-1 rounded-full border-2 border-white/20">
            <UserCircleIcon className="h-8 w-8 text-[#3D3D3D]" />
          </div>
          <div className="bg-[#E5D9F2] p-1 rounded-full border-2 border-white/20 -ml-4">
            <UserCircleIcon className="h-8 w-8 text-[#3D3D3D]" />
          </div>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:translate-y-0.5 transition-transform" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-4 w-72 origin-top-right outline-none">
          {/* Outer Glass Container */}
          <div className="bg-white/30 backdrop-blur-md p-3 rounded-[2rem] shadow-2xl border border-white/40">
            
            {/* Inner Content Card */}
            <div className="bg-[#F9F5F2] rounded-[1.5rem] overflow-hidden py-2 shadow-inner">
              {menuItems.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={`flex items-center justify-between px-6 py-4 text-sm font-semibold tracking-wide transition-colors
                        ${active ? 'bg-black/5 text-black' : 'text-[#2D2D2D]'}`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Star icon inside a circle to match your screenshot */}
                        <div className="border border-black rounded-full p-0.5">
                          <StarIcon className="h-3 w-3" />
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
  );
};

export default UserMenu;