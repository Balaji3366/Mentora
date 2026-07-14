export default function ResumeHistoryPage() {
  return (
    <section className="min-h-screen bg-gray-100 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-center text-5xl font-bold text-gray-900">
          📚 Resume History
        </h1>

        <p className="mt-4 text-center text-gray-500">
          View all your previous AI resume analysis reports.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Card 1 */}
          <div className="flex min-h-[320px] flex-col rounded-2xl border bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 break-words">
              📄 QA_Automation_Resume.pdf
            </h2>

            <p className="mt-4 text-center text-gray-500">
              ATS Score
            </p>

            <p className="mt-2 text-center text-4xl font-extrabold text-green-700">
              78/100
            </p>

            <p className="mt-3 text-center text-sm text-gray-500">
              📅 09 Jul 2026
            </p>

            <button className="mt-auto w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">
              👀 View Report
            </button>
          </div>

          {/* Card 2 */}
          <div className="flex min-h-[320px] flex-col rounded-2xl border bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 break-words">
              📄 Java_Developer_Resume.pdf
            </h2>

            <p className="mt-4 text-center text-gray-500">
              ATS Score
            </p>

            <p className="mt-2 text-center text-4xl font-extrabold text-yellow-600">
              69/100
            </p>

            <p className="mt-3 text-center text-sm text-gray-500">
              📅 05 Jul 2026
            </p>

            <button className="mt-auto w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">
              👀 View Report
            </button>
          </div>

          {/* Card 3 */}
          <div className="flex min-h-[320px] flex-col rounded-2xl border bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 break-words">
              📄 FullStack_Resume.pdf
            </h2>

            <p className="mt-4 text-center text-gray-500">
              ATS Score
            </p>

            <p className="mt-2 text-center text-4xl font-extrabold text-red-600">
              48/100
            </p>

            <p className="mt-3 text-center text-sm text-gray-500">
              📅 01 Jul 2026
            </p>

            <button
            className="mt-auto w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition"
            >
            👀 View Report
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}