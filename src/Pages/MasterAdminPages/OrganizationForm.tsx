import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import countries from "world-countries";

interface FormData {
  name: string;
  organization: string;
  Industry_Sector: string;
  Tax_ID: string;
  Address: string;
  Country: { label: string; value: string } | null;
  Postal_Code: string;
  Date_of_Incorporation?: string;
}

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
}));

const OrganizationForm: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("token");

    const payload = {
      name: data.name,
      organization_type: data.organization,
      industry_sector: data.Industry_Sector,
      registration_tax_id: data.Tax_ID,
      address: data.Address,
      country: data.Country?.label || "",
      zip_postal_code: data.Postal_Code,
    };
    console.log(payload);

    try {
      const response = await axios.post(
        "http://192.168.29.82:8000/api/v1/tenant",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Organization registered successfully.");
        setIsPopupOpen(true);
      } else {
        alert("Failed to register organization.");
      }
    } catch (error: any) {
      console.error("API Error:", error);
      alert(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center">
      <div className="flex-1 w-full max-w-3xl px-0">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full mx-auto my-10">
          <h2 className="text-3xl font-medium text-gray-800 text-center mb-8">
            Organization Details Form
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  {...register("organization", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter organization name"
                />
                {errors.organization && (
                  <p className="text-red-500 text-sm">
                    {errors.organization.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Sector
                </label>
                <input
                  {...register("Industry_Sector", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Industry_Sector Name"
                />
                {errors.Industry_Sector && (
                  <p className="text-red-500 text-sm">
                    {errors.Industry_Sector.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Incorporation
                </label>
                <input
                  type="date"
                  {...register("Date_of_Incorporation")}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Date of incorportation"
             />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration / Tax ID
                </label>
                <input
                  {...register("Tax_ID", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
               placeholder="Tax ID"
              />
                {errors.Tax_ID && (
                  <p className="text-red-500 text-sm">
                    {errors.Tax_ID.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  {...register("Address", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Address.."
             />
                {errors.Address && (
                  <p className="text-red-500 text-sm">
                    {errors.Address.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <Controller
                  control={control}
                  name="Country"
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    // <Select
                    //   {...field}
                    //   options={countryOptions}
                    //   placeholder="Select a country"
                    //   isClearable
                    //   classNames={{
                    //     control: () =>
                    //       "w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500",
                    //     menu: () =>
                    //       "bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-50",
                    //     option: ({ isFocused, isSelected }) =>
                    //       `px-4 py-2 text-sm cursor-pointer ${
                    //         isSelected
                    //           ? "bg-teal-600 text-white"
                    //           : isFocused
                    //           ? "bg-gray-100"
                    //           : ""
                    //       }`,
                    //     singleValue: () => "text-sm",
                    //     placeholder: () => "text-sm text-gray-500",
                    //   }}
                    <Select
                      {...field}
                      options={countryOptions}
                      placeholder="Select a country"
                      isClearable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#e5e7eb", // Tailwind gray-200
                          borderColor: state.isFocused ? "#14b8a6" : "#e5e7eb", // Tailwind teal-500 or gray-200
                          boxShadow: state.isFocused
                            ? "0 0 0 2px rgba(13, 148, 136, 0.4)"
                            : "none",
                          padding: "0.25rem 0.5rem",
                          minHeight: "3.5rem", // match py-4
                          borderRadius: "0.375rem", // rounded-md
                        }),
                        placeholder: (base) => ({
                          ...base,
                          fontSize: "0.875rem",
                          color: "#6b7280", // Tailwind gray-500
                        }),
                        singleValue: (base) => ({
                          ...base,
                          fontSize: "0.875rem",
                        }),
                        menu: (base) => ({
                          ...base,
                          zIndex: 50,
                        }),
                        option: (base, state) => ({
                          ...base,
                          fontSize: "0.875rem",
                          backgroundColor: state.isSelected
                            ? "#0d9488" // teal-600
                            : state.isFocused
                            ? "#f3f4f6" // gray-100
                            : "#ffffff",
                          color: state.isSelected ? "#ffffff" : "#111827", // white or gray-900
                          cursor: "pointer",
                        }),
                      }}
                    />
                  )}
                />
                {errors.Country && (
                  <p className="text-red-500 text-sm">
                    {errors.Country.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip/Postal Code
                </label>
                <input
                  type="text"
                  {...register("Postal_Code", {
                    required: "Zip code is required",
                    pattern: {
                      value: /^\d{5}(-\d{4})?$/, // US ZIP or ZIP+4 format
                      message: "Invalid zip code format",
                    },
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 12345 or 12345-6789"
                />
                {errors.Postal_Code && (
                  <p className="text-red-500 text-sm">
                    {errors.Postal_Code.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-8 pb-4">
              <button
                type="submit"
                className="w-full sm:w-3/5 mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-md transition duration-300 text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;
