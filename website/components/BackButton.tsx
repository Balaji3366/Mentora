"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  variant?: "light" | "dark";
};

export default function BackButton({
  variant = "dark",
}: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  const styles =
    variant === "light"
      ? "group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-lg"
      : "group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-2.5 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-xl";

  return (
    <button
      onClick={handleBack}
      className={styles}
      aria-label="Go Back"
    >
      <span className="text-lg font-bold text-violet-600 transition-transform duration-300 group-hover:-translate-x-1">
        ←
      </span>

      <span className="font-semibold">Back</span>
    </button>
  );
}