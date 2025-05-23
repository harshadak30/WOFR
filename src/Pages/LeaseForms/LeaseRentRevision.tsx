import React from "react";
import { LeaseFormData } from "../../types";

interface LeaseRentRevisionProps {
  formData: LeaseFormData;
  updateFormData: (data: Partial<LeaseFormData>) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const LeaseRentRevision: React.FC<LeaseRentRevisionProps> = ({
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
        <h2 className="text-xl font-semibold mb-6">Rent Revisions</h2>
        <div>
          <label
            htmlFor="annualPayment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            while direct costs{" "}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-10">
          <div>
            <div>
              <label
                htmlFor="depositStartDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Future Rent Revision Date 1
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
          </div>

          <div>
            <label
              htmlFor="incrementalBorrowingRate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Revised Annual Lease Payment 1
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

          <div>
            <div className="flex justify-end text-sm font-medium text-gray-700 mt-5">
              <button
                type="button"
                className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#008F98] transition-colors"
              >
                + Add
              </button>
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

export default LeaseRentRevision;
