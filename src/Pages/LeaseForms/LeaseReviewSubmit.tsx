import React from "react";
import { Check, AlertCircle } from "lucide-react";
import { LeaseFormData } from "../../types";

interface LeaseReviewSubmitProps {
  formData: LeaseFormData;
  onPrevious: () => void;
  onSubmit: () => void;
}

const LeaseReviewSubmit: React.FC<LeaseReviewSubmitProps> = ({
  formData,
  onPrevious,
  onSubmit,
}) => {
  // Helper function to format currency values
  const formatCurrency = (value?: string | number): string => {
    if (!value) return "$0.00";
    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Check if required fields are filled
  const checkRequiredFields = (): boolean => {
    // Add your validation logic here
    const requiredFields = [
      formData.startDate,
      formData.endDate,
      formData.annualPayment,
      formData.paymentFrequency
      // Add more required fields as needed
    ];

    return requiredFields.every((field) => field !== undefined && field !== "");
  };

  const isFormValid = checkRequiredFields();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Review & Submit</h2>

      {!isFormValid && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle
            size={20}
            className="text-red-500 mr-3 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="font-medium text-red-800">
              Missing Required Information
            </p>
            <p className="text-red-700 mt-1">
              Please go back and complete all required fields before submitting.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Lease Terms
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Property ID</p>
              <p className="font-medium">
                {formData.propertyId || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Property Name</p>
              <p className="font-medium">
                {formData.propertyName || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lease Start Date</p>
              <p className="font-medium">
                {formData.startDate || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lease End Date</p>
              <p className="font-medium">
                {formData.endDate || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">
                {formData.duration?.years || 0} years,{" "}
                {formData.duration?.months || 0} months,{" "}
                {formData.duration?.days || 0} days
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lease Type</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.isShortTerm && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Short Term
                  </span>
                )}
                {formData.isLowValue && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Low Value
                  </span>
                )}
                {!formData.isShortTerm && !formData.isLowValue && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    Standard
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Financial Details
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Annual Lease Payment</p>
              <p className="font-medium">
                {formatCurrency(formData.annualPayment)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Incremental Borrowing Rate
              </p>
              <p className="font-medium">
                {formData.incrementalBorrowingRate || 0}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Initial Direct Costs</p>
              <p className="font-medium">
                {formatCurrency(formData.initialDirectCosts)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Frequency</p>
              <p className="font-medium capitalize">
                {formData.paymentFrequency || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Timing</p>
              <p className="font-medium capitalize">
                {formData.paymentTiming || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Delay</p>
              <p className="font-medium">{formData.paymentDelay || 0} days</p>
            </div>
          </div>
        </section>

        {formData.hasCashflow && formData.cashflowEntries && formData.cashflowEntries.length > 0 && (
          <section>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Custom Cashflow
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.cashflowEntries.map((entry, index) => (
                    <tr key={entry.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.leaseId || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.amount ? formatCurrency(entry.amount) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {formData.securityDeposits && formData.securityDeposits.length > 0 && (
          <section>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Security Deposits
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.securityDeposits.map((deposit, index) => (
                    <tr key={deposit.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deposit.depositNumber || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {deposit.amount ? formatCurrency(deposit.amount) : "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {deposit.rate ? `${deposit.rate}%` : "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {deposit.startDate && deposit.endDate 
                          ? `${deposit.startDate} to ${deposit.endDate}`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {formData.rentRevisions && formData.rentRevisions.length > 0 && (
          <section>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Rent Revisions
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revision Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revised Payment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.rentRevisions.map((revision, index) => (
                    <tr key={revision.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{revision.revisionDate || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {revision.revisedPayment ? formatCurrency(revision.revisedPayment) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Documents</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            {formData.documents && formData.documents.length > 0 ? (
              <ul className="space-y-2">
                {formData.documents.map((doc, index) => (
                  <li key={index} className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>{doc.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No documents attached</p>
            )}
          </div>
        </section>
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
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`px-4 py-2 rounded-md ${
            isFormValid
              ? "bg-[#008F98] text-white hover:bg-[#007A82]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } transition-colors`}
        >
          Submit Lease
        </button>
      </div>
    </div>
  );
};

export default LeaseReviewSubmit;