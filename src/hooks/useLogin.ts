import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../helper/axios";
import { useAuth } from "./useAuth";

interface UseLoginReturn {
  isPasswordVisible: boolean;
  otpDigits: string[];
  isOtpDelivered: boolean;
  isOtpProcessing: boolean;
  isOtpVerifying: boolean;
  isGoogleAuthenticating: boolean;
  isResetModalVisible: boolean;
  resetEmailAddress: string;
  isPasswordResetProcessing: boolean;
  togglePasswordVisibility: () => void;
  handleOtpDigitChange: (index: number, value: string) => void;
  requestOtpCode: (email: string, password?: string) => Promise<void>;
  submitOtpVerification: (email: string, otpCode: string) => Promise<void>;
  resendOtpCode: (email: string, password?: string) => Promise<void>;
  initiateGoogleAuth: () => Promise<void>;
  handleGoogleAuthCallback: (
    code: string,
    state: string | null
  ) => Promise<void>;
  openResetPasswordModal: (e: React.MouseEvent) => void;
  closeResetModal: () => void;
  handleModalOutsideClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  requestPasswordReset: (e: React.FormEvent, email: string) => Promise<void>;
  setResetEmailAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State management
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [isOtpDelivered, setIsOtpDelivered] = useState<boolean>(false);
  const [isOtpProcessing, setIsOtpProcessing] = useState<boolean>(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState<boolean>(false);
  const [isGoogleAuthenticating, setIsGoogleAuthenticating] =
    useState<boolean>(false);
  const [isResetModalVisible, setIsResetModalVisible] =
    useState<boolean>(false);
  const [resetEmailAddress, setResetEmailAddress] = useState<string>("");
  const [isPasswordResetProcessing, setIsPasswordResetProcessing] =
    useState<boolean>(false);

  // Notification helper
  const showNotification = (message: string, isSuccess: boolean) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: isSuccess ? "success" : "error",
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  // OTP input handling
  const handleOtpDigitChange = (index: number, value: string) => {
    if (value && !/^\d*$/.test(value)) return;

    const updatedDigits = [...otpDigits];
    updatedDigits[index] = value;
    setOtpDigits(updatedDigits);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const requestOtpCode = async (email: string, password?: string) => {
    if (!email) {
      showNotification("Email is required", false);
      return;
    }

    setIsOtpProcessing(true);

    try {
      const response = await axios.post(`api/auth/v1/login`, {
        email_or_phone: email,
        password: password,
      });

      if (response.data) {
        setIsOtpDelivered(true);
        showNotification("OTP sent to your email", true);
        setOtpDigits(["", "", "", ""]);
      }
    } catch (error: any) {
      console.error("OTP generation error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        "Failed to generate OTP. Please try again.";
      showNotification(errorMessage, false);
    } finally {
      setIsOtpProcessing(false);
    }
  };

  const submitOtpVerification = async (email: string, otpCode: string) => {
    if (otpCode.length !== 4) {
      showNotification("Please enter the complete 4-digit OTP", false);
      return;
    }

    setIsOtpVerifying(true);

    try {
      const response = await axios.post(`api/auth/v1/verify-login-otp`, {
        email_or_phone: email,
        otp_code: otpCode,
      });

      if (response.data) {
        if (response.data.token) {
          //   login(response.data.token, response.data.username);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("user_type", response.data.user_type);
        }
        showNotification("Login successful", true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      const errorMessage =
        error.response?.data?.detail || "Invalid OTP. Please try again.";
      showNotification(errorMessage, false);
    } finally {
      setIsOtpVerifying(false);
    }
  };

  const resendOtpCode = (email: string, password?: string) =>
    requestOtpCode(email, password);

  const initiateGoogleAuth = async () => {
    setIsGoogleAuthenticating(true);
    try {
      const response = await axios.get(`auth/v1/google/login`);

      if (response.data && response.data.authUrl) {
        window.location.href = response.data.authUrl;
      } else {
        window.location.href = `auth/v1/google/login`;
      }
    } catch (error) {
      console.error("Google login error:", error);
      showNotification(
        "Failed to connect with Google. Please try again.",
        false
      );
      setIsGoogleAuthenticating(false);
    }
  };

  const handleGoogleAuthCallback = async (
    code: string,
    state: string | null
  ) => {
    setIsGoogleAuthenticating(true);
    try {
      const response = await axios.post(`v1/auth/google/callback`, {
        code,
        state: state || "",
      });

      if (response.data) {
        if (response.data.token) {
          login(
            response.data.token,
            response.data.username,
            response.data.user_type || "User"
          );
        }

        showNotification("Google login successful", true);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Google callback error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        "Failed to authenticate with Google. Please try again.";
      showNotification(errorMessage, false);
    } finally {
      setIsGoogleAuthenticating(false);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const openResetPasswordModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResetModalVisible(true);
  };

  const handleModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeResetModal();
    }
  };

  const closeResetModal = () => {
    setIsResetModalVisible(false);
    setResetEmailAddress("");
  };

  // Send password reset link
  const requestPasswordReset = async (e: React.FormEvent, email: string) => {
    e.preventDefault();

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      showNotification("Please enter a valid email address", false);
      return;
    }

    setIsPasswordResetProcessing(true);

    try {
      await axios.post(`api/auth/v1/forgot-password/send-link`, null, {
        params: { email },
      });

      showNotification("Password reset link sent to your email", true);
      setIsResetModalVisible(false);
    } catch (error: any) {
      console.error("Forgot password error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        "Failed to send password reset link. Please try again.";
      showNotification(errorMessage, false);
    } finally {
      setIsPasswordResetProcessing(false);
    }
  };

  return {
    isPasswordVisible,
    otpDigits,
    isOtpDelivered,
    isOtpProcessing,
    isOtpVerifying,
    isGoogleAuthenticating,
    isResetModalVisible,
    resetEmailAddress,
    isPasswordResetProcessing,
    togglePasswordVisibility,
    handleOtpDigitChange,
    requestOtpCode,
    submitOtpVerification,
    resendOtpCode,
    initiateGoogleAuth,
    handleGoogleAuthCallback,
    openResetPasswordModal,
    closeResetModal,
    handleModalOutsideClick,
    requestPasswordReset,
    setResetEmailAddress,
  };
};
