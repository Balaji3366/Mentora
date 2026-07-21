import LoginLogo from "./LoginLogo";
import FeatureCard from "./FeatureCard";

export default function LoginFeatures() {
  return (
    <div className="flex max-w-xl flex-col justify-center">
      <LoginLogo />

      <p className="mt-8 text-lg leading-8 text-slate-600">
        Learn smarter, build ATS-ready resumes, analyze your resume score, and
        chat with AI—all in one powerful platform.
        </p>

      <div className="mt-10 space-y-5">
        <FeatureCard
          icon="📄"
          title="AI Document Intelligence"
          description="Upload PDFs and instantly generate summaries, explanations, and key insights."
        />

        <FeatureCard
          icon="📊"
          title="ATS Resume Analyzer"
          description="Analyze your resume, get ATS score, keyword suggestions, and improvement tips."
        />

        <FeatureCard
          icon="💬"
          title="AI Study Assistant"
          description="Chat naturally with your documents and receive context-aware answers instantly."
        />

    
      </div>
    </div>
  );
}