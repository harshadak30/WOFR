import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../Layout/mainLayout";

type LoginMethod = "password" | "otp" | "both";
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);

  const loginMethodFromAdmin: "password" | "otp" | "both" = "both";

  const allowPassword =
    loginMethodFromAdmin === ("password" as LoginMethod) ||
    loginMethodFromAdmin === ("both" as LoginMethod);

  const allowOTP =
    loginMethodFromAdmin === ("otp" as LoginMethod) ||
    loginMethodFromAdmin === ("both" as LoginMethod);
  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleOtpChange = (index: number, value: string) => {
    const updated = [...otpValues];
    updated[index] = value;
    setOtpValues(updated);
  };

  return (
    <MainLayout>
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('background/background.png')" }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 w-full max-w-7xl px-6 py-0">
        <div className="flex-1 flex flex-col items-start lg:items-start space-y-8 mb-8 lg:mb-0">
          <div className="w-full flex justify-center lg:justify-center">
            <img src="background/company-logo.png" alt="Logo" className="w-40 mb-4" />
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

        <div className="flex-1 w-full max-w-3xl">
          <div className="bg-white rounded-lg p-8 w-full max-w-xl">
            <h2 className="text-2xl font-medium text-gray-800 text-center mb-6">
              Log in to your Account
            </h2>

            <div className="space-y-6">
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
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Password */}
              {allowPassword && (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember me / Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
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
                </div>
                <a
                  href="#"
                  className="text-sm text-teal-600 hover:text-teal-500 font-medium"
                >
                  Forgot Password?
                </a>
              </div>

              {/* OTP */}
              {allowOTP && (
                <>
                  <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-gray-500 text-base">
                        OR
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-[90%] mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none"
                  >
                    Generate OTP for Verification
                  </button>

                  <div className="mt-4 flex flex-col items-center text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      We've sent a verification code to your email
                    </p>
                    <div className="flex items-center space-x-2">
                      {otpValues.map((value, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={value}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          className="w-12 h-12 text-center border rounded-md"
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="mt-3 text-sm text-teal-600 hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                </>
              )}

              {/* Login Button */}
              <button
                type="button"
                className="w-[90%] mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none"
              >
                Login
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
            </div>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default Login;
