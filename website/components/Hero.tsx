export default function Hero() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center bg-gradient-to-b from-white via-blue-50 to-white px-6 text-center">
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
        🚀 Meet Your AI Mentor
      </span>

      <h1 className="mt-8 text-5xl font-extrabold text-gray-900 md:text-7xl">
        Learn Smarter.
        <br />
        <span className="text-blue-600">Grow Faster.</span>
      </h1>

      <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">
        Mentora helps students and professionals learn faster, prepare for interviews,
        build skills, and achieve their dream careers with personalized AI guidance.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-5">
        <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
          Start Free 🚀
        </button>

        <button className="rounded-xl border border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-50">
          Watch Demo
        </button>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          🤖
          <h3 className="mt-3 font-bold">AI Mentor</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          📚
          <h3 className="mt-3 font-bold">Smart Roadmaps</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          🎤
          <h3 className="mt-3 font-bold">Mock Interviews</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          💼
          <h3 className="mt-3 font-bold">Career Guidance</h3>
        </div>
      </div>
    </section>
  );
}