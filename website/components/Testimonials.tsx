export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul",
      role: "Software Engineer",
      review:
        "Mentora completely changed the way I prepared for interviews. Highly recommended!",
    },
    {
      name: "Sneha",
      role: "QA Engineer",
      review:
        "The AI Mentor gave me a clear roadmap and helped me land my dream job.",
    },
    {
      name: "Kiran",
      role: "Student",
      review:
        "Learning became fun and structured. I finally know what to study next.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-bold text-gray-900">
          What Our Learners Say
        </h2>

        <p className="mt-4 text-center text-gray-500 text-lg">
          Real stories from students and professionals who trust Mentora.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {reviews.map((review) => (

            <div
              key={review.name}
              className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="text-2xl text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mt-6 min-h-[130px] text-lg leading-8 text-gray-600 italic">
                "{review.review}"
              </p>

              <div className="mt-10 flex items-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {review.name.charAt(0)}
                </div>

                <div className="ml-4">

                  <h3 className="text-lg font-bold text-gray-900">
                    {review.name}
                  </h3>

                  <p className="text-gray-500">
                    {review.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}