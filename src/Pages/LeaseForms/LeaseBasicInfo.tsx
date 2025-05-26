// import React, { useState } from "react";
// import { LeaseFormData } from "../../types";

// interface LeaseTermsProps {
//   formData: LeaseFormData;
//   updateFormData: (data: Partial<LeaseFormData>) => void;

//   onNext: () => void;
// }

// const LeaseBasicInfo: React.FC<LeaseTermsProps> = ({
//   formData,
//   updateFormData,

//   onNext,
// }) => {
//   const [showCashflowDetails, setShowCashflowDetails] = useState(
//     formData.hasCashflow || false
//   );
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     updateFormData({ [name]: value });
//   };
//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;

//     if (name === "hasCashflow") {
//       setShowCashflowDetails(checked);
//     }

//     updateFormData({ [name]: checked });
//   };

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     updateFormData({ [name]: value });
//   };

//   const handleDurationChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     unit: "years" | "months" | "days"
//   ) => {
//     const value = parseInt(e.target.value) || 0;
//     updateFormData({
//       duration: {
//         ...formData.duration,
//         [unit]: value,
//       },
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm">
//       <h2 className="text-xl font-semibold mb-6">Lease Terms</h2>

//       <div className="grid gap-6 p-2">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label
//               htmlFor="propertyId"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Class
//             </label>
//             <input
//               type="text"
//               id="propertyId"
//               name="propertyId"
//               className="w-full rounded-md border border-gray-300 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter Class"
//               value={formData.propertyId || ""}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="propertyName"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Lease ID
//             </label>
//             <input
//               type="text"
//               id="propertyName"
//               name="propertyName"
//               className="w-full rounded-md border border-gray-300 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Ente Lease ID"
//               value={formData.propertyName || ""}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-8 p-2">
//           <div className="flex items-center">
//             <input
//               id="isShortTerm"
//               name="isShortTerm"
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               checked={formData.isShortTerm || false}
//               onChange={handleCheckboxChange}
//             />
//             <label htmlFor="isShortTerm" className="ml-2 text-sm text-gray-700">
//               Short Term Lease
//             </label>
//           </div>

//           <div className="flex items-center">
//             <input
//               id="isLowValue"
//               name="isLowValue"
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               checked={formData.isLowValue || false}
//               onChange={handleCheckboxChange}
//             />
//             <label htmlFor="isLowValue" className="ml-2 text-sm text-gray-700">
//               Low Value Lease
//             </label>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 ">
//           <div>
//             <label
//               htmlFor="startDate"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Lease Start Date
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 id="startDate"
//                 name="startDate"
//                 className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={formData.startDate || ""}
//                 onChange={handleDateChange}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="endDate"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Lease End Date
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 id="endDate"
//                 name="endDate"
//                 className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={formData.endDate || ""}
//                 onChange={handleDateChange}
//               />
//             </div>
//           </div>
//         </div>

//         <div className=" border border-gray-200 rounded-md bg-gray-50 p-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Lease Duration
//           </label>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label
//                 htmlFor="years"
//                 className="block text-sm text-gray-500 mb-1"
//               >
//                 Years
//               </label>
//               <input
//                 type="number"
//                 id="years"
//                 min="0"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={formData.duration?.years || 0}
//                 onChange={(e) => handleDurationChange(e, "years")}
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="months"
//                 className="block text-sm text-gray-500 mb-1"
//               >
//                 Months
//               </label>
//               <input
//                 type="number"
//                 id="months"
//                 min="0"
//                 max="11"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={formData.duration?.months || 0}
//                 onChange={(e) => handleDurationChange(e, "months")}
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="days"
//                 className="block text-sm text-gray-500 mb-1"
//               >
//                 Days
//               </label>
//               <input
//                 type="number"
//                 id="days"
//                 min="0"
//                 max="30"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={formData.duration?.days || 0}
//                 onChange={(e) => handleDurationChange(e, "days")}
//               />
//             </div>
//           </div>
//           <p className="text-sm text-gray-500 mt-2">
//             Duration is automatically calculated based on start and end dates
//           </p>
//         </div>

//         <div className="mt-4">
//           <div className="flex items-center">
//             <input
//               id="hasCashflow"
//               name="hasCashflow"
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               checked={formData.hasCashflow || false}
//               onChange={handleCheckboxChange}
//             />
//             <label
//               htmlFor="hasCashflow"
//               className="ml-2 text-sm font-medium text-gray-700"
//             >
//               custom Cashflow
//             </label>
//           </div>

//           {showCashflowDetails && (
//             <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 animate-fadeIn">
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   cash Flow Import
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label
//                     htmlFor="startDate"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Lease Date
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       id="startDate"
//                       name="startDate"
//                       className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       value={formData.startDate || ""}
//                       onChange={handleDateChange}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="cashflowAmount"
//                     className="block text-sm text-gray-600 mb-1"
//                   >
//                     Amount
//                   </label>
//                   <div className="relative">
//                     <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//                       $
//                     </span>
//                     <input
//                       type="number"
//                       id="cashflowAmount"
//                       name="cashflowAmount"
//                       className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="0.00"
//                       value={formData.cashflowAmount || ""}
//                       onChange={(e) =>
//                         updateFormData({ cashflowAmount: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-8 flex justify-between">
//         <div className="flex gap-2">
//           <button
//             type="button"
//             className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={onNext}
//             className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#008F98] transition-colors"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaseBasicInfo;
import React, { useState, useEffect } from "react";
import { LeaseFormData, CashflowEntry } from "../../types";
import { Trash2, Plus } from "lucide-react";

