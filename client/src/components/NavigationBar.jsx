// Header.jsx
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  UserCircleIcon,
  ChevronDownIcon,
  StarIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { label: "ACCOUNT OPTIONS", to: "/account" },
    { label: "PARTNER LINK", to: "/partner-link" },
    { label: "About Magnetic", to: "/about" },
    { label: "Logout", action: "logout" }, // <-- action, not route
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-20 bg-[#F2E9E1] flex items-center justify-between px-8 shadow-sm relative z-50">
      <h1 className="text-2xl font-medium tracking-wide">DASHBOARD</h1>

      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 cursor-pointer group outline-none">
          <div className="flex items-center text-[#3D3D3D]">
            <UserCircleIcon className="h-10 w-10 bg-[#F2E9E1] rounded-full" />
            <UserCircleIcon className="h-10 w-10 -ml-4 bg-[#F2E9E1] rounded-full" />
          </div>
          <ChevronDownIcon className="h-4 w-4 text-gray-600 group-hover:translate-y-0.5 transition-transform" />
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
            <div className="bg-white/30 backdrop-blur-md p-3 rounded-[2rem] shadow-2xl border border-white/40">
              <div className="bg-[#F9F5F2] rounded-[1.5rem] overflow-hidden py-2 shadow-inner">
                {menuItems.map((item) => (
                  <Menu.Item key={item.label}>
                    {({ active }) => {
                      const baseClass =
                        `flex w-full items-center justify-between px-6 py-4 text-sm font-semibold tracking-wide transition-colors ` +
                        (active ? "bg-black/5 text-black" : "text-[#2D2D2D]");

                      // Logout is a button/action
                      if (item.action === "logout") {
                        return (
                          <button
                            type="button"
                            onClick={handleLogout}
                            className={baseClass}
                          >
                            <div className="flex items-center gap-3">
                              <div className="border border-black rounded-full p-0.5">
                                <StarIcon className="h-3 w-3" />
                              </div>
                              {item.label}
                            </div>
                            <ChevronRightIcon className="h-3 w-3 stroke-[3px]" />
                          </button>
                        );
                      }

                      // Everything else is a route link
                      return (
                        <Link to={item.to} className={baseClass}>
                          <div className="flex items-center gap-3">
                            <div className="border border-black rounded-full p-0.5">
                              <StarIcon className="h-3 w-3" />
                            </div>
                            {item.label}
                          </div>
                          <ChevronRightIcon className="h-3 w-3 stroke-[3px]" />
                        </Link>
                      );
                    }}
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
