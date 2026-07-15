"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Resume = {
  id: string;
  file_name: string;
  ats_score: number;
  report: string;
  created_at: string;
};

export default function ResumeHistoryPage() {
  const [reports, setReports] = useState<Resume[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    const { data, error } = await supabase
      .from("resume_history")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("========== Resume History ==========");
    console.log("Data:", data);
    console.log("Error:", error);
    console.log("===================================");

    if (error) {
      console.error(error);
      return;
    }

    setReports(data ?? []);
  }

  async function deleteReport(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("resume_history")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete report.");
      return;
    }

    fetchReports();
  }

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
          {reports.length === 0 ? (
            <div className="col-span-full rounded-2xl bg-white p-10 text-center shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">
                📂 No Resume Reports Yet
              </h2>

              <p className="mt-3 text-gray-500">
                Analyze your first resume to see it here.
              </p>

              <Link
                href="/resume"
                className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                🚀 Analyze Resume
              </Link>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="flex min-h-[340px] flex-col justify-between rounded-2xl border bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <h2 className="mb-3 break-words text-center text-lg font-bold text-gray-900">
                  📄 {report.file_name}
                </h2>

                <p className="mt-4 text-center text-gray-500">
                  ATS Score
                </p>

                <p
                  className={`mt-2 text-center text-4xl font-extrabold ${
                    report.ats_score >= 75
                      ? "text-green-700"
                      : report.ats_score >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {report.ats_score}/100
                </p>

                <p className="mt-3 text-center text-sm text-gray-500">
                  📅 {new Date(report.created_at).toLocaleDateString()}
                </p>

                <Link
                  href={`/resume-history/${report.id}`}
                  className="mt-4 block w-full rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                >
                  👀 View Report
                </Link>

                <button
                  onClick={() => deleteReport(report.id)}
                  className="mt-3 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  🗑 Delete Report
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}