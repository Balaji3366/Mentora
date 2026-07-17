"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <button
      onClick={handleBack}
      className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-3 font-semibold text-slate-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white hover:shadow-cyan-200"
    >
      <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
        ←
        </span>

      Back
    </button>
  );
}