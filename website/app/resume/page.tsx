"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { supabase } from "@/lib/supabase";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [downloading, setDownloading] = useState(false);
  const score =
  parseInt(result.match(/ATS_SCORE:\s*(\d+)\s*\/?\s*100/i)?.[1] || "0");
  const scoreColor =
  score >= 75
    ? "bg-green-600"
    : score >= 50
    ? "bg-yellow-500"
    : "bg-red-600";

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
    const downloadReport = async () => {
  setDownloading(true);

  try {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("AI Resume Analysis Report", 20, y);

    y += 15;

    doc.setFontSize(16);
    doc.text(`ATS Score: ${score}/100`, 20, y);

    y += 15;

    doc.setFontSize(15);
    doc.text("Strengths", 20, y);

    y += 10;

    strengths.forEach((item: string) => {
  doc.setFontSize(12);

  const lines = doc.splitTextToSize(`• ${item}`, 160);

  doc.text(lines, 25, y);

  y += lines.length * 8;
  if (y > 270) {
  doc.addPage();
  y = 20;
}
});

    y += 5;

    doc.setFontSize(15);
    doc.text("Weaknesses", 20, y);

    y += 10;

    weaknesses.forEach((item: string) => {
  doc.setFontSize(12);

  const lines = doc.splitTextToSize(`• ${item}`, 160);

  doc.text(lines, 25, y);

  y += lines.length * 8;
  if (y > 270) {
  doc.addPage();
  y = 20;
}
});

    y += 5;

    doc.setFontSize(15);
doc.text("Suggestions", 20, y);

y += 10;

suggestions.forEach((item: string) => {
  doc.setFontSize(12);

  const lines = doc.splitTextToSize(`• ${item}`, 160);

  doc.text(lines, 25, y);

  y += lines.length * 8;
  if (y > 270) {
  doc.addPage();
  y = 20;
}
});

    doc.save("Mentora_AI_Resume_Report.pdf");
  } catch (error) {
    console.error(error);
  } finally {
    setDownloading(false);
  }
};
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

if (!response.ok || !data.message) {
  setResult(
    data.message || "Gemini API quota exceeded. Please try again later."
  );
  setLoading(false);
  return;
}

const atsScore = parseInt(
  data.message.match(/ATS_SCORE:\s*(\d+)\s*\/?\s*100/i)?.[1] || "0"
);

    const { error } = await supabase
  .from("resume_history")
  .insert([
    {
      file_name: file.name,
      ats_score: atsScore,
      report: data.message,
    },
  ]);

if (error) {
  console.error("Supabase Error:", error);
}
    setResult(data.message);
      
    } catch (error) {
  console.error(error);
  setResult("Something went wrong.");
} finally {
  setLoading(false);
}
};

  return (
    <section className="min-h-screen bg-gray-100 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-center text-5xl font-extrabold text-transparent">
  📄 AI Resume Analyzer
</h1>

        <p className="mt-4 text-center text-lg text-gray-700">
          Upload your resume and get an ATS score, strengths,
          weaknesses and AI suggestions.
        </p>

        <div className="mt-12 rounded-3xl bg-white p-10 shadow-xl">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-10 transition hover:border-emerald-500 hover:bg-emerald-100">
  <div className="text-6xl">📄</div>

  <h3 className="mt-4 text-2xl font-bold text-gray-800">
    Upload Your Resume
  </h3>

  <p className="mt-2 text-gray-500">
    Drag & Drop your PDF here
  </p>

  <p className="mt-1 text-gray-500">
    or click to browse
  </p>

  <input
    type="file"
    accept=".pdf"
    className="hidden"
    onChange={(e) => setFile(e.target.files?.[0] || null)}
  />
</label>

          {file && (
            <p className="mt-4 font-semibold text-green-600">
              ✅ {file.name}
            </p>
          )}

          <button
            onClick={analyzeResume}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
            >
            {loading ? (
                <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Analyzing Resume...</span>
                </div>
            ) : (
                "🚀 Analyze Resume"
            )}
            </button>

                {result && (
  <div className="mt-8 rounded-2xl bg-white p-8 shadow-xl border">

    <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
        📊 AI Resume Analysis
        </h2>

    {/* ATS Score */}
<div className="mb-8 rounded-xl bg-blue-100 p-6">
  <h3 className="text-xl font-bold text-blue-800">
    📊 ATS Score
  </h3>

  <p className="mt-2 text-gray-600">
    {score >= 75
      ? "Excellent ATS Score ⭐⭐⭐⭐"
      : score >= 50
      ? "Good ATS Score 👍"
      : "Needs Improvement ⚠️"}
  </p>

  <p
    className={`mt-2 text-4xl font-extrabold ${
      score >= 75
        ? "text-green-700"
        : score >= 50
        ? "text-yellow-700"
        : "text-red-700"
    }`}
  >
    {score}/100
  </p>

  <div className="mt-4 h-4 w-full rounded-full bg-blue-200">
    <div
      className={`h-4 rounded-full ${scoreColor} transition-all duration-700`}
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
<div className="mb-6 rounded-xl bg-purple-100 p-6">
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
<button
  onClick={downloadReport}
  disabled={downloading}
  className="mt-8 w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
>
  {downloading ? (
    <div className="flex items-center justify-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      <span>Generating PDF...</span>
    </div>
  ) : (
    "📄 Download ATS Report"
  )}
</button>
  </div>
)}
        </div>
      </div>
    </section>
  );
}