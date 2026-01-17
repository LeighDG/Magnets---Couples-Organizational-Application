import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import BackgroundLayout from "../components/BackgroundLayout";


export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundLayout>
      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex w-full max-w-md flex-col items-center text-center text-white">
          {/* Headings */}
          <div className="mb-20 space-y-2">
            <h1 className="text-5xl font-light tracking-[0.3em]">
                WELCOME&nbsp;BACK
            </h1>
            <p className="text-xs tracking-widest opacity-80">
                LOGIN TO YOUR ACCOUNT
            </p>
          </div>
          
          <div className="w-full">
          {/* Error */}
          {error && (
            <p className="mb-4 rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          )}

          {/* Form */}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-white px-4 py-3 text-center text-sm text-neutral-900 placeholder-neutral-500 outline-none"
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-white px-4 py-3 text-center text-sm text-neutral-900 placeholder-neutral-500 outline-none"
            />

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white shadow-md hover:bg-neutral-800 transition"
            >
              LOGIN
            </button>
          </form>
            </div>

          {/* Footer */}
          <div className="mt-20 text-xs tracking-widest opacity-80">
            <p>DON'T HAVE AN ACCOUNT?</p>
            <button 
            onClick={() => navigate("/signup")}
            className="mt-2 underline hover:opacity-70 transition">
              SIGNUP
            </button>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}
