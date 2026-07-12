export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white via-blue-50 to-white px-6 text-center">
      {/* Badge */}
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
        🚀 Meet Your AI Mentor
      </span>

      {/* Heading */}
      <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl">
        Learn Smarter.
        <br />
        <span className="text-blue-600">Grow Faster.</span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">
        Mentora helps students and professionals learn faster, prepare for
        interviews, build skills, and achieve their dream careers with
        personalized AI guidance.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-5">
        <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:scale-105 hover:bg-blue-700">
          Start Free 🚀
        </button>

        <button className="rounded-xl border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition duration-300 hover:bg-blue-50">
          Watch Demo
        </button>
      </div>
    </section>
  );
}