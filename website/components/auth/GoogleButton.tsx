import Image from "next/image";

type GoogleButtonProps = {
  onClick?: () => void;
};

export default function GoogleButton({
  onClick,
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg"
    >
      <img
        src="/icons/google.png"
        alt="Google"
        className="h-9 w-9 object-contain"
        draggable={false}
        />

      <span>Continue with Google</span>
    </button>
  );
}