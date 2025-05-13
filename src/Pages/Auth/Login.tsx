import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import backgroundImages from "../../../public/background";
import { useLogin } from "../../hooks/useLogin";
import { useAuth } from "../../hooks/useAuth";
import MainLayout from "../../Layout/MainLayout";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authState, login, logout } = useAuth();
  const {
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
  } = useLogin();

  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authState.isAuthenticated, navigate]);

  type LoginMethod = "password" | "otp" | "both";
  const loginMethodFromAdmin: LoginMethod = "both";
  const isPasswordAuthEnabled =
    loginMethodFromAdmin === ("password" as LoginMethod) ||
    loginMethodFromAdmin === ("both" as LoginMethod);

  const isOtpAuthEnabled =
    loginMethodFromAdmin === ("otp" as LoginMethod) ||
    loginMethodFromAdmin === ("both" as LoginMethod);

  // Check for Google callback on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state");

    if (code && !error) {
      handleGoogleAuthCallback(code, state);
    } else if (error) {
      // Error handling for Google login is already in the hook
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  // Handle Escape key and body overflow for modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isResetModalVisible) {
        closeResetModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    if (isResetModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isResetModalVisible]);

  return (
    <MainLayout>
      <div
        className="bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: "url('background/landingHeroImage.png')" }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-8 w-full max-w-7xl px-4 sm:px-6">
          {/* Left side - Branding */}
          <div className="flex-1 flex flex-col items-center lg:items-start space-y-6 md:space-y-8 mb-6 lg:mb-0 w-full">
            <div className="w-full flex justify-center lg:justify-start">
              <img
                src={backgroundImages.companyLogo}
                alt="Logo"
                className="w-32 md:w-40 mb-2 md:mb-4"
              />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-white font-bold leading-tight text-center lg:text-left">
              Secure Your Financial
              <br />
              Future Today
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed tracking-wide max-w-xl text-center lg:text-left">
              Access your portfolio, track investments, and manage your wealth
              with our advanced financial platform.
            </p>
          </div>

          {/* Right side - Login Form */}
          <div className="flex-1 w-full max-w-md md:max-w-lg lg:max-w-xl">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-3xl mx-auto my-8 sm:my-12 lg:my-20">
              <h2 className="text-xl md:text-2xl font-medium text-gray-800 text-center mb-4 md:mb-6">
                Log in to your Account
              </h2>

              <form className="space-y-4 md:space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@gmail.com"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                {isPasswordAuthEnabled && (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        placeholder="••••••"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 border ${
                          errors.password ? "border-red-500" : "border-gray-200"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        {...register("password", {
                          required: isPasswordAuthEnabled
                            ? "Password is required"
                            : false,
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Remember me / Forgot password */}
                <div className="flex items-center justify-end">
                  {/* <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div> */}
                  <button
                    type="button"
                    onClick={openResetPasswordModal}
                    className="text-sm text-teal-600 hover:text-teal-500 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Generate OTP Button */}
                {isOtpAuthEnabled && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        requestOtpCode(
                          getValues("email"),
                          isPasswordAuthEnabled
                            ? getValues("password")
                            : undefined
                        )
                      }
                      disabled={isOtpProcessing}
                      className="w-full sm:w-[90%] mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 md:py-3 px-4 rounded-md focus:outline-none disabled:bg-teal-500 transition-colors"
                    >
                      {isOtpProcessing
                        ? "Sending..."
                        : "Generate OTP for Verification"}
                    </button>

                    {/* OTP Section */}
                    <div className="mt-4 flex flex-col items-center text-center">
                      <p className="text-sm text-gray-600 mb-3 md:mb-4">
                        {isOtpDelivered
                          ? "We've sent a verification code to your email"
                          : "Generate OTP to verify your account"}
                      </p>
                      <div className="flex items-center space-x-2">
                        {otpDigits.map((value, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) =>
                              handleOtpDigitChange(index, e.target.value)
                            }
                            className="w-10 h-10 md:w-12 md:h-12 text-center border rounded-md"
                            disabled={!isOtpDelivered || isOtpVerifying}
                          />
                        ))}
                      </div>
                      {isOtpDelivered && (
                        <button
                          type="button"
                          onClick={() =>
                            resendOtpCode(
                              getValues("email"),
                              isPasswordAuthEnabled
                                ? getValues("password")
                                : undefined
                            )
                          }
                          disabled={isOtpProcessing}
                          className="mt-3 text-sm text-teal-600 hover:underline disabled:text-gray-400"
                        >
                          {isOtpProcessing ? "Sending..." : "Resend OTP"}
                        </button>
                      )}
                    </div>
                  </>
                )}

                {/* Login Button */}
                <button
                  type="button"
                  onClick={() =>
                    submitOtpVerification(
                      getValues("email"),
                      otpDigits.join("")
                    )
                  }
                  disabled={!isOtpDelivered || isOtpVerifying}
                  className="w-full sm:w-[90%] mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 md:py-3 px-4 rounded-md focus:outline-none disabled:bg-teal-500 transition-colors"
                >
                  {isOtpVerifying ? "Verifying..." : "Login"}
                </button>

                {/* Redirect to Register */}
                <p className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    className="text-teal-600 hover:text-teal-500 font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </form>

              {/* Google Login - Commented out in original code */}
              {/* <div>
                <button
                  type="button"
                  onClick={initiateGoogleAuth}
                  disabled={isGoogleAuthenticating}
                  className="w-full sm:w-[50%] mx-auto flex items-center justify-center gap-2 border mt-6 md:mt-10 border-black hover:bg-gray-100 text-black font-medium py-2 md:py-3 px-4 rounded-md focus:outline-none transition-colors"
                >
                  <img src="icons/google.png" alt="Google" className="w-5 h-5 md:w-6 md:h-6" />
                  <span>{isGoogleAuthenticating ? "Connecting..." : "Google"}</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {isResetModalVisible && (
        <div
          className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 overflow-auto flex items-center justify-center px-4"
          onClick={handleModalOutsideClick}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
              <h3 className="text-base md:text-lg font-medium text-gray-900">
                Reset Password
              </h3>
            </div>

            <form onSubmit={(e) => requestPasswordReset(e, resetEmailAddress)}>
              <div className="px-4 md:px-6 py-3 md:py-4">
                <p className="text-sm text-gray-500 mb-3 md:mb-4">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <div>
                  <label
                    htmlFor="resetEmailAddress"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="resetEmailAddress"
                    value={resetEmailAddress}
                    onChange={(e) => setResetEmailAddress(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 flex flex-row-reverse">
                <button
                  type="submit"
                  disabled={isPasswordResetProcessing}
                  className="ml-3 inline-flex justify-center px-4 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                >
                  {isPasswordResetProcessing ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  type="button"
                  onClick={closeResetModal}
                  className="inline-flex justify-center px-4 py-2 bg-white text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Login;
