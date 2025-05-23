import React, { useState } from "react";
import { LeaseFormData } from "../../types";

interface LeaseTermsProps {
  formData: LeaseFormData;
  updateFormData: (data: Partial<LeaseFormData>) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const LeaseTerms: React.FC<LeaseTermsProps> = ({
  formData,
  updateFormData,
  onPrevious,
  onNext,
}) => {
  const [showCashflowDetails, setShowCashflowDetails] = useState(
    formData.hasCashflow || false
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === "hasCashflow") {
      setShowCashflowDetails(checked);
    }

    updateFormData({ [name]: checked });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    unit: "years" | "months" | "days"
  ) => {
    const value = parseInt(e.target.value) || 0;
    updateFormData({
      duration: {
        ...formData.duration,
        [unit]: value,
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Lease Terms</h2>

      <div className="grid gap-6 p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="propertyId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class
            </label>
            <input
              type="text"
              id="propertyId"
              name="propertyId"
              className="w-full rounded-md border border-gray-300 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Class"
              value={formData.propertyId || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="propertyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lease ID
            </label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              className="w-full rounded-md border border-gray-300 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ente Lease ID"
              value={formData.propertyName || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-8 p-2">
          <div className="flex items-center">
            <input
              id="isShortTerm"
              name="isShortTerm"
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.isShortTerm || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="isShortTerm" className="ml-2 text-sm text-gray-700">
              Short Term Lease
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="isLowValue"
              name="isLowValue"
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.isLowValue || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="isLowValue" className="ml-2 text-sm text-gray-700">
              Low Value Lease
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 ">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lease Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.startDate || ""}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lease End Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.endDate || ""}
                onChange={handleDateChange}
              />
              {/* <Calendar className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" /> */}
            </div>
          </div>
          {/*           
          <div>
            <label htmlFor="terminationDate" className="block text-sm font-medium text-gray-700 mb-1">
              Termination Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="terminationDate"
                name="terminationDate"
                className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.terminationDate || ''}
                onChange={handleDateChange}
              />
              <Calendar className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div> */}
        </div>

        <div className=" border border-gray-200 rounded-md bg-gray-50 p-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lease Duration
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="years"
                className="block text-sm text-gray-500 mb-1"
              >
                Years
              </label>
              <input
                type="number"
                id="years"
                min="0"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.duration?.years || 0}
                onChange={(e) => handleDurationChange(e, "years")}
              />
            </div>

            <div>
              <label
                htmlFor="months"
                className="block text-sm text-gray-500 mb-1"
              >
                Months
              </label>
              <input
                type="number"
                id="months"
                min="0"
                max="11"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.duration?.months || 0}
                onChange={(e) => handleDurationChange(e, "months")}
              />
            </div>

            <div>
              <label
                htmlFor="days"
                className="block text-sm text-gray-500 mb-1"
              >
                Days
              </label>
              <input
                type="number"
                id="days"
                min="0"
                max="30"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.duration?.days || 0}
                onChange={(e) => handleDurationChange(e, "days")}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Duration is automatically calculated based on start and end dates
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <input
              id="hasCashflow"
              name="hasCashflow"
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.hasCashflow || false}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="hasCashflow"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              custom Cashflow
            </label>
          </div>

          {showCashflowDetails && (
            <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 animate-fadeIn">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  cash Flow Import
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <label htmlFor="cashflowType" className="block text-sm text-gray-600 mb-1">
                    Type
                  </label>
                  <select
                    id="cashflowType"
                    name="cashflowType"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.cashflowType || ''}
                    onChange={(e) => updateFormData({ cashflowType: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    <option value="fixed">Fixed</option>
                    <option value="variable">Variable</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div> */}
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Lease Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.startDate || ""}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cashflowAmount"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="cashflowAmount"
                      name="cashflowAmount"
                      className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      value={formData.cashflowAmount || ""}
                      onChange={(e) =>
                        updateFormData({ cashflowAmount: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onNext}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaseTerms;
