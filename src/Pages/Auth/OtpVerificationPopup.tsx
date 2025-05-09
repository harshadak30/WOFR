// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import apiClient from "../../helper/axios";
// import backgroundImages from "../../../public/background";

// interface OtpVerificationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   email: string;
//   onVerify: (otp: string) => void;
// }

// const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
//   isOpen,
//   onClose,
//   email,
//   onVerify,
// }) => {
//   // State management
//   const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
//   const [remainingTime, setRemainingTime] = useState<number>(60);
//   const [canResendOtp, setCanResendOtp] = useState<boolean>(false);

//   // Input refs for focus management
//   const otpInputRefs = [
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//   ];

//   const { handleSubmit } = useForm();

//   // Timer effect for OTP countdown
//   useEffect(() => {
//     if (!isOpen) return;

//     const countdownTimer = setInterval(() => {
//       setRemainingTime((prevTime) => {
//         if (prevTime <= 1) {
//           setCanResendOtp(true);
//           clearInterval(countdownTimer);
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(countdownTimer);
//   }, [isOpen]);

//   // Handle OTP input changes
//   const handleOtpChange = (index: number, value: string): void => {
//     // Ensure only one digit is processed
//     if (value.length > 1) {
//       value = value.slice(0, 1);
//     }

//     // Update OTP state
//     const updatedOtpDigits = [...otpDigits];
//     updatedOtpDigits[index] = value;
//     setOtpDigits(updatedOtpDigits);

//     // Auto-focus next input if value is entered
//     if (value !== "" && index < 3) {
//       otpInputRefs[index + 1]?.current?.focus();
//     }
//   };

//   // Handle keyboard navigation between OTP inputs
//   const handleOtpKeyDown = (
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ): void => {
//     if (e.key === "Backspace" && otpDigits[index] === "" && index > 0) {
//       otpInputRefs[index - 1]?.current?.focus();
//     }
//   };

//   // Toast notification helper
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

//   // Handle OTP resend
//   const handleOtpResend = async (): Promise<void> => {
//     if (!canResendOtp) return;

//     try {
//       await apiClient.post(
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

//       displayNotification("success", "OTP resent successfully");
//       setRemainingTime(60);
//       setCanResendOtp(false);
//       setOtpDigits(["", "", "", ""]);
//     } catch (error: any) {
//       displayNotification(
//         "error",
//         error?.response?.data?.detail || "Failed to resend OTP"
//       );
//     }
//   };

//   // OTP submission handler
//   const submitOtpVerification = async () => {
//     const otpValue = otpDigits.join("");

//     if (otpValue.length < 4) {
//       displayNotification("error", "Please enter all 4 digits of the OTP");
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         "/api/auth/v1/pre-register/verify-otp",
//         {
//           email,
//           otp_code: otpValue,
//         },
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         displayNotification("success", "Email has been successfully verified.");
//         onVerify(otpValue);
//         onClose();
//       }
//     } catch (error: any) {
//       displayNotification(
//         "error",
//         error?.response?.data?.detail || "Something went wrong. Try again."
//       );
//     }
//   };

//   // Early return if modal is not open
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50 px-4 py-6">
//       <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600"
//           aria-label="Close"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 sm:h-6 sm:w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         {/* Modal content */}
//         <div className="flex flex-col items-center mb-4 sm:mb-6">
//           <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 flex items-center justify-center">
//             <img
//               src={backgroundImages.otpVerification}
//               alt="Email verification"
//               className="w-16 h-16 sm:w-20 sm:h-20"
//             />
//           </div>
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
//             Email Verification
//           </h2>
//           <p className="text-sm sm:text-base text-[#AAADB2] text-center mt-1 sm:mt-2">
//             We have sent a verification code to
//           </p>
//           <p className="text-sm sm:text-base font-medium text-gray-800">
//             {email}
//           </p>
//         </div>

//         {/* OTP form */}
//         <form onSubmit={handleSubmit(submitOtpVerification)}>
//           <div className="flex justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
//             {otpDigits.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={otpInputRefs[index]}
//                 type="text"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                 onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                 className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 aria-label={`OTP digit ${index + 1}`}
//               />
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="w-full sm:w-1/2 block mx-auto bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl focus:outline-none transition duration-300 text-base sm:text-lg mb-3 sm:mb-4"
//           >
//             Submit
//           </button>
//         </form>

//         {/* Resend OTP section */}
//         <div className="text-center">
//           <button
//             onClick={handleOtpResend}
//             className={`text-[#3474fd] font-bold text-sm sm:text-base ${
//               !canResendOtp && "opacity-50 cursor-not-allowed"
//             }`}
//             disabled={!canResendOtp}
//           >
//             Resend OTP
//           </button>
//           {!canResendOtp && (
//             <p className="text-xs sm:text-sm text-gray-500 mt-1">
//               Resend available in {remainingTime} seconds
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerificationModal;


import React from "react";
import backgroundImages from "../../../public/background";
import { useOtp } from "../../hooks/useOtp";

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (otp: string) => void;
}

const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  onClose,
  email,
  onVerify,
}) => {
  const {
    otpDigits,
    remainingTime,
    canResendOtp,
    otpInputRefs,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpResend,
    submitOtpVerification
  } = useOtp(isOpen);

  // Early return if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50 px-4 py-6">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 flex items-center justify-center">
            <img
              src={backgroundImages.otpVerification}
              alt="Email verification"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
            Email Verification
          </h2>
          <p className="text-sm sm:text-base text-[#AAADB2] text-center mt-1 sm:mt-2">
            We have sent a verification code to
          </p>
          <p className="text-sm sm:text-base font-medium text-gray-800">
            {email}
          </p>
        </div>

        {/* OTP form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          submitOtpVerification(email, onVerify);
        }}>
          <div className="flex justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={otpInputRefs[index]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full sm:w-1/2 block mx-auto bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl focus:outline-none transition duration-300 text-base sm:text-lg mb-3 sm:mb-4"
          >
            Submit
          </button>
        </form>

        {/* Resend OTP section */}
        <div className="text-center">
          <button
            onClick={() => handleOtpResend(email)}
            className={`text-[#3474fd] font-bold text-sm sm:text-base ${
              !canResendOtp && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canResendOtp}
          >
            Resend OTP
          </button>
          {!canResendOtp && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Resend available in {remainingTime} seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;

