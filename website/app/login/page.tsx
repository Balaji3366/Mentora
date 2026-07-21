import LoginFeatures from "@/components/auth/LoginFeature";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-100">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-start justify-between gap-20 px-6 pt-24 pb-12">
        {/* Left Section */}
        <div className="hidden flex-1 lg:block">
          <LoginFeatures />
        </div>

        {/* Right Section */}
        <div className="flex flex-1 justify-center pt-10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}