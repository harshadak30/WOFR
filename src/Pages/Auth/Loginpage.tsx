import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/mainLayout";

type LoginMethod = "password" | "otp" | "both";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showOtpSection, setShowOtpSection] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginMethodFromAdmin: LoginMethod = "both";

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

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        "https://23f2-2405-201-37-21d9-3801-53f6-f1a6-cf41.ngrok-free.app/api/auth/v1/login",
        {
          email_or_phone: emailOrPhone,
          password: password,
        }
      );

      // If login is successful, show the OTP section
      if (response.status === 200) {
        setOtpSent(true);
        setShowOtpSection(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const otpCode = otpValues.join(""); // Joining the OTP values
      const response = await axios.post(
        "https://23f2-2405-201-37-21d9-3801-53f6-f1a6-cf41.ngrok-free.app/api/auth/v1/verify-login-otp",
        {
          email_or_phone: emailOrPhone,
          otp_code: otpCode,
        }
      );

      // If OTP verification is successful, navigate to the next page
      if (response.status === 200) {
        navigate("/wofr/lease-intro");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
    }
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
                {/* Email / Phone */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email ID or Phone Number
                  </label>
                  <input
                    type="text"
                    id="email_or_phone"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="example@gmail.com or 1234567890"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                {/* OTP Section */}
                {showOtpSection && (
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

                    <div className="mt-4 flex flex-col items-center text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        We've sent a verification code to your email/phone.
                      </p>
                      <div className="flex items-center space-x-2">
                        {otpValues.map((value, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="w-12 h-12 text-center border rounded-md"
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="mt-3 text-sm text-teal-600 hover:underline"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </>
                )}

                {/* Login Button */}
                {!showOtpSection && (
                  <button
                    type="button"
                    onClick={handleLoginSubmit}
                    className="w-[90%] mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none"
                  >
                    Login
                  </button>
                )}

                {/* Redirect to Register */}
                <p className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-teal-600 hover:text-teal-500 font-medium"
                  >
                    Sign up
                  </a>
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



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import MainLayout from "../../Layout/mainLayout";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// type LoginMethod = "password" | "otp" | "both";

// type FormValues = {
//   email: string;
//   password: string;
// };

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
//   const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
//   const [isGeneratingOtp, setIsGeneratingOtp] = useState<boolean>(false);
//   const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//   } = useForm<FormValues>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const loginMethodFromAdmin: LoginMethod = "both";

//   // Fix TypeScript comparison issue
//   const PASSWORD: LoginMethod = "password";
//   const OTP: LoginMethod = "otp";
//   const BOTH: LoginMethod = "both";

//   const allowPassword =
//     loginMethodFromAdmin === ("password" as LoginMethod) ||
//     loginMethodFromAdmin === ("both" as LoginMethod);

//   const allowOTP =
//     loginMethodFromAdmin === ("otp" as LoginMethod) ||
//     loginMethodFromAdmin === ("both" as LoginMethod);
//   const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

//   const handleOtpChange = (index: number, value: string) => {
//     // Only allow numbers
//     if (value && !/^\d*$/.test(value)) return;

//     const updated = [...otpValues];
//     updated[index] = value;
//     setOtpValues(updated);

//     // Auto-focus to next input if value is entered
//     if (value && index < 3) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) {
//         nextInput.focus();
//       }
//     }
//   };

//   const showNotification = (message: string, isSuccess: boolean) => {
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: isSuccess ? "success" : "error",
//       title: message,
//       showConfirmButton: false,
//       timer: 3000,
//     });
//   };

//   const generateOtp = async () => {
//     const email = getValues("email");
//     const password = getValues("password");

//     // Validate email
//     if (!email) {
//       showNotification("Email is required", false);
//       return;
//     }

//     // Validate password if password method is allowed
//     if (allowPassword && !password) {
//       showNotification("Password is required", false);
//       return;
//     }

//     setIsGeneratingOtp(true);

//     try {
//       const response = await axios.post(
//         "https://23f2-2405-201-37-21d9-3801-53f6-f1a6-cf41.ngrok-free.app/api/auth/v1/login",
//         {
//           email_or_phone: email,
//           password: allowPassword ? password : undefined,
//         }
//       );

//       if (response.data) {
//         setIsOtpSent(true);
//         showNotification("OTP sent to your email", true);
//         // Clear OTP values
//         setOtpValues(["", "", "", ""]);
//       }
//     } catch (error: any) {
//       console.error("OTP generation error:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "Failed to generate OTP. Please try again.";
//       showNotification(errorMessage, false);
//     } finally {
//       setIsGeneratingOtp(false);
//     }
//   };

//   const verifyOtp = async () => {
//     const email = getValues("email");
//     const otpCode = otpValues.join("");

//     // Validate OTP
//     if (otpCode.length !== 4) {
//       showNotification("Please enter the complete 4-digit OTP", false);
//       return;
//     }

//     setIsVerifyingOtp(true);

//     try {
//       const response = await axios.post(
//         "https://23f2-2405-201-37-21d9-3801-53f6-f1a6-cf41.ngrok-free.app/api/auth/v1/verify-login-otp",
//         {
//           email_or_phone: email,
//           otp_code: otpCode,
//         }
//       );

//       if (response.data) {
//         // Store token if needed
//         // localStorage.setItem("token", response.data.token);

//         showNotification("Login successful", true);

//         // Small delay before navigation to allow seeing the success message
//         setTimeout(() => {
//           navigate("/wofr/lease-intro");
//         }, 1000);
//       }
//     } catch (error: any) {
//       console.error("OTP verification error:", error);
//       const errorMessage =
//         error.response?.data?.message || "Invalid OTP. Please try again.";
//       showNotification(errorMessage, false);
//     } finally {
//       setIsVerifyingOtp(false);
//     }
//   };

//   const resendOtp = () => {
//     generateOtp();
//   };

//   return (
//     <MainLayout>
//       <div
//         className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
//         style={{ backgroundImage: "url('background/background.png')" }}
//       >
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-12 w-full max-w-7xl px-6 py-0">
//           <div className="flex-1 flex flex-col items-start lg:items-start space-y-8 mb-8 lg:mb-0">
//             <div className="w-full flex justify-center lg:justify-center">
//               <img
//                 src="background/company-logo.png"
//                 alt="Logo"
//                 className="w-40 mb-4"
//               />
//             </div>
//             <h1 className="text-4xl lg:text-4xl xl:text-5xl text-white font-bold leading-tight text-center lg:text-left">
//               Secure Your Financial
//               <br />
//               Future Today
//             </h1>
//             <p className="text-lg lg:text-xl text-white leading-relaxed tracking-wide max-w-xl text-center lg:text-left">
//               Access your portfolio, track investments, and manage your wealth
//               with our advanced financial platform.
//             </p>
//           </div>

//           <div className="flex-1 w-full max-w-3xl">
//             <div className="bg-white rounded-lg p-8 w-full max-w-xl">
//               <h2 className="text-2xl font-medium text-gray-800 text-center mb-6">
//                 Log in to your Account
//               </h2>

//               <form className="space-y-6">
//                 {/* Email */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Email ID
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="example@gmail.com"
//                     className={`w-full px-4 py-3 bg-gray-100 border ${
//                       errors.email ? "border-red-500" : "border-gray-200"
//                     } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                         message: "Invalid email address",
//                       },
//                     })}
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 {allowPassword && (
//                   <div>
//                     <label
//                       htmlFor="password"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         id="password"
//                         placeholder="••••••"
//                         className={`w-full px-4 py-3 bg-gray-100 border ${
//                           errors.password ? "border-red-500" : "border-gray-200"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                         {...register("password", {
//                           required: allowPassword
//                             ? "Password is required"
//                             : false,
//                           minLength: {
//                             value: 6,
//                             message: "Password must be at least 6 characters",
//                           },
//                         })}
//                       />
//                       <button
//                         type="button"
//                         className="absolute inset-y-0 right-3 flex items-center"
//                         onClick={handlePasswordVisibility}
//                       >
//                         {showPassword ? <FaEye /> : <FaEyeSlash />}
//                       </button>
//                     </div>
//                     {errors.password && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.password.message}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* Remember me / Forgot password */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <input
//                       id="remember"
//                       type="checkbox"
//                       className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
//                     />
//                     <label
//                       htmlFor="remember"
//                       className="ml-2 block text-sm text-gray-700"
//                     >
//                       Remember me
//                     </label>
//                   </div>
//                   <a
//                     href="#"
//                     className="text-sm text-teal-600 hover:text-teal-500 font-medium"
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>

//                 {/* Generate OTP Button */}
//                 {allowOTP && (
//                   <>
//                     <div className="relative py-1">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300"></div>
//                       </div>
//                       <div className="relative flex justify-center">
//                         <span className="px-4 bg-white text-gray-500 text-base">
//                           OR
//                         </span>
//                       </div>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={generateOtp}
//                       disabled={isGeneratingOtp}
//                       className="w-[90%] mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none disabled:bg-teal-500"
//                     >
//                       {isGeneratingOtp
//                         ? "Sending..."
//                         : "Generate OTP for Verification"}
//                     </button>

//                     {/* OTP Section - Always visible but disabled until OTP is sent */}
//                     <div className="mt-4 flex flex-col items-center text-center">
//                       <p className="text-sm text-gray-600 mb-4">
//                         {isOtpSent
//                           ? "We've sent a verification code to your email"
//                           : "Generate OTP to verify your account"}
//                       </p>
//                       <div className="flex items-center space-x-2">
//                         {otpValues.map((value, index) => (
//                           <input
//                             key={index}
//                             id={`otp-${index}`}
//                             type="text"
//                             maxLength={1}
//                             value={value}
//                             onChange={(e) =>
//                               handleOtpChange(index, e.target.value)
//                             }
//                             className="w-12 h-12 text-center border rounded-md"
//                             disabled={!isOtpSent || isVerifyingOtp}
//                           />
//                         ))}
//                       </div>
//                       {isOtpSent && (
//                         <button
//                           type="button"
//                           onClick={resendOtp}
//                           disabled={isGeneratingOtp}
//                           className="mt-3 text-sm text-teal-600 hover:underline disabled:text-gray-400"
//                         >
//                           {isGeneratingOtp ? "Sending..." : "Resend OTP"}
//                         </button>
//                       )}
//                     </div>
//                   </>
//                 )}

//                 {/* Login Button - Now used for OTP verification */}
//                 <button
//                   type="button"
//                   onClick={verifyOtp}
//                   disabled={!isOtpSent || isVerifyingOtp}
//                   className="w-[90%] mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none disabled:bg-teal-500"
//                 >
//                   {isVerifyingOtp ? "Verifying..." : "Login"}
//                 </button>

//                 {/* Redirect to Register */}
//                 <p className="text-center text-sm text-gray-600 mt-4">
//                   Don't have an account?{" "}
//                   <Link
//                     to={"/register"}
//                     className="text-teal-600 hover:text-teal-500 font-medium"
//                   >
//                     Sign up
//                   </Link>
//                 </p>
//               </form>

//               <div>
//                 <button
//                   type="button"
//                   className="w-[50%] mx-auto flex items-center justify-center gap-2 border mt-10 border-black hover:bg-teal-700 text-black font-medium py-3 px-4 rounded-md focus:outline-none disabled:bg-teal-500"
//                 >
//                   <img
//                     src="icons/google.png"
//                     alt="Google"
//                     className="w-6 h-6"
//                   />
//                   <span>Google</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Login;