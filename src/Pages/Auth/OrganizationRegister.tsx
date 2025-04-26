


import React, { useState, ChangeEvent, MouseEvent } from "react";
import OtpVerificationPopup from "./OtpVerificationPopup";
import MainLayout from "../../Layout/mainLayout";

interface RegisterFormProps {
  email?: string;
}

const OrganizationRegister: React.FC<RegisterFormProps> = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerify = (otpValue: string) => {
    console.log("Verifying OTP:", otpValue);
   
    setTimeout(() => {
      setIsVerified(true);
      setIsPopupOpen(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsPopupOpen(true);
  };

  const handleEmailVerify = async () => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const email = emailInput?.value;

    if (!email) {
      alert("Please enter an email first.");
      return;
    }

    try {
      const response = await fetch(
        `https://c697-2405-201-37-21d9-dc08-b022-5060-b783.ngrok-free.app/api/auth/v1/pre-register/email-verification?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.msg || "OTP sent to your email.");
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <MainLayout>
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-2"
      style={{ backgroundImage: "url('background/background.png')" }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 w-full max-w-7xl px-6 py-0">
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
          {/* RegisterForm Component */}
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl mx-auto my-20">
            <h2 className="text-3xl font-medium text-gray-800 text-center mb-8">
            Registration Form
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
         

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                   Organization Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    // required
                  />
                </div>

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
                    name="organization"
                    placeholder="xyz"
                    className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    // required
                  />
                </div>

                <div>
                  <label
                    htmlFor="Industry_Sector"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                   Industry Sector
                  </label>
                  <input
                    type="text"
                    id="Industry_Sector"
                    name="Industry_Sector"
                    placeholder="xyz"
                    className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Date_of_Incorporation"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                  Date of Incorporation
                  </label>
                  <div className="relative">
                    <input
                      type="Date_of_Incorporation"
                      id="Date_of_Incorporation"
                      name="Date_of_Incorporation"
                      placeholder=""
                      className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      // required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Tax_ID"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                   Registraion / Tax ID 
                  </label>
                  <div className="relative">
                    <input
                      type="Tax_ID"
                      id="Tax_ID"
                      name="Tax_ID"
                      placeholder=""
                      className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      // required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="Address"
                      id="Address"
                      name="Address"
                      placeholder=""
                      className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      // required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Country 
                  </label>
                  <div className="relative">
                    <input
                      type="Country"
                      id="Country"
                      name="Country"
                      placeholder=""
                      className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      // required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Postal_Code"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Zip/Postal Code
                  </label>
                  <div className="relative">
                    <input
                      type="Postal_Code"
                      id="Postal_Code"
                      name="Postal_Code"
                      placeholder=""
                      className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      // required
                    />
                  </div>
                </div>

              </div>

              <div className="pt-8 pb-4">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  type="submit"
                  className="w-[55%] mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none transition duration-300 text-lg"
                >
                  Submit
                </button>
              </div>
              <OtpVerificationPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                email="support@gmail.com"
                onVerify={handleVerify}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default OrganizationRegister;
