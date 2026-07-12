export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Mentor",
      description: "Get personalized AI guidance anytime, anywhere.",
    },
    {
      icon: "📚",
      title: "Smart Roadmaps",
      description: "Follow structured learning paths for your dream career.",
    },
    {
      icon: "🎤",
      title: "Mock Interviews",
      description: "Practice interviews with instant AI feedback.",
    },
    {
      icon: "📄",
      title: "Resume Builder",
      description: "Build ATS-friendly resumes in minutes.",
    },
    {
      icon: "💼",
      title: "Job Tracker",
      description: "Track all your job applications in one place.",
    },
    {
      icon: "📈",
      title: "Skill Analytics",
      description: "Measure your progress and improve continuously.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-5xl font-bold text-gray-900">
          Everything You Need
        </h2>

        <p className="mt-5 text-center text-xl text-gray-600">
          Learn, prepare, and grow — all in one platform.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}