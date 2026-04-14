"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { AuthRightPanel } from "@/components/common/AuthRightPanel";
import api from "@/lib/api";

// dividerVector replaced with CSS border below

export default function LoginPage() {
  const router = useRouter();
  // OTP State
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError("");

    try {
      setIsSubmitting(true);

      await api.post("/users/request-otp", {
        email,
      });

      // On success, navigate to OTP page with email in query params
      router.push(`/login/otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Failed to send OTP. Please check your email and try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="h-full flex bg-[#fcfcfc] overflow-hidden">
      {/* Left Panel - Purple Background */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 lg:px-8 xl:px-16 overflow-y-auto">
        <div className="w-full max-w-[399px]">
          {/* Welcome Section */}
          <div className="mb-5 text-center lg:text-left">
            <h1 className="font-poppins font-medium text-[36px] leading-[40px] text-[#162447] tracking-[-0.72px] mb-2">
              Welcome Back
            </h1>
            <p className="font-poppins text-[14px] leading-[18px] text-[#767e92]">
              Please login to continue to your account.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleOtpSubmit} className="space-y-3">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] px-3 py-2.5 font-poppins text-[14px] leading-[18px] text-[#162447] placeholder:text-[#767e92] focus:outline-none focus:ring-2 focus:ring-[#513392]/20 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                }}
                required
                disabled={isSubmitting}
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-2px_1px_0px_rgba(0,0,0,0.03)] rounded-[10px]" />
            </div>

            {error && (
              <p className="mt-1 font-poppins text-[14px] leading-[18px] text-[#ff2e2c]">
                {error}
              </p>
            )}

            {/* Request OTP Button */}
            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full h-[48px] bg-[#513392] hover:bg-[#513392] border border-[#dbcdfb] font-poppins text-[14px] leading-[18px] text-white relative overflow-hidden shadow-[0px_6px_4px_0px_rgba(81,51,146,0.08)] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ borderRadius: "10px" }}
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? "Requesting OTP..." : "Request OTP"}
                </span>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-4px_2px_0px_#5c3ba4]" />
              </Button>
            </div>
          </form>

          {/* Divider and Footer Section */}
          <div className="space-y-3 mt-6">
            {/* Divider */}
            <div className="flex items-center gap-[10px]">
              <div className="flex-1 h-px bg-[#e6e8e7]" />
              <p className="font-poppins text-[14px] leading-[18px] text-[#767e92] whitespace-nowrap">
                or
              </p>
              <div className="flex-1 h-px bg-[#e6e8e7]" />
            </div>

            {/* Clarix Sign In Section */}
            <div className="space-y-3 text-center max-w-[319px] mx-auto">
              <p className="font-poppins text-[18px] leading-[24px] text-[#162447] tracking-[-0.36px]">
                Clarix sign in
              </p>
              <div className="flex items-center justify-center gap-3 font-poppins text-[14px] leading-[18px] whitespace-nowrap">
                <p className="text-[#767e92]">Not registered yet?</p>
                <Link
                  href="/sign-in"
                  className="text-[#0080ff] hover:underline cursor-pointer"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthRightPanel />
    </div>
  );
}
