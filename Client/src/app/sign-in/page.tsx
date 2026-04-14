"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthRightPanel } from "@/components/common/AuthRightPanel";
import { useOtpSignIn } from "@/hooks/auth/useOtpSignIn";

// Figma image assets
const nameIcon =
  "http://localhost:3845/assets/fba78208e440397ab07ea1bed24754e15e266ab7.svg";
const emailIcon =
  "http://localhost:3845/assets/51a6cda4c03d683cf147106a4a16222b69e329c1.svg";
const phoneFrame =
  "http://localhost:3845/assets/329f38a28c495128eb9923b7c1bea4564ffb4790.svg";
const dividerVector =
  "http://localhost:3845/assets/787832ce6135077236dc4304d3144a1256212bfc.svg";
const googleIcon =
  "http://localhost:3845/assets/c726daed94ca0c5bc3b7aba73ec253421fe87bca.svg";
const appleIcon =
  "http://localhost:3845/assets/450805c3a1633aa70989c2e2fe28324ddf8266f1.svg";

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
            <h1 className="font-helvetica font-medium text-[36px] leading-[40px] text-[#162447] tracking-[-0.72px] mb-2">
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
                  <Image
                    src={nameIcon}
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                  />
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
                  <Image
                    src={emailIcon}
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                  />
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
                  <Image
                    src={phoneFrame}
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                  />
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
                        className="w-full h-[48px] bg-white border-[0.5px] border-[#ff2e2c] rounded-[10px] px-3 py-2 font-helvetica font-medium text-[20px] leading-[24px] text-[#ff2e2c] tracking-[-0.4px] text-center focus:outline-none focus:ring-2 focus:ring-[#ff2e2c]/20 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] relative"
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
                <div className="flex-1 h-px relative min-h-px min-w-px">
                  <Image
                    src={dividerVector}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <p className="font-poppins text-[14px] leading-[18px] text-[#767e92] whitespace-nowrap">
                  or
                </p>
                <div className="flex-1 h-px relative min-h-px min-w-px">
                  <Image
                    src={dividerVector}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
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
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Image
                      src={googleIcon}
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
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
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Image
                      src={appleIcon}
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-1px_0px_1px_rgba(0,0,0,0.03)] rounded-[12px]" />
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-[10px]">
                <div className="flex-1 h-px relative min-h-px min-w-px">
                  <Image
                    src={dividerVector}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <p className="font-poppins text-[14px] leading-[18px] text-[#767e92] whitespace-nowrap">
                  or
                </p>
                <div className="flex-1 h-px relative min-h-px min-w-px">
                  <Image
                    src={dividerVector}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>

              {/* Clarix Login Section */}
              <div className="space-y-3 text-center max-w-[319px] mx-auto">
                <p className="font-helvetica text-[18px] leading-[24px] text-[#162447] tracking-[-0.36px]">
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
