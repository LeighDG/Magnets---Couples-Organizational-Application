// FramedPanel.jsx
export default function FramedPanel({ title, subtitle, children, rightSlot }) {
  return (
    <div className="relative w-full h-full">
      {/* Background area under nav */}
      <div className="min-h-[calc(100vh-80px)] p-10">
        {/* Frame outline like your Figma */}
        <div className="max-w-5xl mx-auto border border-white/20 rounded-[2rem] p-10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-10">
            <div className="flex-1">
              {title ? (
                <h2 className="text-5xl font-semibold tracking-wide text-white">
                  {title}
                </h2>
              ) : null}

              {subtitle ? (
                <p className="mt-4 text-sm text-white/80 max-w-xl">
                  {subtitle}
                </p>
              ) : null}

              <div className="mt-10">{children}</div>
            </div>

            {rightSlot ? (
              <div className="w-[320px]">{rightSlot}</div>
            ) : null}
          </div>

          <div className="mt-12 text-xs text-white/80">
            <button type="button" className="underline hover:text-white transition">
              Need help finding partner ID?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
