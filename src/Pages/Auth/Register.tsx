import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import OtpVerificationPopup from "./OtpVerificationPopup";
import apiClient from "../../helper/axios";
import MainLayout from "../../Layout/MainLayout";
import backgroundImages from "../../../public/background";

interface RegistrationFormData {
  email: string;
  name: string;
  phoneNumber: string;
  organization: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationProps {
  email?: string;
}

const Registration: React.FC<RegistrationProps> = () => {
  const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<RegistrationFormData>({
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      organization: "",
      password: "",
      confirmPassword: "",
    },
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
    const email = getValues("email");

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
      displayNotification(
        "error",
        error?.response?.data?.detail || "Failed to send OTP"
      );
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const submitRegistration = async () => {
    try {
      const formData = getValues();

      const formDataUrlEncoded = new URLSearchParams();
      formDataUrlEncoded.append("user_name", formData.name);
      formDataUrlEncoded.append("user_email", formData.email);
      formDataUrlEncoded.append("phone", formData.phoneNumber);
      formDataUrlEncoded.append("organization_name", formData.organization);
      formDataUrlEncoded.append("user_password", formData.password);
      formDataUrlEncoded.append("confirm_password", formData.confirmPassword);

      await apiClient.post(
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
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      displayNotification(
        "error",
        error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  const onSubmit: SubmitHandler<RegistrationFormData> = () => {
    if (!isEmailVerified) {
      displayNotification("warning", "Please verify your email first");
      return;
    }

    submitRegistration();
  };

  const handleRegistrationSubmit = () => {
    if (!isEmailVerified) {
      displayNotification("warning", "Please verify your email first");
      return;
    }

    submitRegistration();
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <MainLayout>
      <div
        className=" bg-cover bg-center flex items-center justify-center px-4 py-8 sm:py-12"
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

          {/* Right Column - Registration Form */}
          <div className="flex-1 w-full max-w-3xl">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-3xl mx-auto my-8 sm:my-12 lg:my-20">
              <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 text-center mb-6 sm:mb-8">
                Register Your Account
              </h2>

              <form
                className="space-y-4 sm:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Email Field with Verification */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row">
                    <input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } ${
                        isEmailVerified
                          ? "rounded-t-md sm:rounded-t-none sm:rounded-l-md"
                          : "rounded-t-md sm:rounded-l-md"
                      } focus:outline-none focus:ring-2 focus:ring-teal-500`}
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
                      onClick={verifyEmail}
                      disabled={isVerifyingEmail || isEmailVerified}
                      className={`px-4 py-2 sm:w-2/5 w-full ${
                        isEmailVerified
                          ? "bg-green-600"
                          : isVerifyingEmail
                          ? "bg-gray-500"
                          : "bg-teal-600 hover:bg-teal-700"
                      } text-white ${
                        isEmailVerified
                          ? "rounded-b-md sm:rounded-b-none sm:rounded-r-md"
                          : "rounded-b-md sm:rounded-r-md"
                      } transition`}
                    >
                      {isVerifyingEmail
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
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
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

   
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
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
                      // disabled
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        placeholder="******"
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
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
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
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
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="******"
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
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
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 sm:pt-8 pb-2 sm:pb-4">
                  <button
                    type="button"
                    onClick={handleRegistrationSubmit}
                    className={`w-full sm:w-[70%] mx-auto block ${
                      isEmailVerified && isOtpVerified
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "bg-gray-400"
                    } text-white font-medium py-2 px-6 rounded-md focus:outline-none transition duration-300 text-base sm:text-lg`}
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
        isOpen={isOtpModalVisible}
        onClose={() => setIsOtpModalVisible(false)}
        email={getValues("email")}
        onVerify={() => {
          setIsOtpVerified(true);
          setIsOtpModalVisible(false);
        }}
      />
    </MainLayout>
  );
};

export default Registration;

// import React, { useState } from "react";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

// import OtpVerificationPopup from "./OtpVerificationPopup";
// import apiClient from "../../helper/axios";
// import MainLayout from "../../Layout/MainLayout";
// import backgroundImages from "../../../public/background";

// interface RegistrationFormData {
//   email: string;
//   name: string;
//   phoneNumber: string;
//   organization: string;
//   password: string;
//   confirmPassword: string;
// }

// interface RegistrationProps {
//   email?: string;
// }

// const Registration: React.FC<RegistrationProps> = () => {
//   const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);
//   const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
//   const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
//   const [isOtpModalVisible, setIsOtpModalVisible] = useState<boolean>(false);
//   const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
//   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
//     useState<boolean>(false);

//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     control,
//     formState: { errors },
//     getValues,
//   } = useForm<RegistrationFormData>({
//     defaultValues: {
//       email: "",
//       name: "",
//       phoneNumber: "",
//       organization: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const displayNotification = (
//     type: "success" | "error" | "warning" | "info",
//     message: string
//   ) => {
//     const Toast = Swal.mixin({
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.addEventListener("mouseenter", Swal.stopTimer);
//         toast.addEventListener("mouseleave", Swal.resumeTimer);
//       },
//     });

//     Toast.fire({
//       icon: type,
//       title: message,
//     });
//   };

//   const verifyEmail = async () => {
//     const email = getValues("email");

//     if (!email) {
//       displayNotification("error", "Please enter a valid email first");
//       return;
//     }

//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     if (!emailRegex.test(email)) {
//       displayNotification("error", "Invalid email format");
//       return;
//     }

//     setIsVerifyingEmail(true);

//     try {
//       const response = await apiClient.post(
//         `/api/auth/v1/pre-register/email-verification?email=${encodeURIComponent(
//           email
//         )}`,
//         null,
//         {
//           headers: {
//             accept: "application/json",
//           },
//         }
//       );

//       setIsEmailVerified(true);
//       setIsOtpModalVisible(true);
//       displayNotification(
//         "success",
//         response.data.msg || "OTP sent to your email"
//       );
//     } catch (error: any) {
//       console.error("Email verification error:", error);
//       displayNotification(
//         "error",
//         error?.response?.data?.detail || "Failed to send OTP"
//       );
//     } finally {
//       setIsVerifyingEmail(false);
//     }
//   };

//   const submitRegistration = async () => {
//     try {
//       const formData = getValues();

//       const formDataUrlEncoded = new URLSearchParams();
//       formDataUrlEncoded.append("user_name", formData.name);
//       formDataUrlEncoded.append("user_email", formData.email);
//       formDataUrlEncoded.append("phone", formData.phoneNumber);
//       formDataUrlEncoded.append("organization_name", formData.organization);
//       formDataUrlEncoded.append("user_password", formData.password);
//       formDataUrlEncoded.append("confirm_password", formData.confirmPassword);

//       await apiClient.post(
//         "/api/auth/v1/register",
//         formDataUrlEncoded.toString(),
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             accept: "application/json",
//           },
//         }
//       );

//       displayNotification(
//         "success",
//         "Registration Successful! You can now login to your account"
//       );
//       navigate("/login");
//     } catch (error: any) {
//       console.error("Registration error:", error);
//       displayNotification(
//         "error",
//         error?.response?.data?.detail ||
//           error?.response?.data?.message ||
//           "Registration failed"
//       );
//     }
//   };

//   const onSubmit: SubmitHandler<RegistrationFormData> = () => {
//     if (!isEmailVerified) {
//       displayNotification("warning", "Please verify your email first");
//       return;
//     }

//     submitRegistration();
//   };

//   const handleRegistrationSubmit = () => {
//     if (!isEmailVerified) {
//       displayNotification("warning", "Please verify your email first");
//       return;
//     }

//     submitRegistration();
//   };

//   const togglePasswordVisibility = () =>
//     setIsPasswordVisible(!isPasswordVisible);
//   const toggleConfirmPasswordVisibility = () =>
//     setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

//   return (
//     <MainLayout>
//       <div
//         className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8 sm:py-12"
//         style={{ backgroundImage: "url('background/landingHeroImage.png')" }}
//       >
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-8 w-full max-w-7xl px-4 sm:px-6">
//           {/* Left side - Branding */}
//           <div className="flex-1 flex flex-col items-center lg:items-start space-y-6 md:space-y-8 mb-6 lg:mb-0 w-full">
//             <div className="w-full flex justify-center lg:justify-start">
//               <img
//                 src={backgroundImages.companyLogo}
//                 alt="Logo"
//                 className="w-32 md:w-40 mb-2 md:mb-4"
//               />
//             </div>
//             <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-white font-bold leading-tight text-center lg:text-left">
//               Secure Your Financial
//               <br />
//               Future Today
//             </h1>
//             <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed tracking-wide max-w-xl text-center lg:text-left">
//               Access your portfolio, track investments, and manage your wealth
//               with our advanced financial platform.
//             </p>
//           </div>

//           {/* Right Column - Registration Form */}
//           <div className="flex-1 w-full max-w-3xl">
//             <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-3xl mx-auto my-8 sm:my-12 lg:my-20">
//               <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 text-center mb-6 sm:mb-8">
//                 Register Your Account
//               </h2>

//               <form
//                 className="space-y-4 sm:space-y-6"
//                 onSubmit={handleSubmit(onSubmit)}
//               >
//                 {/* Email Field with Verification */}
//                 <div className="relative">
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Email ID <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex flex-col sm:flex-row">
//                     <input
//                       type="email"
//                       id="email"
//                       placeholder="example@gmail.com"
//                       className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
//                         errors.email ? "border-red-500" : "border-gray-200"
//                       } ${
//                         isEmailVerified
//                           ? "rounded-t-md sm:rounded-t-none sm:rounded-l-md"
//                           : "rounded-t-md sm:rounded-l-md"
//                       } focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                       disabled={isEmailVerified}
//                       {...register("email", {
//                         required: "Email is required",
//                         pattern: {
//                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                           message: "Invalid email address",
//                         },
//                       })}
//                     />
//                     <button
//                       type="button"
//                       onClick={verifyEmail}
//                       disabled={isVerifyingEmail || isEmailVerified}
//                       className={`px-4 py-2 sm:w-2/5 w-full ${
//                         isEmailVerified
//                           ? "bg-green-600"
//                           : isVerifyingEmail
//                           ? "bg-gray-500"
//                           : "bg-teal-600 hover:bg-teal-700"
//                       } text-white ${
//                         isEmailVerified
//                           ? "rounded-b-md sm:rounded-b-none sm:rounded-r-md"
//                           : "rounded-b-md sm:rounded-r-md"
//                       } transition`}
//                     >
//                       {isVerifyingEmail
//                         ? "Verifying..."
//                         : isEmailVerified
//                         ? "Verified"
//                         : "Verify"}
//                     </button>
//                   </div>
//                   {errors.email && (
//                     <p className="mt-1 text-xs text-red-500">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Name Field */}
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     placeholder="Enter your name"
//                     className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
//                       errors.name ? "border-red-500" : "border-gray-200"
//                     } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                     {...register("name", {
//                       required: "Name is required",
//                       minLength: {
//                         value: 2,
//                         message: "Name must be at least 2 characters long",
//                       },
//                     })}
//                   />
//                   {errors.name && (
//                     <p className="mt-1 text-xs text-red-500">
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </div>

   
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                   {/* Phone Number Field with react-phone-number-input */}
//                   <div>
//                     <label
//                       htmlFor="phoneNumber"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <Controller
//                       name="phoneNumber"
//                       control={control}
//                       rules={{
//                         required: "Phone number is required",
//                         validate: (value) => {
//                           return value && value.length >= 6 || "Please enter a valid phone number";
//                         }
//                       }}
//                       render={({ field }) => (
//                         <PhoneInput
//                           international
//                           defaultCountry="IN"
//                           value={field.value}
//                           onChange={field.onChange}
//                           className={`w-full bg-gray-200 border ${
//                             errors.phoneNumber ? "border-red-500" : "border-gray-200"
//                           } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                           inputComponent={(props) => (
//                             <input
//                               {...props}
//                               className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border-0 focus:outline-none"
//                               placeholder="+917768423612"
//                             />
//                           )}
//                         />
//                       )}
//                     />
//                     {errors.phoneNumber && (
//                       <p className="mt-1 text-xs text-red-500">
//                         {errors.phoneNumber.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Organization Field */}
//                   <div>
//                     <label
//                       htmlFor="organization"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Organization
//                     </label>
//                     <input
//                       type="text"
//                       id="organization"
//                       placeholder="xyz"
//                       className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       {...register("organization")}
//                     />
//                   </div>

//                   {/* Password Field */}
//                   <div>
//                     <label
//                       htmlFor="password"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Password <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={isPasswordVisible ? "text" : "password"}
//                         id="password"
//                         placeholder="******"
//                         className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
//                           errors.password ? "border-red-500" : "border-gray-200"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                         {...register("password", {
//                           required: "Password is required",
//                           minLength: {
//                             value: 8,
//                             message:
//                               "Password must be at least 8 characters long",
//                           },
//                           pattern: {
//                             value:
//                               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                             message:
//                               "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
//                           },
//                         })}
//                       />
//                       <button
//                         type="button"
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                         onClick={togglePasswordVisibility}
//                       >
//                         {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//                       </button>
//                     </div>
//                     {errors.password && (
//                       <p className="mt-1 text-xs text-red-500">
//                         {errors.password.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Confirm Password Field */}
//                   <div>
//                     <label
//                       htmlFor="confirmPassword"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Confirm Password <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={isConfirmPasswordVisible ? "text" : "password"}
//                         id="confirmPassword"
//                         placeholder="******"
//                         className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
//                           errors.confirmPassword
//                             ? "border-red-500"
//                             : "border-gray-200"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                         {...register("confirmPassword", {
//                           required: "Please confirm your password",
//                           validate: (value) =>
//                             value === watch("password") ||
//                             "Passwords do not match",
//                         })}
//                       />
//                       <button
//                         type="button"
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                         onClick={toggleConfirmPasswordVisibility}
//                       >
//                         {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//                       </button>
//                     </div>
//                     {errors.confirmPassword && (
//                       <p className="mt-1 text-xs text-red-500">
//                         {errors.confirmPassword.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-6 sm:pt-8 pb-2 sm:pb-4">
//                   <button
//                     type="button"
//                     onClick={handleRegistrationSubmit}
//                     className={`w-full sm:w-[70%] mx-auto block ${
//                       isEmailVerified && isOtpVerified
//                         ? "bg-teal-600 hover:bg-teal-700"
//                         : "bg-gray-400"
//                     } text-white font-medium py-2 px-6 rounded-md focus:outline-none transition duration-300 text-base sm:text-lg`}
//                     disabled={!isEmailVerified || !isOtpVerified}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* OTP Verification Popup */}
//       <OtpVerificationPopup
//         isOpen={isOtpModalVisible}
//         onClose={() => setIsOtpModalVisible(false)}
//         email={getValues("email")}
//         onVerify={() => {
//           setIsOtpVerified(true);
//           setIsOtpModalVisible(false);
//         }}
//       />
//     </MainLayout>
//   );
// };

// export default Registration;