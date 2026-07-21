"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Eye } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import GoogleButton from "./GoogleButton";

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Account created successfully! Please check your email to verify your account."
    );

    router.push("/login");
  }

  return (
    <div className="w-full max-w-lg rounded-[32px] border border-white/70 bg-white/95 p-10 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Create Your Account ✨
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-500">
          Join Mentora and start learning with AI.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>

          <div className="flex h-16 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5">
            <User size={22} className="text-slate-400" />

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <div className="flex h-16 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5">
            <Mail size={22} className="text-slate-400" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <div className="flex h-16 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5">
            <Lock size={22} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 outline-none"
            />

            <Eye
              size={20}
              className="cursor-pointer text-slate-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>

          <div className="flex h-16 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5">
            <Lock size={22} className="text-slate-400" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-sm text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <GoogleButton />

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-violet-600 hover:text-violet-700"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}