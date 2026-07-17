export default function Plans() {
  return (
    <section
      id="plans"
      className="bg-slate-950 px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-5xl font-bold">
          Simple <span className="text-cyan-400">Pricing</span>
        </h2>

        <p className="mt-4 text-lg text-slate-400">
          Start free. Upgrade whenever you're ready.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
            <h3 className="text-3xl font-bold">Free</h3>

            <p className="mt-3 text-5xl font-extrabold">
              ₹0
            </p>

            <p className="mt-2 text-slate-400">
              Forever Free
            </p>

            <ul className="mt-8 space-y-4 text-left text-slate-300">
              <li>✅ AI PDF Summary</li>
              <li>✅ Ask AI</li>
              <li>✅ Quiz Generator</li>
              <li>✅ Interview Questions</li>
              <li>✅ ATS Resume Analyzer</li>
            </ul>

            <button className="mt-10 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-3xl border-2 border-cyan-500 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-4 py-1 text-sm font-bold text-black">
              Coming Soon
            </div>

            <h3 className="text-3xl font-bold">Pro</h3>

            <p className="mt-3 text-5xl font-extrabold">
              ₹199
              <span className="text-xl text-slate-400">/month</span>
            </p>

            <ul className="mt-8 space-y-4 text-left text-slate-300">
              <li>🚀 Unlimited AI Requests</li>
              <li>🚀 Resume Generator</li>
              <li>🚀 Cover Letter Generator</li>
              <li>🚀 LinkedIn Optimizer</li>
              <li>🚀 Priority AI Speed</li>
              <li>🚀 Premium Resume Templates</li>
            </ul>

            <button
              disabled
              className="mt-10 w-full cursor-not-allowed rounded-xl bg-slate-700 py-3 font-semibold"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}