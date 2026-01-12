export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Magnet
        </h1>

        <p className="text-gray-600 max-w-md mx-auto">
          Organise your relationship like a fridge —
          notes, reminders, and moments that stick.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Get Started
          </button>

          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-200 transition">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
