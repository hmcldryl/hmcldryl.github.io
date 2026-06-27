"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function NexusLogin() {
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
        <div className="font-mono text-[12px] text-on-surface-variant animate-pulse">
          CHECKING AUTH...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block py-1 px-3 border border-primary/30 rounded-full font-mono text-[11px] text-primary bg-primary/5 tracking-[0.05em] mb-6">
            [ RESTRICTED ACCESS ]
          </div>
          <h1 className="font-display text-4xl font-bold text-primary mb-2">
            NEXUS // CMS
          </h1>
          <p className="font-mono text-[12px] text-on-surface-variant">
            Portfolio management terminal
          </p>
        </div>

        {/* Login card */}
        <div className="glass-panel rounded-2xl p-8 border border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-primary block">
                Admin.Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 text-on-surface font-mono text-sm focus:border-primary focus:shadow-[0_0_0_1px_#cfbcff] transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-primary block">
                Auth.Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 text-on-surface font-mono text-sm focus:border-primary focus:shadow-[0_0_0_1px_#cfbcff] transition-all outline-none placeholder:text-on-surface-variant/40"
              />
            </div>

            {error && (
              <div className="font-mono text-[11px] text-error bg-error-container/20 border border-error/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 rounded-lg font-mono text-[11px] tracking-[0.1em] font-bold uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>AUTHENTICATING... <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span></>
              ) : (
                <>INITIALIZE_SESSION <span className="material-symbols-outlined text-[18px]">login</span></>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="font-mono text-[11px] text-on-surface-variant hover:text-primary transition-colors">
            ← RETURN_TO_NEXUS
          </Link>
        </div>
      </div>
    </div>
  );
}
