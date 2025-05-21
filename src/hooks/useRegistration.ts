import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, UseFormReturn } from "react-hook-form";
import Swal from "sweetalert2";
import apiClient from "../helper/axios";

interface RegistrationFormData {
  email: string;
  name: string;
  phoneNumber: string;
  organization: string;
  password: string;
  confirmPassword: string;
}

interface UseRegisterReturn {
  isVerifyingEmail: boolean;
  isEmailVerified: boolean;
  isOtpVerified: boolean;
  isOtpModalVisible: boolean;
  isPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
  form: UseFormReturn<RegistrationFormData>;
  verifyEmail: () => Promise<void>;
  submitRegistration: () => Promise<void>;
  onSubmit: (data: RegistrationFormData) => void;
  handleRegistrationSubmit: () => void;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
  displayNotification: (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => void;
  setIsOtpModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOtpVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRegister = (): UseRegisterReturn => {
  const navigate = useNavigate();

  const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  // Initialize form with default values to avoid undefined values
  const form = useForm<RegistrationFormData>({
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      organization: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

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

  const verifyEmail = async () => {
    const email = form.getValues("email");

    if (!email) {
      displayNotification("error", "Please enter a valid email first");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      displayNotification("error", "Invalid email format");
      return;
    }

    setIsVerifyingEmail(true);

    try {
      const response = await apiClient.post(
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

      setIsEmailVerified(true);
      setIsOtpModalVisible(true);
      displayNotification(
        "success",
        response.data.msg || "OTP sent to your email"
      );
    } catch (error: any) {
      console.error("Email verification error:", error);
      const errorMessage =
        error?.response?.data?.detail || "Failed to send OTP";
      displayNotification("error", errorMessage);
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const submitRegistration = async () => {
    try {
      const formData = form.getValues();

      if (
        !formData.email ||
        !formData.name ||
        !formData.phoneNumber ||
        !formData.password
      ) {
        displayNotification("error", "Please fill all required fields");
        return;
      }

      const formDataUrlEncoded = new URLSearchParams();
      formDataUrlEncoded.append("user_name", formData.name);
      formDataUrlEncoded.append("user_email", formData.email);
      formDataUrlEncoded.append("phone", formData.phoneNumber);
      formDataUrlEncoded.append(
        "organization_name",
        formData.organization || ""
      );
      formDataUrlEncoded.append("user_password", formData.password);
      formDataUrlEncoded.append("confirm_password", formData.confirmPassword);

      const response = await apiClient.post(
        "/api/auth/v1/register",
        formDataUrlEncoded.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      );

      displayNotification(
        "success",
        "Registration Successful! You can now login to your account"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Registration failed";
      displayNotification("error", errorMessage);
    }
  };

  const onSubmit = (data: RegistrationFormData) => {
    if (!isEmailVerified) {
      displayNotification("warning", "Please verify your email first");
      return;
    }

    if (!isOtpVerified) {
      displayNotification("warning", "Please verify OTP first");
      return;
    }

    submitRegistration();
  };
  const handleRegistrationSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prev) => !prev);

  useEffect(() => {
    return () => {
    };
  }, []);

  return {
    isVerifyingEmail,
    isEmailVerified,
    isOtpVerified,
    isOtpModalVisible,
    isPasswordVisible,
    isConfirmPasswordVisible,
    form,
    verifyEmail,
    submitRegistration,
    onSubmit,
    handleRegistrationSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    displayNotification,
    setIsOtpModalVisible,
    setIsOtpVerified,
  };
};
