"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-10 py-6">
      <h1
        onClick={() => router.push("/")}
        className="cursor-pointer text-3xl font-bold text-blue-600"
      >
        Mentora
      </h1>

      <div className="flex items-center gap-8">
        <a href="#features" className="hover:text-blue-600">
          Features
        </a>

        <a href="#dashboard" className="hover:text-blue-600">
          Roadmaps
        </a>

        <a href="#about" className="hover:text-blue-600">
          About
        </a>

        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}