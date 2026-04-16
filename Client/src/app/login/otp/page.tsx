"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/common/Button";
import { AuthRightPanel } from "@/components/common/AuthRightPanel";
import api from "@/lib/api";
import { Mail } from "lucide-react";
import Loader from "@/components/common/Loader";
import { useDispatch } from "react-redux";
import { login } from "@/global/redux/slices/authSlice";

// dividerVector replaced with CSS border

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30); // 30 seconds timer
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch();

  // If email is missing (user navigated here directly), send them back to login
  useEffect(() => {
    if (!email) {
      router.replace("/login");
    }
  }, [email, router]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const newOtp = [...otp];
    for (let i = 0; i < 4; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);
    // Focus the last filled input or the last input
    const lastFilledIndex = Math.min(pastedData.length - 1, 3);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleResend = async () => {
    if (!canResend || !email || isSubmitting) return;

    setError("");

    try {
      setIsSubmitting(true);

      await api.post("/users/request-otp", { email });

      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", ""]);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Failed to resend OTP. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setError("Please enter the complete 4-digit OTP.");
      return;
    }

    if (!email) {
      setError("Missing email. Please go back and request a new OTP.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await api.post("/users/verify-otp", {
        email,
        otp: otpValue,
      });

      // Dispatch login with user data
      dispatch(login({ user: response.data.data }));

      // Set item to keep user logged in across reloads, optionally
      localStorage.setItem("ClientToken", "true");

      // OTP verified successfully - redirect to main app page
      router.push("/");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Invalid or expired OTP. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex bg-[#fcfcfc] overflow-hidden">
      {/* Left Panel - White Background */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 lg:px-8 xl:px-16 overflow-y-auto">
        <div className="w-full max-w-[399px]">
          {/* Welcome Section */}
          <div className="mb-5 text-center lg:text-left">
            <h1 className="font-poppins font-medium text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] text-[#162447] tracking-[-0.48px] lg:tracking-[-0.72px] mb-2">
              Welcome Back
            </h1>
            <p className="font-poppins text-[14px] leading-[18px] text-[#767e92]">
              Please login to continue to your account.
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Input (Disabled) */}
            <div className="space-y-2">
              <label className="block font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center z-10">
                  <Mail size={20} className="text-[#767e92]" strokeWidth={2} />
                </div>
                <input
                  type="email"
                  value={email || ""}
                  disabled
                  className="w-full bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] px-3 pl-10 py-2.5 font-poppins text-[14px] leading-[18px] text-[#162447] placeholder:text-[#767e92] focus:outline-none shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative opacity-60 cursor-not-allowed"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                  }}
                />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-2px_1px_0px_rgba(0,0,0,0.03)] rounded-[10px]" />
              </div>
            </div>

            {/* OTP Input */}
            <div className="space-y-2">
              <label className="block font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                Otp
              </label>
              <div className="flex gap-2" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <div key={index} className="relative">
                    <input
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-[60px] h-[60px] bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] text-center font-poppins text-[16px] leading-[20px] text-[#162447] focus:outline-none focus:ring-2 focus:ring-[#513392]/20 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 100%)",
                      }}
                    />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-2px_1px_0px_rgba(0,0,0,0.03)] rounded-[10px]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="font-poppins text-[14px] leading-[18px] text-[#ff2e2c]">
                {error}
              </p>
            )}

            {/* Resend OTP Timer */}
            <div className="text-center">
              <p className="font-poppins text-[14px] leading-[18px] text-[#162447]">
                Request again{" "}
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#0080ff] hover:underline cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-[#0080ff]">{formatTime(timer)}</span>
                )}
              </p>
            </div>

            {/* Submit OTP Button and Additional Content */}
            <div className="space-y-3">
              <Button
                type="submit"
                variant="primary"
                className="w-full h-[48px] bg-[#513392] hover:bg-[#513392] border border-[#dbcdfb] font-poppins text-[14px] leading-[18px] text-white relative overflow-hidden shadow-[0px_6px_4px_0px_rgba(81,51,146,0.08)] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ borderRadius: "10px" }}
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? "Verifying OTP..." : "Submit OTP"}
                </span>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-4px_2px_0px_#5c3ba4]" />
              </Button>

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
          </form>
        </div>
      </div>

      {/* Right Panel - Purple Background */}
      <AuthRightPanel />
    </div>
  );
}

export default function OTPPage() {
  return (
    <Suspense fallback={
      <div className="h-full flex bg-[#fcfcfc] overflow-hidden">
        <div className="flex-1 flex items-center justify-center px-4 py-4 lg:px-8 xl:px-16 overflow-y-auto">
          <div className="w-full max-w-[399px] text-center">
            <Loader fullPage={false} label="Loading..." />
          </div>
        </div>
        <AuthRightPanel />
      </div>
    }>
      <OTPForm />
    </Suspense>
  );
}
