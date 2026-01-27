import { UserCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Invite({ onCreateInvite }) {
  return (
    <div className="max-w-4xl mx-auto mt-12">
      {/* Glassmorphism Card */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-12 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Left Side */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
                PARTNER ACCOUNT LINK
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed max-w-sm">
                Create an invite link and a shared key to send to your partner.
              </p>
            </div>

            <div className="space-y-4 max-w-xs">
            <button
              type="button"
              onClick={onCreateInvite}
              className="w-full max-w-xs py-3 bg-[#2D2420] text-white rounded-md hover:bg-black transition-colors font-medium text-sm"
            >
              Generate Invite
            </button>

            <button className="text-white text-xs underline underline-offset-4 hover:text-gray-200">
              How does Partner Linking work?
            </button>
          </div>
          </div>

          {/* Right Side Visual */}
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
  );
}
