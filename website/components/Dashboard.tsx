export default function Dashboard() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Your Learning Dashboard
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Track your learning progress and continue your journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="text-xl font-bold">📚 Learning Progress</h3>

            <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-3/4 rounded-full bg-blue-600"></div>
            </div>

            <p className="mt-4 text-gray-600">
              75% Completed
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="text-xl font-bold">🎯 Current Goal</h3>

            <p className="mt-5 text-gray-600">
              Complete Frontend Roadmap
            </p>

            <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              Continue
            </button>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="text-xl font-bold">🏆 Achievements</h3>

            <div className="mt-5 space-y-3">
              <p>🥇 HTML Master</p>
              <p>🥈 CSS Explorer</p>
              <p>🥉 JavaScript Beginner</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}