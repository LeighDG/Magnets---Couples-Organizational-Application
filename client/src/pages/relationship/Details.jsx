export default function Details({ relationship, onUnlink }) {
  const members = relationship?.members || [];

  return (
    <div className="max-w-4xl mx-auto mt-12">
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

        {/* Unlink action */}
        <div className="mt-10">
          <button
            type="button"
            onClick={onUnlink}
            className="py-3 px-4 border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors font-medium text-sm"
          >
            Unlink Relationship
          </button>
        </div>
      </div>
    </div>
  );
}
