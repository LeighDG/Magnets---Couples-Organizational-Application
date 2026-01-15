import BackgroundLayout from '../components/BackgroundLayout';
import LayoutWrapper from '../components/Layout-Wrapper';
import { UserCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

const PartnerLink = () => {
  return (
    <BackgroundLayout>
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto mt-12">
        {/* Section Label */}
        <div className="mb-4">
          <span className="bg-[#3D3D3D] text-white text-xs px-3 py-1 rounded">
            Section 1
          </span>
        </div>

        {/* Glassmorphism Card */}
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-12 shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            
            {/* Left Side: Form */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
                  PARTNER ACCOUNT LINK
                </h2>
                <p className="text-gray-200 text-sm leading-relaxed max-w-sm">
                  Connect with another partner by entering their account ID and their shared link key.
                </p>
              </div>

              <form className="space-y-4 max-w-xs">
                <input
                  type="text"
                  placeholder="Partner Account ID"
                  className="w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#84A59D]"
                />
                <input
                  type="password"
                  placeholder="Shared Link Key"
                  className="w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#84A59D]"
                />
                <button 
                  type="submit"
                  className="w-full py-3 bg-[#2D2420] text-white rounded-md hover:bg-black transition-colors font-medium text-sm"
                >
                  Link Accounts
                </button>
              </form>

              <button className="text-white text-xs underline underline-offset-4 hover:text-gray-200">
                Need help finding partner ID?
              </button>
            </div>

            {/* Right Side: Visual Graphic */}
            <div className="flex items-center gap-4 self-center pr-8">
              <div className="bg-[#D1C4E9] p-2 rounded-full shadow-lg">
                <UserCircleIcon className="h-16 w-16 text-[#5E35B1]" />
              </div>
              <PlusIcon className="h-8 w-8 text-white font-bold" />
              <div className="bg-[#D1C4E9] p-2 rounded-full shadow-lg">
                <UserCircleIcon className="h-16 w-16 text-[#5E35B1]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </LayoutWrapper>
    </BackgroundLayout>
  );
};

export default PartnerLink;