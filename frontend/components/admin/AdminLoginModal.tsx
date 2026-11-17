"use client";
import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useAdmin } from "@/context/AdminContext";
import { getLoginRateLimitStatus } from "@/lib/cms/api";

export default function AdminLoginModal() {
  const { login, token, adminUser, isCheckingSession } = useAdmin();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [blockedUntil, setBlockedUntil] = useState<string | null>(null);

  // Check initial rate-limit / IP block status on mount
  useEffect(() => {
    let isMounted = true;
    getLoginRateLimitStatus()
      .then((status) => {
        if (!isMounted || !status) return;
        if (status.isBlocked) {
          setIsBlocked(true);
          setBlockedUntil(status.blockedUntil);
          const timeStr = status.blockedUntil
            ? new Date(status.blockedUntil).toLocaleString()
            : "1 day";
          setError(
            `Your device IP has been blocked for 1 day due to 10 failed login attempts. Please try again after ${timeStr}.`
          );
        } else if (status.attemptsLeft < 10) {
          setAttemptsLeft(status.attemptsLeft);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // If already authenticated, do not show login modal
  if (token && adminUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBlocked) return;
    setError(null);
    setIsLoading(true);

    try {
      await login(password);
    } catch (err: any) {
      const msg = err.message || "Invalid password. Please try again.";
      setError(msg);

      if (err.attemptsLeft !== undefined) {
        setAttemptsLeft(err.attemptsLeft);
      }
      if (err.isBlocked) {
        setIsBlocked(true);
        setBlockedUntil(err.blockedUntil || null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-ui fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface border border-surface-variant rounded-2xl shadow-2xl overflow-hidden p-8 relative animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-display-lg text-primary tracking-widest font-bold mb-2">
            TANORA
          </h1>
          <p className="text-sm uppercase tracking-[0.2em] text-[#dcae5d] font-bold">
            Content Management System
          </p>
        </div>

        {error && (
          <div
            className={`mb-5 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
              isBlocked
                ? "bg-red-50 border-red-300 text-red-800"
                : "bg-amber-50 border-amber-300 text-amber-900"
            }`}
          >
            <MaterialIcon
              name={isBlocked ? "block" : "warning"}
              className={`text-lg flex-shrink-0 mt-0.5 ${
                isBlocked ? "text-red-600" : "text-amber-600"
              }`}
            />
            <div className="flex-1 space-y-1">
              <span className="font-semibold block leading-relaxed">{error}</span>
              {isBlocked && blockedUntil && (
                <span className="text-[11px] opacity-90 block">
                  Lockout expires: {new Date(blockedUntil).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Security Warning Badge if attempts are running low */}
        {!isBlocked && attemptsLeft !== null && attemptsLeft > 0 && attemptsLeft < 10 && !error && (
          <div className="mb-4 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs flex items-center gap-2">
            <MaterialIcon name="shield" className="text-base text-amber-600 flex-shrink-0" />
            <span>
              Security notice: <strong>{attemptsLeft} attempts left</strong> before a 1-day IP block.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-password"
              className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isBlocked}
                placeholder={isBlocked ? "Device temporarily blocked" : ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full text-base pl-11 pr-11 py-3 rounded-xl border border-surface-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${
                  isBlocked ? "opacity-50 cursor-not-allowed bg-surface-container" : ""
                }`}
              />
              <MaterialIcon
                name={isBlocked ? "lock_clock" : "lock"}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${
                  isBlocked ? "text-red-500" : "text-on-surface-variant"
                }`}
              />
              <button
                type="button"
                disabled={isBlocked}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MaterialIcon
                  name={showPassword ? "visibility_off" : "visibility"}
                  className="text-xl"
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isBlocked}
            className={`w-full mt-2 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isBlocked
                ? "bg-neutral-800 text-neutral-400 cursor-not-allowed border border-neutral-700"
                : "bg-primary hover:bg-primary/95 text-white hover:shadow-lg cursor-pointer disabled:opacity-50"
            }`}
          >
            {isBlocked ? (
              <>
                <MaterialIcon name="block" className="text-base text-red-400" />
                <span>Device Blocked (1 Day)</span>
              </>
            ) : isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <MaterialIcon name="login" className="text-base" />
                <span>Sign In to Admin</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
