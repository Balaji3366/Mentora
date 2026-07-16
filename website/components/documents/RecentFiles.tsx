"use client";

type Props = {
  files: string[];
  selectedFile: string;
  setSelectedFile: (file: string) => void;
  setSummary: (summary: string) => void;
};
const cleanFileName = (name: string) => {
  return name.replace(/^\d+-/, "");
};
export default function RecentFiles({
  files,
  selectedFile,
  setSelectedFile,
  setSummary,
}: Props) {
  return (
    <div className="lg:col-span-3 h-[430px] rounded-3xl border border-slate-200 bg-white p-6 shadow-lg flex flex-col">
      <h2 className="mb-5 flex items-center justify-between text-2xl font-bold text-slate-800">
            <span>📄 Recent Files</span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                {files.length}
            </span>
            </h2>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {files.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
            No documents uploaded yet.
          </div>
        ) : (
          files.map((fileName) => (
            <button
              key={fileName}
              onClick={() => {
                setSelectedFile(fileName);
                setSummary("");
              }}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selectedFile === fileName
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="truncate font-medium text-slate-700">
                    {cleanFileName(fileName)}
                    </p>

                {selectedFile === fileName && (
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Active
                </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}