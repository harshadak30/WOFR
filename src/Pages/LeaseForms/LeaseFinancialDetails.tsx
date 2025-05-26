// import React from "react";
// import { LeaseFormData } from "../../types";

// interface LeaseFinancialDetailsProps {
//   formData: LeaseFormData;
//   updateFormData: (data: Partial<LeaseFormData>) => void;
//   onPrevious: () => void;
//   onNext: () => void;
// }

// const LeaseFinancialDetails: React.FC<LeaseFinancialDetailsProps> = ({
//   formData,
//   updateFormData,
//   onPrevious,
//   onNext,
// }) => {
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     updateFormData({ [name]: value });
//   };

//   return (
//     <div>
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-xl font-semibold mb-6">Financial Details</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <label
//               htmlFor="annualPayment"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Annual Lease Payment
//             </label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//                 $
//               </span>
//               <input
//                 type="number"
//                 id="annualPayment"
//                 name="annualPayment"
//                 className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="0.00"
//                 step="0.01"
//                 value={formData.annualPayment || ""}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="incrementalBorrowingRate"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Incremental Borrowing Rate
//             </label>
//             <div className="relative">
//               <input
//                 type="number"
//                 id="incrementalBorrowingRate"
//                 name="incrementalBorrowingRate"
//                 className="w-full rounded-md border border-gray-300 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="0.00"
//                 step="0.01"
//                 value={formData.incrementalBorrowingRate || ""}
//                 onChange={handleInputChange}
//               />
//               <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
//                 %
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div>
//             <label
//               htmlFor="paymentFrequency"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Payment Frequency
//             </label>
//             <select
//               id="paymentFrequency"
//               name="paymentFrequency"
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={formData.paymentFrequency || ""}
//               onChange={handleInputChange}
//             >
//               <option value="">Select frequency</option>
//               <option value="monthly">Monthly</option>
//               <option value="quarterly">Quarterly</option>
//               <option value="semiannual">Semi-annual</option>
//               <option value="annual">Annual</option>
//             </select>
//           </div>

//           <div>
//             <label
//               htmlFor="paymentTiming"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Payment Timing
//             </label>
//             <select
//               id="paymentTiming"
//               name="paymentTiming"
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={formData.paymentTiming || ""}
//               onChange={handleInputChange}
//             >
//               <option value="">Select timing</option>
//               <option value="beginning">Beginning of period</option>
//               <option value="end">End of period</option>
//             </select>
//           </div>

//           <div>
//             <label
//               htmlFor="paymentDelay"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Payment Delay (Days)
//             </label>
//             <input
//               type="number"
//               id="paymentDelay"
//               name="paymentDelay"
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="0"
//               min="0"
//               value={formData.paymentDelay || ""}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-sm mt-10">
//         <h3 className="text-lg font-medium text-gray-800 mb-4">
//           Security Deposit
//         </h3>
//         <div className="flex justify-end">
//           <button
//             type="button"
//             className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#008F98] transition-colors"
//           >
//             + Add Deposit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <label
//               htmlFor="depositNumber"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Deposit Number
//             </label>
//             <input
//               type="text"
//               id="depositNumber"
//               name="depositNumber"
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter deposit number"
//               value={formData.depositNumber || ""}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="depositAmount"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Amount
//             </label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//                 $
//               </span>
//               <input
//                 type="number"
//                 id="depositAmount"
//                 name="depositAmount"
//                 className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="0.00"
//                 step="0.01"
//                 value={formData.depositAmount || ""}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div>
//             <label
//               htmlFor="depositRate"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Rate
//             </label>
//             <div className="relative">
//               <input
//                 type="number"
//                 id="depositRate"
//                 name="depositRate"
//                 className="w-full rounded-md border border-gray-300 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="0.00"
//                 step="0.01"
//                 value={formData.depositRate || ""}
//                 onChange={handleInputChange}
//               />
//               <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
//                 %
//               </span>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="depositStartDate"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Start Date
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 id="depositStartDate"
//                 name="depositStartDate"
//                 className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={formData.depositStartDate || ""}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="depositEndDate"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               End Date
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 id="depositEndDate"
//                 name="depositEndDate"
//                 className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={formData.depositEndDate || ""}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-8 flex justify-between">
//         <button
//           type="button"
//           onClick={onPrevious}
//           className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
//         >
//           Previous
//         </button>

