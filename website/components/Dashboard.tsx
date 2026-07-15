"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const [resumeCount, setResumeCount] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { count } = await supabase
      .from("resume_history")
      .select("*", {
        count: "exact",
        head: true,
      });

    setResumeCount(count || 0);
  }

  return (
    <section
      id="dashboard"
      className="min-h-screen bg-gray-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Your AI Learning Dashboard
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Access all AI-powered learning tools from one place.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Resume Reports
            </h3>

            <p className="mt-2 text-4xl font-bold text-emerald-600">
              {resumeCount}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Documents
            </h3>

            <p className="mt-2 text-4xl font-bold text-blue-600">
              0
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              AI Chats
            </h3>

            <p className="mt-2 text-4xl font-bold text-purple-600">
              0
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Quizzes
            </h3>

            <p className="mt-2 text-4xl font-bold text-orange-500">
              0
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Documents */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900">
              📄 Documents
            </h3>

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
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900">
              🤖 AI Chat
            </h3>

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
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900">
              📝 AI Quiz
            </h3>

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

          {/* Interview */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900">
              🎤 Interview Questions
            </h3>

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
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900">
              📄 Resume Analyzer
            </h3>

            <p className="mt-4 text-gray-600">
              Analyze your resume with AI and get an ATS score,
              strengths and improvement suggestions.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => router.push("/resume")}
                className="rounded-xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
              >
                Analyze
              </button>

              <button
                onClick={() => router.push("/resume-history")}
                className="rounded-xl bg-slate-700 px-6 py-3 text-white hover:bg-slate-800"
              >
                History
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}