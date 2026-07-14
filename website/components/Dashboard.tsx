"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <section
  id="dashboard"
  className="bg-gray-50 py-24 min-h-screen"
>
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Your AI Learning Dashboard
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Access all AI-powered learning tools from one place.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Documents */}
          <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold">📄 Documents</h3>

            <p className="mt-4 text-gray-600">
              Upload PDFs, summarize them and chat with AI.
            </p>

            <button
              onClick={() => router.push("/documents")}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Open →
            </button>
          </div>

          {/* AI Chat */}
          <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold">🤖 AI Chat</h3>

            <p className="mt-4 text-gray-600">
              Ask questions from your uploaded PDFs using AI.
            </p>

            <button
              onClick={() => router.push("/documents")}
              className="mt-6 rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
            >
              Open →
            </button>
          </div>

          {/* AI Quiz */}
          <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold">📝 AI Quiz</h3>

            <p className="mt-4 text-gray-600">
              Generate multiple choice questions from your PDFs.
            </p>

            <button
              onClick={() => router.push("/documents")}
              className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
            >
              Open →
            </button>
          </div>

          {/* Interview Questions */}
          <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold">🎤 Interview Questions</h3>

            <p className="mt-4 text-gray-600">
              Generate HR, Technical and Scenario-based interview questions.
            </p>

            <button
              onClick={() => router.push("/documents")}
              className="mt-6 rounded-xl bg-pink-600 px-6 py-3 text-white hover:bg-pink-700"
            >
              Open →
            </button>
          </div>
         {/* Resume Analyzer */}
          <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold">📄 Resume Analyzer</h3>

            <p className="mt-4 text-gray-600">
              Analyze your resume with AI and get an ATS score, strengths, and improvement suggestions.
            </p>

            <button
              onClick={() => router.push("/resume")}
              className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
            >
              Open →
            </button>
          </div>  
        </div>

      </div>
    </section>
  );
}