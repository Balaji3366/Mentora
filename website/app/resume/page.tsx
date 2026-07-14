"use client";

import { useState } from "react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const score =
  parseInt(result.match(/ATS_SCORE:\s*(\d+)\s*\/?\s*100/i)?.[1] || "0");

const strengths =
  result
    .match(/STRENGTHS:([\s\S]*?)WEAKNESSES:/)?.[1]
    ?.split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace("-", "").trim()) || [];

const weaknesses =
  result
    .match(/WEAKNESSES:([\s\S]*?)SUGGESTIONS:/)?.[1]
    ?.split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace("-", "").trim()) || [];

const suggestions =
  result
    .match(/SUGGESTIONS:([\s\S]*)/)?.[1]
    ?.split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace("-", "").trim()) || [];

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
    formData.append("resume", file);

    const response = await fetch("/api/resume", {
        method: "POST",
        body: formData,
        });

      const data = await response.json();
      setResult(data.message);
      console.log(result);
      console.log(score);
    } catch (error) {
      console.error(error);
      setResult("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-center text-5xl font-bold">
          📄 AI Resume Analyzer
        </h1>

        <p className="mt-4 text-center text-gray-600">
          Upload your resume and get an ATS score, strengths,
          weaknesses and AI suggestions.
        </p>

        <div className="mt-12 rounded-3xl bg-white p-10 shadow-xl">
          <input
            type="file"
            accept=".pdf"
            className="w-full rounded-xl border p-4"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {file && (
            <p className="mt-4 font-semibold text-green-600">
              ✅ {file.name}
            </p>
          )}

          <button
            onClick={analyzeResume}
            className="mt-8 w-full rounded-xl bg-emerald-600 py-4 text-lg text-white hover:bg-emerald-700"
          >
            {loading ? "Analyzing..." : "Analyze Resume 🚀"}
          </button>

                {result && (
  <div className="mt-8 rounded-2xl bg-white p-8 shadow-xl border">

    <h2 className="mb-6 text-3xl font-bold text-center">
      📊 AI Resume Analysis
    </h2>

    {/* ATS Score */}
<div className="mb-8 rounded-xl bg-blue-100 p-6">
  <h3 className="text-xl font-bold text-blue-800">
    📊 ATS Score
  </h3>

  <p className="mt-2 text-4xl font-extrabold text-blue-900">
  {score}/100
</p>
  

  <div className="mt-4 h-4 w-full rounded-full bg-blue-200">
    <div
      className="h-4 rounded-full bg-blue-600 transition-all duration-700"
      style={{ width: `${score}%` }}
    />
  </div>
</div>

{/* Strengths */}
<div className="mb-6 rounded-xl bg-green-100 p-6">
  <h3 className="mb-4 text-xl font-bold text-green-800">
    💪 Strengths
  </h3>

  <ul className="space-y-2">
    {strengths.map((item, index) => (
      <li key={index} className="text-gray-700">
        ✅ {item}
      </li>
    ))}
  </ul>
</div>

{/* Weaknesses */}
<div className="mb-6 rounded-xl bg-yellow-100 p-6">
  <h3 className="mb-4 text-xl font-bold text-yellow-800">
    ⚠ Weaknesses
  </h3>

  <ul className="space-y-2">
    {weaknesses.map((item, index) => (
      <li key={index} className="text-gray-700">
        ❌ {item}
      </li>
    ))}
  </ul>
</div>

{/* Suggestions */}
<div className="rounded-xl bg-purple-100 p-6">
  <h3 className="mb-4 text-xl font-bold text-purple-800">
    🚀 Suggestions
  </h3>

  <ul className="space-y-2">
    {suggestions.map((item, index) => (
      <li key={index} className="text-gray-700">
        💡 {item}
      </li>
    ))}
  </ul>
</div>
  </div>
)}
        </div>
      </div>
    </section>
  );
}