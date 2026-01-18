export default function Details({ relationship }) {
  const members = relationship?.members || [];

  return (
    <div className="max-w-4xl mx-auto mt-12">
      {/* Glassmorphism Card */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-12 shadow-2xl overflow-hidden">
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
          RELATIONSHIP DETAILS
        </h2>
        <p className="text-gray-200 text-sm leading-relaxed mb-10">
          Your accounts are linked and syncing shared features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m) => (
            <div
              key={m.user.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-xl"
            >
              <div className="text-white font-semibold text-lg">
                {m.user.firstName} {m.user.lastName}
              </div>
              <div className="text-white/80 text-xs mt-1">{m.user.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
