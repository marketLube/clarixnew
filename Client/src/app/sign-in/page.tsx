"use client";

import React from "react";
import Link from "next/link";
import { AuthRightPanel } from "@/components/common/AuthRightPanel";
import { useOtpSignIn } from "@/hooks/auth/useOtpSignIn";

/* Inline SVG icons replacing broken localhost:3845 Figma assets */
const NameIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#767e92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#767e92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#767e92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
);
const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
);

export default function SignInPage() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    mobileNumber,
    setMobileNumber,
    otpRequested,
    otp,
    otpError,
    submitError,
    timer,
    isSubmitting,
    otpInputRefs,
    formatTimer,
    handleSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleRequestAgain,
  } = useOtpSignIn();

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple login
  };

  return (
    <div className="h-screen flex bg-[#fcfcfc] overflow-hidden">
      {/* Left Panel - Form Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 lg:px-8 xl:px-16 overflow-y-auto">
        <div className="w-full max-w-[399px]">
          {/* Welcome Section */}
          <div className="mb-5">
            <h1 className="font-poppins font-medium text-[36px] leading-[40px] text-[#162447] tracking-[-0.72px] mb-2">
              Welcome to Clarix
            </h1>
            <p className="font-poppins text-[14px] leading-[18px] text-[#767e92]">
              Please login to continue to your account.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center z-10">
                  <NameIcon />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] px-3 pl-10 py-2.5 font-poppins text-[14px] leading-[18px] text-[#162447] placeholder:text-[#767e92] focus:outline-none focus:ring-2 focus:ring-[#513392]/20 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                  }}
                  required
                  disabled={otpRequested}
                />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-2px_1px_0px_rgba(0,0,0,0.03)] rounded-[12px]" />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center z-10">
                  <EmailIcon />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] px-3 pl-10 py-2.5 font-poppins text-[14px] leading-[18px] text-[#162447] placeholder:text-[#767e92] focus:outline-none focus:ring-2 focus:ring-[#513392]/20 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                  }}
                  required
                  disabled={otpRequested}
                />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-2px_1px_0px_rgba(0,0,0,0.03)] rounded-[12px]" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] px-3 py-2.5 font-poppins text-[14px] leading-[18px] text-[#162447] placeholder:text-[#767e92] focus:outline-none focus:ring-2 focus:ring-[#513392]/20 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                }}
                required
                disabled={otpRequested}
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-2px_1px_0px_rgba(0,0,0,0.03)] rounded-[12px]" />
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-2">
              <label className="block font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center z-10">
                  <PhoneIcon />
                </div>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="+91 0000 0000 00"
                  className="w-full bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] px-3 pl-10 py-2.5 font-poppins text-[14px] leading-[18px] text-[#162447] placeholder:text-[#767e92] focus:outline-none focus:ring-2 focus:ring-[#513392]/20 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                  }}
                  required
                  disabled={otpRequested}
                />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-2px_1px_0px_rgba(0,0,0,0.03)] rounded-[12px]" />
              </div>
            </div>

            {/* General submit error */}
            {submitError && (
              <p className="font-poppins text-[14px] leading-[18px] text-[#ff2e2c] whitespace-nowrap">
                {submitError}
              </p>
            )}

            {/* OTP Section - Shown after Request OTP */}
            {otpRequested && (
              <div className="space-y-2">
                <label className="block font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                  Otp
                </label>
                <div className="flex gap-1.5 items-center">
                  {otp.map((value, index) => (
                    <div
                      key={index}
                      className="relative"
                      style={{
                        width:
                          index === 0 ? "80px" : index === 3 ? "82px" : "81px",
                      }}
                    >
                      <input
                        ref={(el) => {
                          otpInputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-full h-[48px] bg-white border-[0.5px] border-[#ff2e2c] rounded-[10px] px-3 py-2 font-poppins font-medium text-[20px] leading-[24px] text-[#ff2e2c] tracking-[-0.4px] text-center focus:outline-none focus:ring-2 focus:ring-[#ff2e2c]/20 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(255, 46, 44, 0.06) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                        }}
                      />
                      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-2px_1px_0px_rgba(0,0,0,0.03)] rounded-[12px]" />
                    </div>
                  ))}
                </div>
                {otpError && (
                  <p className="font-poppins text-[14px] leading-[18px] text-[#ff2e2c] whitespace-nowrap">
                    {otpError}
                  </p>
                )}
              </div>
            )}

            {/* Request OTP / Submit OTP Button and Additional Content */}
            <div className="space-y-3">
              {/* Request again timer and Submit OTP button - shown when OTP is requested */}
              {otpRequested && (
                <div className="flex flex-col gap-3 items-start w-full">
                  <p className="font-poppins text-[14px] leading-[18px] text-[#162447] whitespace-nowrap">
                    <span>Request again </span>
                    {timer > 0 ? (
                      <span className="font-poppins font-medium text-[#0080ff]">
                        {formatTimer(timer)}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRequestAgain}
                        className="font-poppins font-medium text-[#0080ff] hover:underline cursor-pointer"
                      >
                        Click here
                      </button>
                    )}
                  </p>
                  <button
                    type="submit"
                    className="w-full h-[48px] bg-[#513392] border border-[#dbcdfb] rounded-[10px] font-poppins text-[14px] leading-[18px] text-white relative overflow-hidden shadow-[0px_6px_4px_0px_rgba(81,51,146,0.08)] flex items-center justify-center cursor-pointer hover:bg-[#5c3ba4] transition-colors"
                  >
                    <span className="relative z-10">Submit OTP</span>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-4px_2px_0px_#5c3ba4]" />
                  </button>
                </div>
              )}

              {/* Request OTP button - shown when OTP is not requested */}
              {!otpRequested && (
                <button
                  type="submit"
                  className="w-full h-[48px] bg-[#513392] border border-[#dbcdfb] rounded-[10px] font-poppins text-[14px] leading-[18px] text-white relative overflow-hidden shadow-[0px_6px_4px_0px_rgba(81,51,146,0.08)] flex items-center justify-center cursor-pointer hover:bg-[#5c3ba4] transition-colors"
                >
                  <span className="relative z-10">Request OTP</span>
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-4px_2px_0px_#5c3ba4]" />
                </button>
              )}

              {/* Divider */}
              <div className="flex items-center gap-[10px]">
                <div className="flex-1 h-px bg-[#e6e8e7]" />
                <p className="font-poppins text-[14px] leading-[18px] text-[#767e92] whitespace-nowrap">
                  or
                </p>
                <div className="flex-1 h-px bg-[#e6e8e7]" />
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full h-[48px] bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] font-poppins text-[14px] leading-[18px] text-[#162447] relative overflow-hidden shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                  }}
                >
                  <span>Continue with Google</span>
                  <GoogleIcon />
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-1px_0px_1px_rgba(0,0,0,0.03)] rounded-[12px]" />
                </button>

                <button
                  type="button"
                  onClick={handleAppleLogin}
                  className="w-full h-[48px] bg-white border-[0.5px] border-[#e6e8e7] rounded-[10px] font-poppins text-[14px] leading-[18px] text-[#162447] relative overflow-hidden shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(35, 35, 35, 0) 0%, rgba(35, 35, 35, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                  }}
                >
                  <span>Continue with Apple</span>
                  <AppleIcon />
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-1px_0px_1px_rgba(0,0,0,0.03)] rounded-[12px]" />
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-[10px]">
                <div className="flex-1 h-px bg-[#e6e8e7]" />
                <p className="font-poppins text-[14px] leading-[18px] text-[#767e92] whitespace-nowrap">
                  or
                </p>
                <div className="flex-1 h-px bg-[#e6e8e7]" />
              </div>

              {/* Clarix Login Section */}
              <div className="space-y-3 text-center max-w-[319px] mx-auto">
                <p className="font-poppins text-[18px] leading-[24px] text-[#162447] tracking-[-0.36px]">
                  Clarix Login
                </p>
                <div className="flex items-center justify-center gap-3 font-poppins text-[14px] leading-[18px] whitespace-nowrap">
                  <p className="text-[#767e92]">Already A Member?</p>
                  <Link
                    href="/login"
                    className="text-[#0080ff] hover:underline cursor-pointer"
                  >
                    Login here
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
