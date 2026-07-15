import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ViewReportPage({
  params,
}: Props) {
  const { id } = await params;

  const { data } = await supabase
    .from("resume_history")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return (
      <div className="p-20 text-center text-2xl">
        Report not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">
          📄 {data.file_name}
        </h1>

        <p className="mt-6 text-2xl font-bold text-emerald-600">
          ATS Score: {data.ats_score}/100
        </p>

        <div className="mt-10 rounded-xl bg-gray-100 p-6 whitespace-pre-wrap">
          {data.report}
        </div>

      </div>
    </section>
  );
}