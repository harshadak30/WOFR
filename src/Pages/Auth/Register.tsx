 import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import OtpVerificationPopup from "./OtpVerificationPopup";
import MainLayout from "../../Layout/mainLayout";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../helper/axios";

// Define types for form inputs
interface RegisterFormInputs {
  email: string;
  name: string;
  phoneNumber: string;
  organization: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  email?: string;
}

const Register: React.FC<RegisterFormProps> = () => {
  const [verifyingEmail, setVerifyingEmail] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      organization: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Show toast notification
  const showToast = (
    icon: "success" | "error" | "warning" | "info",
    title: string
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
      icon,
      title,
    });
  };

  const handleEmailVerify = async () => {
    const email = getValues("email");

    if (!email) {
      showToast("error", "Please enter a valid email first");
      return;
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      showToast("error", "Invalid email format");
      return;
    }

    setVerifyingEmail(true);

    try {
      const response = await axios.post(
        `/api/auth/v1/pre-register/email-verification?email=${encodeURIComponent(email)}`,
        null,
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      setIsEmailVerified(true);
      setIsOtpModalOpen(true);
      showToast("success", response.data.msg || "OTP sent to your email");
    } catch (error: any) {
      console.error("Error verifying email:", error);
      showToast("error", error?.response?.data?.detail || "Failed to send OTP");
    } finally {
      setVerifyingEmail(false);
    }
  };

  const submitRegistration = async () => {
    try {
      const formData = getValues();

      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("user_name", formData.name);
      urlEncodedData.append("user_email", formData.email);
      urlEncodedData.append("phone", formData.phoneNumber);
      urlEncodedData.append("organization_name", formData.organization);
      urlEncodedData.append("user_password", formData.password);
      urlEncodedData.append("confirm_password", formData.confirmPassword);

      const response = await axios.post(
        "/api/auth/v1/register", 
        urlEncodedData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      );

      showToast(
        "success",
        "Registration Successful! You can now login to your account"
      );
      navigate("/login");
    } catch (error: any) {
      console.error("Error during registration:", error);
      showToast(
        "error",
        error?.response?.data?.detail || 
        error?.response?.data?.message || 
        "Registration failed"
      );
    }
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = () => {
    if (!isEmailVerified) {
      showToast("warning", "Please verify your email first");
      return;
    }

    submitRegistration();
  };

  // Handle submit button click when email is not verified
  const handleSubmitButtonClick = () => {
    if (!isEmailVerified) {
      showToast("warning", "Please verify your email first");
      return;
    }

    submitRegistration();
  };

  return (
    <MainLayout>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: "url('background/background.png')" }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 w-full max-w-7xl px-6 py-0">
          {/* Left Column - Branding */}
          <div className="flex-1 flex flex-col items-start lg:items-start space-y-8 mb-8 lg:mb-0">
            <div className="w-full flex justify-center lg:justify-center">
              <img
                src="background/company-logo.png"
                alt="Logo"
                className="w-40 mb-4"
              />
            </div>

            <h1 className="text-4xl lg:text-4xl xl:text-5xl text-white font-bold leading-tight text-center lg:text-left">
              Secure Your Financial
              <br />
              Future Today
            </h1>

            <p className="text-lg lg:text-xl text-white leading-relaxed tracking-wide max-w-xl text-center lg:text-left">
              Access your portfolio, track investments, and manage your wealth
              with our advanced financial platform.
            </p>
          </div>

          {/* Right Column - Registration Form */}
          <div className="flex-1 w-full max-w-3xl">
            <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-3xl mx-auto my-20">
              <h2 className="text-3xl font-medium text-gray-800 text-center mb-8">
                Register Your Account
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field with Verification */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      className={`w-full px-4 py-4 bg-gray-200 border ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      disabled={isEmailVerified}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={handleEmailVerify}
                      disabled={verifyingEmail || isEmailVerified}
                      className={`px-4 py-2 w-2/5 ${
                        isEmailVerified
                          ? "bg-green-600"
                          : verifyingEmail
                          ? "bg-gray-500"
                          : "bg-teal-600 hover:bg-teal-700"
                      } text-white rounded-r-md transition`}
                    >
                      {verifyingEmail
                        ? "Verifying..."
                        : isEmailVerified
                        ? "Verified"
                        : "Verify"}
                    </button>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className={`w-full px-4 py-4 bg-gray-200 border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters long",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Two-column layout for remaining fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number Field */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="+917768423612"
                      className={`w-full px-4 py-4 bg-gray-200 border ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-200"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[+]?[0-9]{10,15}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Organization Field */}
                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      placeholder="xyz"
                      disabled
                      className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      {...register("organization")}
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="******"
                        className={`w-full px-4 py-4 bg-gray-200 border ${
                          errors.password ? "border-red-500" : "border-gray-200"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                          },
                        })}
                      />
                      <span
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="******"
                        className={`w-full px-4 py-4 bg-gray-200 border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-200"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                        })}
                        required
                      />
                      <span
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 pb-4">
                  <button
                    type="button"
                    onClick={handleSubmitButtonClick}
                    className={`w-[70%] mx-auto block ${
                      isEmailVerified && isOtpVerified
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "bg-gray-400"
                    } text-white font-medium py-2 px-6 rounded-md focus:outline-none transition duration-300 text-lg`}
                    disabled={!isEmailVerified || !isOtpVerified}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Popup */}
      <OtpVerificationPopup
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        email={getValues("email")}
        onVerify={() => {
          setIsOtpVerified(true);
          setIsOtpModalOpen(false);
        }}
      />
    </MainLayout>
  );
};

export default Register;

