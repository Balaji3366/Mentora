"use client";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  uploading: boolean;
  uploadSuccess: string;
  uploadFile: () => void;
};

const cleanFileName = (name: string) => {
  return name
    .replace(/^\d+-/, "")
    .replace(" uploaded successfully!", "");
};

export default function UploadCard({
  file,
  setFile,
  uploading,
  uploadSuccess,
  uploadFile,
}: Props) {
  return (
    <div className="lg:col-span-4 mn-h-[430px] rounded-3xl border border-slate-200 bg-white p-6 shadow-lg flex flex-col">
      <div className="mb-5 text-5xl">📤</div>

      <h2 className="text-2xl font-bold text-slate-800">
        Upload Document
      </h2>

      <p className="mt-2 text-slate-500">
        Upload your PDF to start AI analysis.
      </p>

      <label className="mt-6 flex cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
        📁 Choose PDF

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </label>

      {file && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="truncate font-semibold text-slate-800">
            📄 {file.name}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
      )}

      <button
        onClick={uploadFile}
        disabled={uploading}
        className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "🚀 Upload & Analyze"}
      </button>

      {uploadSuccess && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <h3 className="font-bold text-green-700">
            ✅ Successfully Uploaded
          </h3>

          <p className="mt-3 break-words font-medium text-slate-800">
        📄 {cleanFileName(uploadSuccess)}
        </p>

        <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <span>🚀</span>
        <span>Ready for AI Analysis</span>
        </p>
        </div>
      )}
    </div>
  );
}