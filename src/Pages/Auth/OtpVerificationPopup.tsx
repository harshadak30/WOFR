import React from "react";
import backgroundImages from "../../../public/background";
import { useOTP } from "../../hooks/useOTP";

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (otp: string) => void;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
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
    submitOtpVerification,
  } = useOTP(isOpen);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitOtpVerification(email, onVerify);
          }}
        >
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

export default OTPVerificationModal;
