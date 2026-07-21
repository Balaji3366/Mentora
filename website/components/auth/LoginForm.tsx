"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import GoogleButton from "./GoogleButton";


  export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  
  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please enter your email and password.");
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Login successful!");

  router.push("/dashboard");
}
  return (
    <div className="w-full max-w-lg rounded-[32px] border border-white/70 bg-white/95 p-10 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Welcome Back 👋
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-500">
          Sign in to continue your AI learning journey.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <div className="flex h-16 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 transition-all duration-300 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100">
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

          <div className="flex h-16 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 transition-all duration-300 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100">
            <Lock size={22} className="text-slate-400" />

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 outline-none"
                />

            <Eye
              size={20}
              className="cursor-pointer text-slate-400 hover:text-violet-600"
            />
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            href="#"
            className="font-medium text-violet-600 hover:text-violet-700"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(124,58,237,0.35)] active:scale-[0.98]"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-sm text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <GoogleButton />

        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-violet-600 hover:text-violet-700"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
