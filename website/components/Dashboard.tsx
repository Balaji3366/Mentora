"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";

export default function Dashboard() {
  const router = useRouter();

  const [resumeCount, setResumeCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);

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
  
  const { data: documentFiles, error: documentError } = await supabase.storage
  .from("uploads")
  .list();
 console.log("Document Files:", documentFiles);
console.log("Document Error:", documentError);
if (documentError) {
  console.error(documentError);
} else {
  setDocumentCount(documentFiles.length);
}
  }
  return (
    <section
      id="dashboard"
      className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pt-40 pb-24"
    >
      <div className="absolute left-6 top-6">
          <BackButton variant="light" />
        </div>

        <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center animate-in fade-in duration-700">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900">
            🚀 AI Learning Workspace
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Your complete AI workspace to analyze resumes, explore documents,
            chat with AI, generate quizzes and prepare for interviews — all in one place.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-14 grid gap-6 md:grid-cols-4">

          {/* Resume Reports */}
          <div className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">
              📄 Resume Reports
            </h3>

            <p className="mt-3 text-5xl font-extrabold text-green-600">
              {resumeCount}
            </p>
          </div>

          {/* Documents */}
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">
              📚 Documents
            </h3>

            <p className="mt-3 text-5xl font-extrabold text-blue-600">
              {documentCount}
            </p>
          </div>

          {/* AI Chats */}
          <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">
              🤖 AI Chats
            </h3>

            <p className="mt-3 text-5xl font-extrabold text-purple-600">
              0
            </p>
          </div>

          {/* Quizzes */}
          <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">
              📝 Quizzes
            </h3>

            <p className="mt-3 text-5xl font-extrabold text-orange-500">
              0
            </p>
          </div>

        </div>
         {/* Featured AI Mentor */}
<div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-10 text-white shadow-2xl">
  <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

    <div className="max-w-2xl">
      <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
        ⭐ Featured AI Mentor
      </span>

      <h2 className="mt-5 text-4xl font-extrabold">
        🤖 Your Personal AI Mentor
      </h2>

      <p className="mt-5 text-lg leading-8 text-blue-100">
        Learn faster, solve coding problems, prepare for interviews,
        improve your resume and get career guidance with your
        intelligent AI Mentor.
      </p>
    </div>

    <button
      onClick={() => router.push("/chat")}
      className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
    >
      🚀 Start AI Chat
    </button>

  </div>
</div>
        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-700">
        {/* Documents */}
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-4 text-5xl">📄</div>

            <h3 className="text-2xl font-bold text-gray-900">
              Documents
            </h3>

            <p className="mt-4 text-gray-600">
              Upload PDFs, summarize documents and chat with AI.
            </p>

            <button
              onClick={() => router.push("/documents")}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-700"
            >
              📂 Open Documents
            </button>
          </div>


          {/* AI Quiz */}
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-4 text-5xl">📝</div>

            <h3 className="text-2xl font-bold text-gray-900">
              AI Quiz
            </h3>

            <p className="mt-4 text-gray-600">
              Generate multiple choice questions from your study material.
            </p>

            <button
              onClick={() => router.push("/documents")}
              className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-600"
            >
              📝 Generate Quiz
            </button>
          </div>

          {/* Interview Questions */}
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-4 text-5xl">🎤</div>

            <h3 className="text-2xl font-bold text-gray-900">
              Interview Questions
            </h3>

            <p className="mt-4 text-gray-600">
              Practice HR, technical and scenario-based interview questions.
            </p>

            <button
              onClick={() => router.push("/documents")}
              className="mt-6 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-pink-700"
            >
              🎤 Practice Interview
            </button>
          </div>

          {/* Resume Analyzer */}
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-4 text-5xl">📄</div>

            <h3 className="text-2xl font-bold text-gray-900">
              Resume Analyzer
            </h3>

            <p className="mt-4 text-gray-600">
              Analyze your resume with AI, receive an ATS score,
              identify strengths and get personalized suggestions.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push("/resume")}
                className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-emerald-700"
              >
                🚀 Analyze
              </button>

              <button
                onClick={() => router.push("/resume-history")}
                className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-slate-800"
              >
                📜 History
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm font-semibold text-slate-600">
            ✨ Mentora AI Workspace
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Built for students, professionals and job seekers to learn smarter,
            prepare better and grow faster with Artificial Intelligence.
          </p>
        </div>

      </div>
    </section>
  );
}
