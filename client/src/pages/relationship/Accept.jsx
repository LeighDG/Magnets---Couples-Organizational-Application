import { useEffect, useMemo, useRef, useState } from "react";

function normalizeCode(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/\s+/g, "")
    .trim();
}

function isCodeFormatPlausible(code) {
  // You can tighten this later to match your code format e.g. MAG-123456
  return code.length >= 6;
}

export default function Accept({
  initialCode = "",
  lookupInviteByCode,   // async (code) => { inviterName, inviterEmail?, expiresAt }
  acceptInviteByCode,   // async (code) => void
}) {
  const [code, setCode] = useState(initialCode);
  const normalized = useMemo(() => normalizeCode(code), [code]);

  const [preview, setPreview] = useState(null);
  const [checking, setChecking] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState("");

  // prevents older requests from overwriting newer ones
  const lastRequestId = useRef(0);

  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);


  useEffect(() => {
    setError("");
    setPreview(null);

    if (!isCodeFormatPlausible(normalized)) {
      setChecking(false);
      return;
    }

    const requestId = ++lastRequestId.current;
    const timer = setTimeout(async () => {
      setChecking(true);
      try {
        const data = await lookupInviteByCode(normalized);

        // only apply if this is the latest request
        if (lastRequestId.current === requestId) {
          setPreview(data);
          setError("");
        }
      } catch (e) {
        if (lastRequestId.current === requestId) {
          setPreview(null);
          setError(e?.message || "Invalid or expired code");
        }
      } finally {
        if (lastRequestId.current === requestId) setChecking(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [normalized, lookupInviteByCode]);

  const onAccept = async () => {
    setError("");
    setAccepting(true);
    try {
      await acceptInviteByCode(normalized);
      // navigation will happen in RelationshipPage once accept succeeds
    } catch (e) {
      setError(e?.message || "Failed to link accounts");
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-12 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Left: input */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
                ACCEPT PARTNER INVITE
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed max-w-sm">
                Enter the shared key you received from your partner.
              </p>
            </div>

            <div className="space-y-4 max-w-xs">
              <input
                type="text"
                placeholder="Shared Key"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#84A59D]"
              />

              <button
                type="button"
                onClick={onAccept}
                disabled={!preview || accepting}
                className="w-full py-3 bg-[#2D2420] text-white rounded-md hover:bg-black transition-colors font-medium text-sm disabled:opacity-50"
              >
                {accepting ? "Linking..." : "Link Accounts"}
              </button>

              {checking ? (
                <p className="text-xs text-white/80">Checking code...</p>
              ) : null}

              {error ? (
                <p className="text-xs text-red-100 bg-red-500/20 px-4 py-3 rounded">
                  {error}
                </p>
              ) : null}
            </div>

            <button className="text-white text-xs underline underline-offset-4 hover:text-gray-200">
              Need help finding partner ID?
            </button>
          </div>

          {/* Right: auto preview */}
          <div className="w-full md:w-[320px]">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-xl">
              <p className="text-white text-sm mb-3">
                You are about to link with:
              </p>

              <div className="text-white text-lg font-semibold">
                {preview?.inviterName || "—"}
              </div>

              {preview?.inviterEmail ? (
                <div className="text-white/80 text-xs mt-1">{preview.inviterEmail}</div>
              ) : null}

              {preview?.expiresAt ? (
                <div className="text-white/70 text-xs mt-4">
                  Expires: {new Date(preview.expiresAt).toLocaleString()}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
