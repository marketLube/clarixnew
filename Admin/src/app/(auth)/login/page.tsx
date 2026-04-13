"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useRouter } from "next/navigation";
import api from "@/src/lib/api";
import { toast } from "sonner";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [step, setStep] = useState<"request" | "reset">("request");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/users/login", { email, password });
      const token = res.data?.data?.token || res.data?.data?.accessToken;
      if (token) {
        localStorage.setItem("AdminToken", token);
      }
      router.push("/dashboard");
    } catch (err: any) {
      // Handled globally
    } finally {
      setLoading(false);
    }
  };

  const handleForgotRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/users/admin/forgot-password/request", { email });
      setStep("reset");
    } catch (err: any) {
      // Handled globally
    } finally {
      setLoading(false);
    }
  };

  const handleForgotReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/users/admin/forgot-password/reset", {
        email,
        otp,
        newPassword,
      });
      setIsForgotMode(false);
      setStep("request");
      setOtp("");
      setNewPassword("");
    } catch (err: any) {
      // Handled globally
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[100vh] w-full bg-[#050d0d]">
      <Image
        src="/assets/Loginbackground.png"
        alt=""
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
        <div className="bg-[rgba(25,26,26,0.63)] border border-[rgba(255,255,255,0.12)] rounded-[20px] p-[30px] max-w-md w-[420px]">
          <div className="flex flex-col gap-[4.25rem]">
            <div className="flex flex-col gap-2 items-center text-center">
              <h1 className="text-[28px] leading-[36px] tracking-[-0.56px] text-white font-medium">
                {isForgotMode ? "Forgot Password" : "Welcome Back!"}
              </h1>
              <p className="text-[14px] leading-5 text-[rgba(255,255,255,0.5)]">
                {isForgotMode
                  ? step === "request"
                    ? "Enter your admin email to receive an OTP."
                    : "Enter the OTP sent to your email and set a new password."
                  : "Please login to continue to your account."}
              </p>
            </div>

            {!isForgotMode ? (
              <form
                onSubmit={handleLoginSubmit}
                className="flex flex-col gap-5 w-full"
              >
                {/* Email Field */}
                <div className="flex flex-col gap-[14px]">
                  <Label className="text-[16px] leading-5 text-[rgba(255,255,255,0.5)]">
                    Email <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="flex items-center gap-[14px] rounded-[12px] border border-[rgba(255,255,255,0.18)] px-4 py-[14px] w-full">
                    <div className="w-6 h-6 rounded-md border border-[rgba(255,255,255,0.18)] flex items-center justify-center text-[12px] text-[rgba(255,255,255,0.5)] shrink-0">
                      @
                    </div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      required
                      className="bg-transparent border-0 outline-none text-[16px] leading-5 text-white placeholder:text-[rgba(255,255,255,0.3)] flex-1 h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-[14px]">
                  <Label className="text-[16px] leading-5 text-[rgba(255,255,255,0.5)]">
                    Password <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                    className="w-full h-[52px] rounded-[12px] border border-[rgba(255,255,255,0.18)] bg-transparent px-4 text-[16px] leading-5 text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.18)] focus-visible:ring-offset-0"
                  />
                </div>

                <div className="flex items-center justify-between text-[13px] text-[rgba(255,255,255,0.6)]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(true);
                      setStep("request");
                    }}
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full h-[54px] rounded-[12px] bg-[#0dba85] border border-[#2bdea7] text-white text-[16px] leading-5 shadow-[0px_8px_6px_0px_rgba(81,51,146,0.08)] active:shadow-[inset_0px_-6px_2px_0px_#12c18b] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            ) : (
              <form
                onSubmit={step === "request" ? handleForgotRequest : handleForgotReset}
                className="flex flex-col gap-5 w-full"
              >
                {/* Email Field */}
                <div className="flex flex-col gap-[14px]">
                  <Label className="text-[16px] leading-5 text-[rgba(255,255,255,0.5)]">
                    Admin Email <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="flex items-center gap-[14px] rounded-[12px] border border-[rgba(255,255,255,0.18)] px-4 py-[14px] w-full">
                    <div className="w-6 h-6 rounded-md border border-[rgba(255,255,255,0.18)] flex items-center justify-center text-[12px] text-[rgba(255,255,255,0.5)] shrink-0">
                      @
                    </div>
                    <Input
                      type="email"
                      placeholder="Enter your admin email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      required
                      disabled={step === "reset"}
                      className="bg-transparent border-0 outline-none text-[16px] leading-5 text-white placeholder:text-[rgba(255,255,255,0.3)] flex-1 h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
                    />
                  </div>
                </div>

                {step === "reset" && (
                  <>
                    {/* OTP Field */}
                    <div className="flex flex-col gap-[14px]">
                      <Label className="text-[16px] leading-5 text-[rgba(255,255,255,0.5)]">
                        OTP <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        name="otp"
                        required
                        className="w-full h-[52px] rounded-[12px] border border-[rgba(255,255,255,0.18)] bg-transparent px-4 text-[16px] leading-5 text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.18)] focus-visible:ring-offset-0"
                      />
                    </div>

                    {/* New Password Field */}
                    <div className="flex flex-col gap-[14px]">
                      <Label className="text-[16px] leading-5 text-[rgba(255,255,255,0.5)]">
                        New Password <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        name="newPassword"
                        required
                        className="w-full h-[52px] rounded-[12px] border border-[rgba(255,255,255,0.18)] bg-transparent px-4 text-[16px] leading-5 text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.18)] focus-visible:ring-offset-0"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between text-[13px] text-[rgba(255,255,255,0.6)]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(false);
                      setStep("request");
                      setOtp("");
                      setNewPassword("");
                    }}
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Back to login
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full h-[54px] rounded-[12px] bg-[#0dba85] border border-[#2bdea7] text-white text-[16px] leading-5 shadow-[0px_8px_6px_0px_rgba(81,51,146,0.08)] active:shadow-[inset_0px_-6px_2px_0px_#12c18b] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? step === "request"
                      ? "Sending OTP..."
                      : "Resetting..."
                    : step === "request"
                      ? "Send OTP"
                      : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </div>
        <div>
          <Image src="/assets/Logo.png" alt="google" width={150} height={60} />
        </div>
      </div>
    </div>
  );
}
