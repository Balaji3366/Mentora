import Image from "next/image";

export default function LoginLogo() {
  return (
    <div className="flex items-center gap-6">
      <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-violet-100 transition-transform duration-300 hover:scale-105">
        <Image
        src="/images/mentora-logo.png"
        alt="Mentora Logo"
        width={84}
        height={84}
        priority
        className="rounded-xl"
        />
      </div>

      <div>
        <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">
          Mentora
        </h1>

        <p className="mt-2 text-lg font-medium">
          <span className="text-violet-600">Learn Smarter.</span>{" "}
          <span className="text-slate-700">Grow Faster.</span>
        </p>
      </div>
    </div>
  );
}