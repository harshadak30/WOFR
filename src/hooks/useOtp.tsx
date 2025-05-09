import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../helper/axios';

interface UseOtpReturn {
  otpDigits: string[];
  remainingTime: number;
  canResendOtp: boolean;
  otpInputRefs: React.RefObject<HTMLInputElement>[];
  handleOtpChange: (index: number, value: string) => void;
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOtpResend: (email: string) => Promise<void>;
  submitOtpVerification: (email: string, onVerifySuccess: (otpValue: string) => void) => Promise<void>;
  displayNotification: (type: "success" | "error" | "warning" | "info", message: string) => void;
}

export const useOtp = (isModalOpen: boolean): UseOtpReturn => {
  // State management
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [canResendOtp, setCanResendOtp] = useState<boolean>(false);

  // Input refs for focus management
  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Timer effect for OTP countdown
  useEffect(() => {
    if (!isModalOpen) return;

    const countdownTimer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          setCanResendOtp(true);
          clearInterval(countdownTimer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [isModalOpen]);

  // Toast notification helper
  const displayNotification = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: type,
      title: message,
    });
  };

  // Handle OTP input changes
  const handleOtpChange = (index: number, value: string): void => {
    // Ensure only one digit is processed
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    // Update OTP state
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);

    // Auto-focus next input if value is entered
    if (value !== "" && index < 3) {
      otpInputRefs[index + 1]?.current?.focus();
    }
  };

  // Handle keyboard navigation between OTP inputs
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && otpDigits[index] === "" && index > 0) {
      otpInputRefs[index - 1]?.current?.focus();
    }
  };

  // Handle OTP resend
  const handleOtpResend = async (email: string): Promise<void> => {
    if (!canResendOtp) return;

    try {
      await apiClient.post(
        `/api/auth/v1/pre-register/email-verification?email=${encodeURIComponent(
          email
        )}`,
        null,
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      displayNotification("success", "OTP resent successfully");
      setRemainingTime(60);
      setCanResendOtp(false);
      setOtpDigits(["", "", "", ""]);
    } catch (error: any) {
      displayNotification(
        "error",
        error?.response?.data?.detail || "Failed to resend OTP"
      );
    }
  };

  // OTP submission handler
  const submitOtpVerification = async (
    email: string, 
    onVerifySuccess: (otpValue: string) => void
  ) => {
    const otpValue = otpDigits.join("");

    if (otpValue.length < 4) {
      displayNotification("error", "Please enter all 4 digits of the OTP");
      return;
    }

    try {
      const response = await apiClient.post(
        "/api/auth/v1/pre-register/verify-otp",
        {
          email,
          otp_code: otpValue,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        displayNotification("success", "Email has been successfully verified.");
        onVerifySuccess(otpValue);
      }
    } catch (error: any) {
      displayNotification(
        "error",
        error?.response?.data?.detail || "Something went wrong. Try again."
      );
    }
  };

  return {
    otpDigits,
    remainingTime,
    canResendOtp,
    otpInputRefs,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpResend,
    submitOtpVerification,
    displayNotification
  };
};
