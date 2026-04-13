import { useState, useEffect, useRef } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

type OtpArray = [string, string, string, string];

export function useOtpSignIn() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState<OtpArray>(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [timer, setTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError("");

    if (!otpRequested) {
      // STEP 1: Request OTP for new signup (do NOT create user yet)
      try {
        setIsSubmitting(true);

        await api.post("/users/signup/request-otp", {
          name,
          email,
          mobileNumber,
          password,
        });

        setOtpRequested(true);
        setTimer(30); // 30 seconds timer
        setOtpError("");

        // Focus first OTP input
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          "Failed to send OTP. Please try again.";
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // STEP 2: Submit OTP and create account
      const otpValue = otp.join("");
      if (otpValue.length !== 4) {
        setOtpError("Please enter complete OTP");
        return;
      }

      try {
        setIsSubmitting(true);
        await api.post("/users/signup/verify-otp", {
          email,
          otp: otpValue,
        });

        // Success: account is now created - redirect to login page
        setOtpError("");
        router.push("/login");
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          "Incorrect OTP, please try again.";
        setOtpError(message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 4);
      const newOtp = [...otp] as OtpArray;
      for (let i = 0; i < pastedValue.length && index + i < 4; i++) {
        newOtp[index + i] = pastedValue[i];
      }
      setOtp(newOtp);
      // Focus next empty input or last input
      const nextIndex = Math.min(index + pastedValue.length, 3);
      otpInputRefs.current[nextIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp] as OtpArray;
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    // Auto-focus next input
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleRequestAgain = async () => {
    if (timer !== 0 || !email || isSubmitting) return;

    setSubmitError("");

    try {
      setIsSubmitting(true);

      // Re-send signup OTP for the same email
      await api.post("/users/signup/request-otp", {
        name,
        email,
        mobileNumber,
        password,
      });

      setTimer(30);
      setOtp(["", "", "", ""]);
      setOtpError("");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Failed to resend OTP. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // form fields
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    mobileNumber,
    setMobileNumber,
    // otp
    otpRequested,
    otp,
    otpError,
    submitError,
    timer,
    isSubmitting,
    // refs & helpers
    otpInputRefs,
    formatTimer,
    // handlers
    handleSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleRequestAgain,
  };
}
