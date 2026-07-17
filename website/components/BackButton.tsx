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
      className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-white backdrop-blur-xl transition hover:bg-white/20"
    >
      <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
        ←
        </span>

      Back
    </button>
  );
}