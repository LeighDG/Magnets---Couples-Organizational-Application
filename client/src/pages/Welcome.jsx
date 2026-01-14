import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundLayout from "../components/BackgroundLayout";
import logoImage from "../assets/magnetic-logo.png";

import {
  FaLinkedinIn,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <BackgroundLayout>
      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-10">
        <div className="flex w-full max-w-4xl items-center justify-between">
          {/* Logo section */}
          <div className="flex flex-col items-start">
            <img
              src={logoImage}
              alt="Magnetic logo"
              className="w-80 h-auto object-contain"
            />
          </div>

          {/* Buttons */}
          <div className="mt-10 w-full max-w-xs space-y-4 flex flex-col items-center">
            <button 
            onClick={() => navigate("/signup")}
            className="w-full rounded-xl bg-white py-3 text-sm font-medium text-neutral-900 shadow-md transition hover:bg-neutral-100">
              Get Started
            </button>
            <button 
            onClick={() => navigate("/login")}
            className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white shadow-md transition hover:bg-neutral-800">
              Login
            </button>

            <div className="mt-4 flex gap-6 text-neutral-800">
            <FaLinkedinIn className="h-4 w-4 cursor-pointer hover:opacity-70 transition" />
            <FaFacebookF className="h-4 w-4 cursor-pointer hover:opacity-70 transition" />
            <FaXTwitter className="h-4 w-4 cursor-pointer hover:opacity-70 transition" />
            <FaInstagram className="h-4 w-4 cursor-pointer hover:opacity-70 transition" />
          </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}