//         <button
//           type="button"
//           onClick={onNext}
//           className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#008F98] transition-colors"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LeaseFinancialDetails;
import React, { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { LeaseFormData, SecurityDeposit } from "../../types";

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
  const [showExcelFormat, setShowExcelFormat] = useState(
    formData.securityDeposits && formData.securityDeposits.length > 1 || false
  );
  
  const [securityDeposits, setSecurityDeposits] = useState<SecurityDeposit[]>(
    formData.securityDeposits || [
      {
        id: crypto.randomUUID(),
        depositNumber: "",
        amount: "",
        rate: "",
        startDate: "",
        endDate: "",
      }
    ]
  );

  useEffect(() => {
    updateFormData({ securityDeposits });
  }, [securityDeposits, updateFormData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSecurityDepositChange = (
    id: string,
    field: keyof SecurityDeposit,
    value: string
  ) => {
    setSecurityDeposits((prevDeposits) =>
      prevDeposits.map((deposit) =>
        deposit.id === id ? { ...deposit, [field]: value } : deposit
      )
    );
  };

  const addSecurityDeposit = () => {
    if (!showExcelFormat) {
      setShowExcelFormat(true);
    }
    
    const newDeposit: SecurityDeposit = {
      id: crypto.randomUUID(),
      depositNumber: "",
      amount: "",
      rate: "",
      startDate: "",
      endDate: "",
    };
    
    setSecurityDeposits((prev) => [...prev, newDeposit]);
  };

  const removeSecurityDeposit = (id: string) => {
    setSecurityDeposits((prev) => {
      const newDeposits = prev.filter((deposit) => deposit.id !== id);
      if (newDeposits.length <= 1) {
        setShowExcelFormat(false);
      }
      return newDeposits;
    });
  };

  const validateForm = () => {
    // Basic validation for required fields
    if (!formData.annualPayment) return false;
    if (!formData.paymentFrequency) return false;
    return true;
  };

  return (
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

      <div className="bg-white rounded-lg shadow-sm mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Security Deposit</h3>
          <button
            type="button"
            onClick={addSecurityDeposit}
            className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#007a82] transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Add Deposit
          </button>
        </div>

        {!showExcelFormat ? (
          // Single entry format
          securityDeposits.slice(0, 1).map((deposit) => (
            <div key={deposit.id} className="border border-gray-200 rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label
                    htmlFor={`depositNumber-${deposit.id}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Deposit Number
                  </label>
                  <input
                    type="text"
                    id={`depositNumber-${deposit.id}`}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter deposit number"
                    value={deposit.depositNumber}
                    onChange={(e) =>
                      handleSecurityDepositChange(
                        deposit.id,
                        "depositNumber",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor={`amount-${deposit.id}`}
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
                      id={`amount-${deposit.id}`}
                      className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                      value={deposit.amount}
                      onChange={(e) =>
                        handleSecurityDepositChange(
                          deposit.id,
                          "amount",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor={`rate-${deposit.id}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id={`rate-${deposit.id}`}
                      className="w-full rounded-md border border-gray-300 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                      value={deposit.rate}
                      onChange={(e) =>
                        handleSecurityDepositChange(deposit.id, "rate", e.target.value)
                      }
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`startDate-${deposit.id}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id={`startDate-${deposit.id}`}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={deposit.startDate}
                    onChange={(e) =>
                      handleSecurityDepositChange(
                        deposit.id,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`endDate-${deposit.id}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id={`endDate-${deposit.id}`}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={deposit.endDate}
                    onChange={(e) =>
                      handleSecurityDepositChange(
                        deposit.id,
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          // Excel-like table format
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Deposit Number
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Amount ($)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Rate (%)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Start Date
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    End Date
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {securityDeposits.map((deposit, index) => (
                  <tr key={deposit.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-0">
                      <input
                        type="text"
                        className="w-full border-0 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        placeholder="Enter deposit number"
                        value={deposit.depositNumber}
                        onChange={(e) =>
                          handleSecurityDepositChange(
                            deposit.id,
                            "depositNumber",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-0">
                      <input
                        type="number"
                        className="w-full border-0 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        placeholder="0.00"
                        step="0.01"
                        value={deposit.amount}
                        onChange={(e) =>
                          handleSecurityDepositChange(
                            deposit.id,
                            "amount",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-0">
                      <input
                        type="number"
                        className="w-full border-0 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        placeholder="0.00"
                        step="0.01"
                        value={deposit.rate}
                        onChange={(e) =>
                          handleSecurityDepositChange(deposit.id, "rate", e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-0">
                      <input
                        type="date"
                        className="w-full border-0 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        value={deposit.startDate}
                        onChange={(e) =>
                          handleSecurityDepositChange(
                            deposit.id,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-0">
                      <input
                        type="date"
                        className="w-full border-0 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        value={deposit.endDate}
                        onChange={(e) =>
                          handleSecurityDepositChange(
                            deposit.id,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={addSecurityDeposit}
                          className="p-1 text-green-600 hover:text-green-800 focus:outline-none"
                          aria-label="Add row"
                        >
                          <Plus size={16} />
                        </button>
                        {securityDeposits.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSecurityDeposit(deposit.id)}
                            className="p-1 text-red-600 hover:text-red-800 focus:outline-none"
                            aria-label="Delete row"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
            className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#007A82] transition-colors"
            disabled={!validateForm()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaseFinancialDetails;