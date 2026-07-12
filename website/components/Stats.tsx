export default function Stats() {
  const stats = [
    {
      value: "50K+",
      label: "Active Learners",
    },
    {
      value: "500+",
      label: "Partner Companies",
    },
    {
      value: "1M+",
      label: "Questions Solved",
    },
    {
      value: "95%",
      label: "Success Rate",
    },
  ];

  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold">
          Trusted by Learners Worldwide
        </h2>

        <p className="mt-4 text-center text-blue-100">
          Thousands of students and professionals trust Mentora.
        </p>

        <div className="mt-16 grid gap-8 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h3 className="text-5xl font-extrabold">
                {stat.value}
              </h3>

              <p className="mt-3 text-lg text-blue-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}