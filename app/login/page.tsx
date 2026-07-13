"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("daryl.homecillo@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!auth) {
      setChecking(false);
      setError("Firebase not configured. Add NEXT_PUBLIC_FIREBASE_* env vars.");
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/profile");
      } else {
        setChecking(false);
      }
    });
    return unsub;
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch {
      setError("Invalid credentials. Check email and password.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-[13px] text-on-surface-variant animate-pulse">
          Checking session…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-on-surface mb-1">
            Admin Login
          </h1>
          <p className="text-[13px] text-on-surface-variant">
            Sign in to manage portfolio content
          </p>
        </div>

        {/* Login card */}
        <div className="brutal-panel p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container border-2 border-black p-3 text-on-surface font-body text-sm outline-none transition-shadow"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-surface-container border-2 border-black p-3 text-on-surface font-body text-sm outline-none placeholder:text-on-surface-variant/40 transition-shadow"
              />
            </div>

            {error && (
              <div className="text-[12px] text-on-error bg-error border-2 border-black p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="brutal-press w-full bg-primary text-on-primary py-3 border-2 border-black shadow-brutal-sm text-[13px] font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Signing in… <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span></>
              ) : (
                <>Sign In <span className="material-symbols-outlined text-[18px]">login</span></>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-[13px] font-medium text-on-surface-variant hover:text-primary transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
