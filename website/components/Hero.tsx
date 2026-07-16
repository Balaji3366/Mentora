export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6"
    >
      {/* Background Glow */}
      <div className="absolute left-20 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px]" />

      {/* Premium Live Badge */}
        <div className="relative inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-white/5 px-8 py-4 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.25)] animate-pulse-soft">

          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>

          <span className="text-base font-semibold tracking-wide text-cyan-100">
            Live AI Mentor
          </span>

        </div>

      {/* Heading */}
      <h1 className="mt-8 text-center text-5xl font-extrabold leading-tight md:text-7xl">
        <span className="bg-gradient-to-r from-white via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
          Learn Smarter.
        </span>

        <br />

        <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
          Grow Faster.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-3xl text-center text-xl leading-8 text-slate-300">
        Upload any PDF and instantly generate summaries, answers, quizzes,
        interview questions, and personalized AI insights with Mentora.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-5">
        <button className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-cyan-500/40">
          🚀 Start Free
        </button>

        <button className="rounded-xl border border-cyan-400/40 bg-white/5 px-8 py-4 text-lg font-semibold text-cyan-200 backdrop-blur-md transition duration-300 hover:bg-cyan-500/10">
          ▶ Watch Demo
        </button>
      </div>
    </section>
  );
}