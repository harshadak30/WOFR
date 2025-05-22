import React, { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainLayout from "../../component/Layout/MainLayout";
import backgroundImages from "../../../public/background";
import { useRegister } from "../../hooks/useRegistration";
import OTPVerificationPopup from "./OTPVerificationPopup";
// Import for future international phone number implementation
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface RegistrationProps {
  email?: string;
}

const Registration: React.FC<RegistrationProps> = () => {
  const {
    isVerifyingEmail,
    isEmailVerified,
    isOtpVerified,
    isOtpModalVisible,
    isPasswordVisible,
    isConfirmPasswordVisible,
    form,
    setValue,
    verifyEmail,
    handleRegistrationSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    setIsOtpModalVisible,
    setIsOtpVerified,
  } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form;

  // Preload background image to prevent slow loading
  useEffect(() => {
    const img = new Image();
    img.src = "/background/landingHeroImage.png";
  }, []);

  useEffect(() => {
    register("phoneNumber", {
      required: "Phone number is required",
      pattern: {
        value: /^[+]?[0-9]{10,15}$/,
        message: "Please enter a valid phone number",
      },
    });
  }, [register]);

  // Common error message component for consistency
  const ErrorMessage = ({ message }: { message?: string }) => {
    return message ? (
      <p className="mt-1 text-xs text-red-500">{message}</p>
    ) : null;
  };

  return (
    <MainLayout>
      <div
        className="bg-[url('/background/landingHeroImage.png')] bg-cover bg-center flex items-center justify-center px-4 min-h-screen"
        style={{
          backgroundImage: 'url("/background/landingHeroImage.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-8 w-full max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
          {/* Left side - Branding */}
          <div className="flex-1 flex flex-col items-center lg:items-start space-y-6 md:space-y-8 mb-6 lg:mb-0 w-full">
            <div className="w-full flex justify-center lg:justify-start">
              <img
                src={backgroundImages.companyLogo}
                alt="Logo"
                className="w-32 md:w-40 mb-2 md:mb-4"
                loading="eager" // Prioritize loading
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
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-3xl mx-auto my-6 sm:my-8 lg:my-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 text-center mb-4 sm:mb-6 lg:mb-8">
                Register Your Account
              </h2>

              <form
                className="space-y-4 sm:space-y-6"
                onSubmit={handleSubmit(handleRegistrationSubmit)}
                noValidate
              >
                {/* Email Field with Verification */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
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
                      className={`px-4 py-2 sm:py-0 sm:w-2/5 w-full ${
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
                  <ErrorMessage message={errors.email?.message} />
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
                  <ErrorMessage message={errors.name?.message} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Phone Number Field */}
                  {/* <div>
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
                    <ErrorMessage message={errors.phoneNumber?.message} />

                    {/* International Phone Input - Commented for future implementation
                    <PhoneInput
                      country={'in'}
                      value={''}
                      onChange={phone => console.log(phone)}
                      inputClass={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border ${
                        errors.phoneNumber ? "border-red-500" : "border-gray-200"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      containerClass="w-full"
                      inputProps={{
                        name: 'phoneNumber',
                        required: true,
                        autoFocus: false,
                      }}
                    />
                    */}
                  {/* </div> */}
                  {/* Phone Number Field using PhoneInput */}
                  <div className="">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full h-[72px]">
                    <PhoneInput
                      country={"in"}
                      value={getValues("phoneNumber")}
                      placeholder="Phone number"
                      onChange={(phone) => setValue("phoneNumber", phone)}
                      inputProps={{
                        name: "phoneNumber",
                        required: true,
                      }}
               
                      inputClass={`w-full !bg-gray-200 !px-4 !py-4 !border ${
                        errors.phoneNumber
                          ? "!border-red-500"
                          : "!border-gray-200"
                      } !rounded-md !focus:outline-none`}
                      containerClass="w-full"
                      inputStyle={{ width: "100%" , height:"110%" }}
                    />
</div>
                    <ErrorMessage message={errors.phoneNumber?.message} />
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
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      {...register("organization")}
                    />
                    {/* No error message for optional field */}
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
                        aria-label={
                          isPasswordVisible ? "Hide password" : "Show password"
                        }
                      >
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage message={errors.password?.message} />
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
                            value === getValues("password") ||
                            "Passwords do not match",
                        })}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={toggleConfirmPasswordVisibility}
                        aria-label={
                          isConfirmPasswordVisible
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage message={errors.confirmPassword?.message} />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 sm:pt-6 lg:pt-8 pb-2 sm:pb-4">
                  <button
                    type="submit"
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
      <OTPVerificationPopup
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
