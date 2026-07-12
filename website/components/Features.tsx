const features = [
  {
    icon: "🤖",
    title: "AI Mentor",
    desc: "24/7 personalized AI guidance for your learning journey.",
  },
  {
    icon: "🛣️",
    title: "Learning Roadmaps",
    desc: "Step-by-step paths to master any technology or career.",
  },
  {
    icon: "🎯",
    title: "Mock Interviews",
    desc: "Practice technical and HR interviews with instant feedback.",
  },
  {
    icon: "📄",
    title: "Resume Builder",
    desc: "Create ATS-friendly resumes in minutes.",
  },
  {
    icon: "💼",
    title: "Job Tracker",
    desc: "Track every application from one dashboard.",
  },
  {
    icon: "📈",
    title: "Skill Analytics",
    desc: "Visualize your growth and identify improvement areas.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Everything You Need
          </h2>

          <p className="mt-5 text-xl text-gray-600">
            One platform to learn, prepare and grow.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {feature.desc}
              </p>

              <button className="mt-8 font-semibold text-blue-600 hover:underline">
                Learn More →
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}