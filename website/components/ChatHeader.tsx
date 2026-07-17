export default function ChatHeader() {
  return (
    <div className="border-b border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 text-xl text-white shadow-lg">
          ✨
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Mentora AI
          </h2>

          <p className="text-sm text-slate-300">
            Your Personal AI Career Mentor
          </p>
        </div>
      </div>
    </div>
  );
}