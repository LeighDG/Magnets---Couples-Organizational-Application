import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundLayout from "../components/BackgroundLayout";


export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <BackgroundLayout>
      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex w-full max-w-md flex-col items-center text-center text-white">
          {/* Headings */}
          <div className="mb-20 space-y-2">
            <h1 className="text-5xl font-light tracking-[0.3em]">
                JOIN&nbsp;US
            </h1>
            <p className="text-xs tracking-widest opacity-80">
                CREATE YOUR ACCOUNT
            </p>
          </div>
          
          <div className="w-full">
          {/* Form */}
          <form className="w-full space-y-4">
            <input
              type="text"
              placeholder="FIRST NAME"
              className="w-full rounded-lg bg-white px-4 py-3 text-center text-sm text-neutral-900 placeholder-neutral-500 outline-none"
            />
            <input
              type="text"
              placeholder="LAST NAME"
              className="w-full rounded-lg bg-white px-4 py-3 text-center text-sm text-neutral-900 placeholder-neutral-500 outline-none"
            />
            <input
              type="email"
              placeholder="EMAIL"
              className="w-full rounded-lg bg-white px-4 py-3 text-center text-sm text-neutral-900 placeholder-neutral-500 outline-none"
            />
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full rounded-lg bg-white px-4 py-3 text-center text-sm text-neutral-900 placeholder-neutral-500 outline-none"
            />

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white shadow-md hover:bg-neutral-800 transition"
            >
              SIGNUP
            </button>
          </form>
            </div>

          {/* Footer */}
          <div className="mt-20 text-xs tracking-widest opacity-80">
            <p>ALREADY HAVE AN ACCOUNT?</p>
            <button 
            onClick={() => navigate("/login")}
            className="mt-2 underline hover:opacity-70 transition">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}
