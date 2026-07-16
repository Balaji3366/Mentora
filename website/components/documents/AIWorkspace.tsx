"use client";

import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

interface AIWorkspaceProps {
  summary: string;
  answer: string;
  quiz: string;
  interview: string;

  loadingSummary: boolean;
  loadingAnswer: boolean;
  loadingQuiz: boolean;
  loadingInterview: boolean;
}

const copyText = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toast.success("Copied!");
};

export default function AIWorkspace({
  summary,
  answer,
  quiz,
  interview,
  loadingSummary,
  loadingAnswer,
  loadingQuiz,
  loadingInterview,
}: AIWorkspaceProps) {
  return (
    <>
      {(loadingSummary ||
        loadingAnswer ||
        loadingQuiz ||
        loadingInterview) && (
        <div className="animate-in fade-in duration-500 mb-6 animate-pulse rounded-2xl border border-cyan-200 bg-cyan-50 p-8 text-center">
          <div className="mb-4 text-5xl">🤖</div>

          <h3 className="text-2xl font-bold text-cyan-700">
            Mentora AI is analyzing your document...
          </h3>

          <p className="mt-3 text-gray-600">
            {loadingSummary &&
              "Analyzing your document and preparing summary..."}
            {loadingAnswer &&
              "Reading your PDF and finding the answer..."}
            {loadingQuiz &&
              "Generating quiz questions..."}
            {loadingInterview &&
              "Preparing interview questions..."}
          </p>
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
        ✨ AI Insights
        </h2>

        {!summary && !answer && !quiz && !interview && (
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center text-gray-500">
            <p className="text-lg font-medium">
              ✨ Your AI insights will appear here.
            </p>

            <p className="mt-2 text-sm">
              Select a document and choose an AI action to begin.
            </p>
          </div>
        )}

        {/* Summary */}

        {summary && (
          <div className="animate-in fade-in duration-500 mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-blue-700">
                📄 Summary
              </h3>

              <button
                onClick={() => copyText(summary)}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
              >
                📋 Copy
              </button>
            </div>

            <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-orange-700">
            <ReactMarkdown>
                {summary}
            </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Answer */}

        {answer && (
          <div className="animate-in fade-in duration-500 mb-6 rounded-2xl border border-green-200 bg-green-50 p-8 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-green-700">
                ❓ AI Answer
              </h3>

              <button
                onClick={() => copyText(answer)}
                className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
              >
                📋 Copy
              </button>
            </div>

            <div className="whitespace-pre-wrap rounded-xl bg-white p-5 text-[16px] leading-8 text-gray-900">
              {answer}
            </div>
          </div>
        )}

        {/* Quiz */}

        {quiz && (
  <div className="animate-in fade-in duration-500 mb-6 rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-xl font-bold text-purple-700">
        📚 Quiz
      </h3>

      <button
        onClick={() => copyText(quiz)}
        className="rounded-lg bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
      >
        📋 Copy
      </button>
    </div>

    <div className="whitespace-pre-wrap rounded-xl bg-white p-5 text-base leading-8 text-black">
  <ReactMarkdown
    components={{
      p: ({ children }) => (
        <p className="text-black mb-4">{children}</p>
      ),
      h1: ({ children }) => (
        <h1 className="text-2xl font-bold text-black mb-4">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl font-bold text-black mb-3">{children}</h2>
      ),
      li: ({ children }) => (
        <li className="text-black">{children}</li>
      ),
      strong: ({ children }) => (
        <strong className="text-black">{children}</strong>
      ),
    }}
  >
    {quiz}
  </ReactMarkdown>
</div>
  </div>
)}

        {/* Interview */}

        {interview && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-orange-700">
                💼 Interview Questions
              </h3>

              <button
                onClick={() => copyText(interview)}
                className="rounded-lg bg-orange-600 px-3 py-2 text-sm text-white hover:bg-orange-700"
              >
                📋 Copy
              </button>
            </div>

            <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-orange-700">
            <ReactMarkdown>
                {interview}
            </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}