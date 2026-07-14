"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  
  const [quiz, setQuiz] = useState("");
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const [interview, setInterview] = useState("");
  const [loadingInterview, setLoadingInterview] = useState(false);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/files");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a PDF first.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadSuccess(`${data.filename} uploaded successfully!`);
        setFile(null);
        fetchFiles();
      } else {
        setUploadSuccess("");
        toast.error("Upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          📂 Documents
        </h1>

        <p className="mb-8 text-gray-600">
          Upload your study materials, resumes, or PDFs and let AI analyze them.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Upload Card */}

          <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-white p-8 text-center shadow-sm">

            <div className="mb-4 text-6xl">📤</div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Upload Document
            </h2>

            <p className="mt-2 text-gray-500">
              Select a PDF below.
            </p>

            <label className="mt-6 inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
              📁 Choose PDF

              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setFile(e.target.files[0]);
                    setUploadSuccess("");
                  }
                }}
              />
            </label>

            {file && (
              <div
                className="mt-4 flex items-center rounded-xl border border-green-200 bg-green-50 px-4 py-3 shadow-sm"
                title={file.name}
              >
                <span className="mr-3 text-xl">📄</span>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-800">
                    {file.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <span className="ml-3 text-lg text-green-600">
                  ✅
                </span>
              </div>
            )}

            <button
              onClick={uploadFile}
              disabled={uploading}
              className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              {uploading
                ? "Uploading..."
                : file
                ? "Upload Selected PDF"
                : "Upload PDF"}
            </button>

            {uploadSuccess && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-left shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-green-700">
                      Upload Successful
                    </p>

                    <p
                      className="mt-1 truncate text-sm text-gray-700"
                      title={uploadSuccess}
                    >
                      {uploadSuccess}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Ready for AI Analysis 🤖
                    </p>
                  </div>
                </div>
              </div>
            )}

            {summary && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-green-700">
                  🤖 AI Summary
                </h3>

                <div className="max-h-96 overflow-y-auto whitespace-pre-wrap text-gray-700">
                {summary}
                </div>
              </div>
                )}

              </div>
            {/* Recent Files */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              📄 Recent Files
            </h2>

            <div className="space-y-3">

              {files.length === 0 ? (

                <p className="text-sm text-gray-500">
                  No files uploaded yet.
                </p>

              ) : (

                files.map((fileName) => (

                  <div
                    key={fileName}
                    title={fileName}
                    onClick={() => {
                      setSelectedFile(fileName);
                      setSummary("");
                    }}
                    className={`cursor-pointer rounded-lg border p-4 transition-all ${
                      selectedFile === fileName
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">

                      <p className="truncate font-medium text-gray-900">
                        📄 {fileName}
                      </p>

                      {selectedFile === fileName && (
                        <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                          Selected
                        </span>
                      )}

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>
                    {/* AI Actions */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              🤖 AI Actions
            </h2>

            <div className="space-y-3">

              {/* Summarize */}

              <button
                disabled={loadingSummary}
                onClick={async () => {
                  if (!selectedFile) {
                    toast.error("Please select a PDF first.");
                    return;
                  }

                  try {
                    setLoadingSummary(true);

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

if (data.success) {
  setSummary(data.summary);
  toast.success("Summary generated");
} else {
  toast.error(data.error);
}
} catch (err) {
  console.error(err);
  toast.error("Failed to summarize");
} finally {
  setLoadingSummary(false);
}
}}
className="w-full rounded-lg bg-green-600 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
>
{loadingSummary ? "Generating..." : "📄 Summarize"}
</button>

{/* Ask Question */}

<textarea
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder="Ask anything about this PDF..."
  className="mt-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
  rows={4}
/>

{/* Ask AI */}

<button
  disabled={loadingAnswer}
  onClick={async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF first.");
      return;
    }

    if (!question.trim()) {
      toast.error("Please enter your question.");
      return;
    }

    try {
      setLoadingAnswer(true);

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

      if (data.success) {
        setAnswer(data.answer);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to get answer");
    } finally {
      setLoadingAnswer(false);
    }
  }}
  className="w-full rounded-lg bg-purple-600 py-3 text-white hover:bg-purple-700 disabled:bg-gray-400"
>
  {loadingAnswer ? "Thinking..." : "❓ Ask AI"}
</button>

{answer && (
  <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50 p-4">
    <h3 className="mb-2 text-lg font-bold text-purple-700">
      🤖 AI Answer
    </h3>

    <div className="max-h-96 overflow-y-auto whitespace-pre-wrap text-gray-700">
    {answer}
    </div>
    </div>
)}
{quiz && (
  <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
    <h3 className="mb-2 text-lg font-bold text-orange-700">
      📝 AI Quiz
    </h3>

    <div className="max-h-96 overflow-y-auto whitespace-pre-wrap text-gray-700">
      {quiz}
    </div>
    </div>
)}
{interview && (
  <div className="mt-4 rounded-xl border border-pink-200 bg-pink-50 p-4">
    <h3 className="mb-2 text-lg font-bold text-pink-700">
      🎤 AI Interview Questions
    </h3>

    <div className="max-h-96 overflow-y-auto whitespace-pre-wrap text-gray-700">
    {interview}
    </div>
    </div>
)}
{/* Generate Quiz */}

<button
  disabled={loadingQuiz}
  className="w-full rounded-lg bg-orange-500 py-3 text-white hover:bg-orange-600 disabled:bg-gray-400"
  onClick={async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF first.");
      return;
    }

    try {
      setLoadingQuiz(true);

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

      if (data.success) {
        setQuiz(data.quiz);
        toast.success("Quiz generated!");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate quiz.");
    } finally {
      setLoadingQuiz(false);
    }
  }}
>
  {loadingQuiz ? "Generating..." : "📝 Generate Quiz"}
</button>

{/* Interview Questions */}

<button
  disabled={loadingInterview}
  className="w-full rounded-lg bg-pink-600 py-3 text-white hover:bg-pink-700 disabled:bg-gray-400"
  onClick={async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF first.");
      return;
    }

    try {
      setLoadingInterview(true);

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

      if (data.success) {
        setInterview(data.interview);
        toast.success("Interview questions generated!");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate interview questions.");
    } finally {
      setLoadingInterview(false);
    }
  }}
>
  {loadingInterview ? "Generating..." : "🎤 Interview Questions"}
</button>

</div>

</div>

</div>

</div>

</div>

);
}