interface LeaseBasicInfoProps {
  formData: LeaseFormData;
  updateFormData: (data: Partial<LeaseFormData>) => void;
  onNext: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const LeaseBasicInfo: React.FC<LeaseBasicInfoProps> = ({
  formData,
  updateFormData,
  onNext,
  onSave,
  isSaving,
}) => {
  const [showCashflowDetails, setShowCashflowDetails] = useState(
    formData.hasCashflow || false
  );
  
  const [cashflowEntries, setCashflowEntries] = useState<CashflowEntry[]>(
    formData.cashflowEntries || [
      { id: crypto.randomUUID(), leaseId: "", date: "", amount: "" }
    ]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    updateFormData({ cashflowEntries });
  }, [cashflowEntries, updateFormData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.propertyId) {
      newErrors.propertyId = "Class is required";
    }
    if (!formData.propertyName) {
      newErrors.propertyName = "Lease ID is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    if (showCashflowDetails) {
      const invalidEntries = cashflowEntries.some(entry => !entry.leaseId || !entry.date || !entry.amount);
      if (invalidEntries) {
        newErrors.cashflow = "All cashflow entries must be completed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === "hasCashflow") {
      setShowCashflowDetails(checked);
      if (checked && (!formData.cashflowEntries || formData.cashflowEntries.length === 0)) {
        setCashflowEntries([
          { id: crypto.randomUUID(), leaseId: "", date: "", amount: "" }
        ]);
      }
    }

    updateFormData({ [name]: checked });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
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

  const handleCashflowEntryChange = (
    id: string,
    field: keyof CashflowEntry,
    value: string
  ) => {
    setCashflowEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
    if (errors.cashflow) {
      setErrors(prev => ({ ...prev, cashflow: "" }));
    }
  };

  const addCashflowEntry = () => {
    setCashflowEntries(prevEntries => [
      ...prevEntries,
      { id: crypto.randomUUID(), leaseId: "", date: "", amount: "" }
    ]);
  };

  const removeCashflowEntry = (id: string) => {
    setCashflowEntries(prevEntries => 
      prevEntries.filter(entry => entry.id !== id)
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave();
    }
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
              className={`w-full rounded-md border ${
                errors.propertyId ? 'border-red-300' : 'border-gray-300'
              } px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Class"
              value={formData.propertyId || ""}
              onChange={handleChange}
            />
            {errors.propertyId && (
              <p className="mt-1 text-sm text-red-600">{errors.propertyId}</p>
            )}
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
              className={`w-full rounded-md border ${
                errors.propertyName ? 'border-red-300' : 'border-gray-300'
              } px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Lease ID"
              value={formData.propertyName || ""}
              onChange={handleChange}
            />
            {errors.propertyName && (
              <p className="mt-1 text-sm text-red-600">{errors.propertyName}</p>
            )}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
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
                className={`w-full rounded-md border ${
                  errors.startDate ? 'border-red-300' : 'border-gray-300'
                } pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                value={formData.startDate || ""}
                onChange={handleDateChange}
              />
            </div>
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
            )}
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
                min={formData.startDate || undefined}
                className={`w-full rounded-md border ${
                  errors.endDate ? 'border-red-300' : 'border-gray-300'
                } pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                value={formData.endDate || ""}
                onChange={handleDateChange}
              />
            </div>
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
            )}
          </div>
        </div>

        <div className="border border-gray-200 rounded-md bg-gray-50 p-2">
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
              Custom Cashflow
            </label>
          </div>

          {showCashflowDetails && (
            <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium">Custom Cashflow</h3>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <span>Cash Flow Import</span>
                </button>
              </div>
              
              {cashflowEntries.map((entry, index) => (
                <div key={entry.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end relative">
                  <div>
                    <label
                      htmlFor={`leaseId-${entry.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Lease ID
                    </label>
                    <input
                      type="text"
                      id={`leaseId-${entry.id}`}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={entry.leaseId}
                      onChange={(e) => handleCashflowEntryChange(entry.id, 'leaseId', e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`date-${entry.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id={`date-${entry.id}`}
                      min={formData.startDate || undefined}
                      max={formData.endDate || undefined}
                      className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={entry.date}
                      onChange={(e) => handleCashflowEntryChange(entry.id, 'date', e.target.value)}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-grow">
                      <label
                        htmlFor={`amount-${entry.id}`}
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
                          id={`amount-${entry.id}`}
                          className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                          value={entry.amount}
                          onChange={(e) => handleCashflowEntryChange(entry.id, 'amount', e.target.value)}
                        />
                      </div>
                    </div>
                    {cashflowEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCashflowEntry(entry.id)}
                        className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
                        aria-label="Remove entry"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {errors.cashflow && (
                <p className="mt-1 text-sm text-red-600">{errors.cashflow}</p>
              )}
              
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={addCashflowEntry}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Entry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${
            isSaving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#007A82] transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaseBasicInfo;