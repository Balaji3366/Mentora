"use client";

import toast from "react-hot-toast";

interface AIActionsProps {
  selectedFile: string;

  summary: string;
  setSummary: (value: string) => void;
  loadingSummary: boolean;
  setLoadingSummary: (value: boolean) => void;

  question: string;
  setQuestion: (value: string) => void;
  answer: string;
  setAnswer: (value: string) => void;
  loadingAnswer: boolean;
  setLoadingAnswer: (value: boolean) => void;

  quiz: string;
  setQuiz: (value: string) => void;
  loadingQuiz: boolean;
  setLoadingQuiz: (value: boolean) => void;

  interview: string;
  setInterview: (value: string) => void;
  loadingInterview: boolean;
  setLoadingInterview: (value: boolean) => void;
}

export default function AIActions({
  selectedFile,

  setSummary,
  loadingSummary,
  setLoadingSummary,

  question,
  setQuestion,
  setAnswer,
  loadingAnswer,
  setLoadingAnswer,

  setQuiz,
  loadingQuiz,
  setLoadingQuiz,

  setInterview,
  loadingInterview,
  setLoadingInterview,
}: AIActionsProps) {
  const checkFile = () => {
    if (!selectedFile) {
      toast.error("Please select a document first.");
      return false;
    }
    return true;
  };

  const summarizeDocument = async () => {
    if (!checkFile()) return;
    setSummary("");
    setAnswer("");
    setQuiz("");
    setInterview("");
    setLoadingSummary(true);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: selectedFile,
        }),
      });

      const data = await res.json();
      console.log("API DATA:", data);
      console.log(data);
      setSummary(data.summary || "No summary generated.");
    } catch {
      toast.error("Failed to summarize document.");
    }

    setLoadingSummary(false);
  };

  const askQuestion = async () => {
    if (!checkFile()) return;

    if (!question.trim()) {
      toast.error("Enter a question.");
      return;
    }
    setSummary("");
    setAnswer("");
    setQuiz("");
    setInterview("");
    setLoadingAnswer(true);

    try {
      const res = await fetch("/api/pdf-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: selectedFile,
          question,
        }),
      });

      const data = await res.json();

      setAnswer(data.answer || "No answer found.");
    } catch {
      toast.error("Failed to get AI answer.");
    }

    setLoadingAnswer(false);
  };

  const generateQuiz = async () => {
    if (!checkFile()) return;
    setSummary("");
    setAnswer("");
    setQuiz("");
    setInterview("");
    setLoadingQuiz(true);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: selectedFile,
        }),
      });

      const data = await res.json();

      setQuiz(data.quiz || "Quiz not generated.");
    } catch {
      toast.error("Quiz generation failed.");
    }

    setLoadingQuiz(false);
  };

  const generateInterview = async () => {
    if (!checkFile()) return;
    setSummary("");
    setAnswer("");
    setQuiz("");
    setInterview("");
    setLoadingInterview(true);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: selectedFile,
        }),
      });

      const data = await res.json();

      setInterview(data.interview || "Interview questions not generated.");
    } catch {
      toast.error("Failed to generate interview questions.");
    }

    setLoadingInterview(false);
  };

  return (
    <div className="lg:col-span-4 h-[430px] rounded-3xl border border-slate-200 bg-white p-6 shadow-lg flex flex-col">
      <h2 className="mb-5 text-2xl font-bold text-gray-900">
    🤖 AI Actions
        </h2>

      <button
        onClick={summarizeDocument}
        disabled={loadingSummary}
        className="mb-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
      >
        {loadingSummary ? "⏳ Thinking..." : "📄 Summarize Document"}
      </button>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask Mentora AI anything about this document..."
        rows={4}
        className="mb-4 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />

      <button
        onClick={askQuestion}
  disabled={loadingAnswer}
  className="mb-4 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-gray-400"
>
  {loadingAnswer ? "⏳ Thinking..." : "❓ Ask AI"}
      </button>

      <button
        onClick={generateQuiz}
        disabled={loadingQuiz}
        className="mb-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
      >
        {loadingQuiz ? "⏳ Thinking..." : "📝 Generate Quiz"}
      </button>

      <button
        onClick={generateInterview}
        disabled={loadingInterview}
        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
      >
        {loadingInterview ? "⏳ Thinking..." : "💼 Interview Questions"}
      </button>
    </div>
  );
}