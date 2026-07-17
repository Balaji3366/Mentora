"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6"
    >
      {/* Background Glow */}
      <div className="absolute left-20 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px]" />

      {/* Live Badge */}
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
        Upload any PDF and instantly generate AI summaries, ask questions,
        create quizzes, prepare for interviews, and analyze resumes —
        all in one intelligent workspace.
      </p>

      {/* CTA */}
      <div className="mt-12">
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-cyan-500/50"
        >
          🚀 Get Started →
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span>📄</span>
          <span>AI PDF Analysis</span>
        </div>

        <div className="flex items-center gap-2">
          <span>⚡</span>
          <span>Instant Summaries</span>
        </div>

        <div className="flex items-center gap-2">
          <span>📝</span>
          <span>Smart Quiz Generator</span>
        </div>

        <div className="flex items-center gap-2">
          <span>🎤</span>
          <span>Interview Preparation</span>
        </div>

        <div className="flex items-center gap-2">
          <span>📊</span>
          <span>ATS Resume Analyzer</span>
        </div>
      </div>
    </section>
  );
}