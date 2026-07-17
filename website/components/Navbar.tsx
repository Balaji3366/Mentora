"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-10 py-5 backdrop-blur-xl">
      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="cursor-pointer bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_14px_#38bdf8]"
      >
        Mentora
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <a
          href="#features"
          className="font-medium text-slate-300 transition-all duration-300 hover:text-cyan-400"
        >
          Features
        </a>
        <a
        href="#plans"
        className="font-medium text-slate-300 transition-all duration-300 hover:text-cyan-400"
      >
        Plans
      </a>

        <a
          href="#dashboard"
          className="font-medium text-slate-300 transition-all duration-300 hover:text-cyan-400"
        >
          Roadmaps
        </a>

        <a
          href="#about"
          className="font-medium text-slate-300 transition-all duration-300 hover:text-cyan-400"
        >
          About
        </a>

      
      </div>
    </nav>
  );
}