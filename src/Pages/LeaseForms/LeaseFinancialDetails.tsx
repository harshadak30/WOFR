import React from "react";
import { LeaseFormData } from "../../types";

interface LeaseFinancialDetailsProps {
  formData: LeaseFormData;
  updateFormData: (data: Partial<LeaseFormData>) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const LeaseFinancialDetails: React.FC<LeaseFinancialDetailsProps> = ({
  formData,
  updateFormData,
  onPrevious,
  onNext,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Financial Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label
              htmlFor="annualPayment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Annual Lease Payment
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="annualPayment"
                name="annualPayment"
                className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                step="0.01"
                value={formData.annualPayment || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="incrementalBorrowingRate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Incremental Borrowing Rate
            </label>
            <div className="relative">
              <input
                type="number"
                id="incrementalBorrowingRate"
                name="incrementalBorrowingRate"
                className="w-full rounded-md border border-gray-300 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                step="0.01"
                value={formData.incrementalBorrowingRate || ""}
                onChange={handleInputChange}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                %
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label
              htmlFor="paymentFrequency"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Frequency
            </label>
            <select
              id="paymentFrequency"
              name="paymentFrequency"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.paymentFrequency || ""}
              onChange={handleInputChange}
            >
              <option value="">Select frequency</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semiannual">Semi-annual</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="paymentTiming"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Timing
            </label>
            <select
              id="paymentTiming"
              name="paymentTiming"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.paymentTiming || ""}
              onChange={handleInputChange}
            >
              <option value="">Select timing</option>
              <option value="beginning">Beginning of period</option>
              <option value="end">End of period</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="paymentDelay"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Delay (Days)
            </label>
            <input
              type="number"
              id="paymentDelay"
              name="paymentDelay"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
              value={formData.paymentDelay || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mt-10">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Security Deposit
        </h3>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#008F98] transition-colors"
          >
            + Add Deposit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label
              htmlFor="depositNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Deposit Number
            </label>
            <input
              type="text"
              id="depositNumber"
              name="depositNumber"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter deposit number"
              value={formData.depositNumber || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="depositAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="depositAmount"
                name="depositAmount"
                className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                step="0.01"
                value={formData.depositAmount || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label
              htmlFor="depositRate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rate
            </label>
            <div className="relative">
              <input
                type="number"
                id="depositRate"
                name="depositRate"
                className="w-full rounded-md border border-gray-300 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                step="0.01"
                value={formData.depositRate || ""}
                onChange={handleInputChange}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                %
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="depositStartDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="depositStartDate"
                name="depositStartDate"
                className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.depositStartDate || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="depositEndDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="depositEndDate"
                name="depositEndDate"
                className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.depositEndDate || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
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

        <button
          type="button"
          onClick={onNext}
          className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#008F98] transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaseFinancialDetails;
