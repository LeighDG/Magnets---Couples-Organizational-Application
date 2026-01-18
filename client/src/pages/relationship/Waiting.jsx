import { useState } from "react";

export default function Waiting({ invite, onCopyLink, onCancel }) {
  const [keyHint, setKeyHint] = useState("Click to copy key");

  const handleCopyKey = async () => {
    if (!invite?.sharedCode) return;

    try {
      await navigator.clipboard.writeText(invite.sharedCode);
      setKeyHint("Copied!");
      setTimeout(() => setKeyHint("Click to copy key"), 1200);
    } catch {
      setKeyHint("Copy failed");
      setTimeout(() => setKeyHint("Click to copy key"), 1200);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      {/* Glassmorphism Card */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-12 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
                AWAITING RESPONSE...
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed max-w-sm">
                Send your partner the shared key or the invite link below. This invite expires on{" "}
                <span className="font-semibold">
                  {invite?.expiresAt ? new Date(invite.expiresAt).toLocaleString() : "—"}
                </span>
                .
              </p>
            </div>

            {/* Shared Key (hover + click to copy) */}
            <div className="max-w-md">
              <div className="text-white text-xs opacity-80 mb-2">Shared Key</div>

              <button
                type="button"
                onClick={handleCopyKey}
                className="group text-left"
                aria-label="Copy shared key"
              >
                <div className="text-3xl font-bold tracking-widest text-white select-none">
                  {invite?.sharedCode || "—"}
                </div>

                <div className="mt-2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  {keyHint}
                </div>
              </button>
            </div>

            {/* Invite Link (copy button next to link) */}
            <div className="max-w-md space-y-2">
              <div className="text-white text-xs opacity-80">Invite link</div>

              <div className="flex gap-3 items-center">
                <input
                  readOnly
                  value={invite?.link || ""}
                  className="flex-1 p-3 rounded-md bg-white text-gray-800 text-xs placeholder:text-gray-400 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={onCopyLink}
                  className="py-3 px-4 bg-[#2D2420] text-white rounded-md hover:bg-black transition-colors font-medium text-sm whitespace-nowrap"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="py-3 px-4 border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}
