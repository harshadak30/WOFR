import React, { useState, useEffect, useRef } from "react";

interface OtpVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (otp: string) => void;
}

const OtpVerificationPopup: React.FC<OtpVerificationPopupProps> = ({
  isOpen,
  onClose,
  email,
  onVerify,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isResendActive, setIsResendActive] = useState<boolean>(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsResendActive(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleChange = (index: number, value: string): void => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleResend = (): void => {
    if (!isResendActive) return;

    setTimeLeft(60);
    setIsResendActive(false);
    setOtp(["", "", "", ""]);

    console.log("Resending OTP to", email);
  };

  const handleSubmit = (): void => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      onVerify(otpValue);
    }
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 mb-4 flex items-center justify-center">
            <img
              src="background/OTPverfication.gif"
              alt="Email verification"
              className="w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Email Verification
          </h2>
          <p className="text-[#AAADB2] text-center mt-2">
            We have sent a verification code to
          </p>
          <p className="font-medium text-gray-800">{email}</p>
        </div>

        <div className="flex justify-center space-x-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className=" w-1/2 block mx-auto bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-2xl focus:outline-none transition duration-300 text-lg mb-4"
        >
          Submit
        </button>

        <div className="text-center">
          <button
            onClick={handleResend}
            className={`text-[#3474fd] font-bold ${!isResendActive && "opacity-50 cursor-not-allowed"}`}
            disabled={!isResendActive}
          >
            Resend OTP
          </button>
          {!isResendActive && (
            <p className="text-sm text-gray-500 mt-1">
              Resend available in {timeLeft} seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPopup;
