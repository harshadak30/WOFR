// import React from "react";
// import { LeaseFormData } from "../../types";

// interface LeaseRentRevisionProps {
//   formData: LeaseFormData;
//   updateFormData: (data: Partial<LeaseFormData>) => void;
//   onPrevious: () => void;
//   onNext: () => void;
// }

// const LeaseRentRevision: React.FC<LeaseRentRevisionProps> = ({
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
//         <h2 className="text-xl font-semibold mb-6">Rent Revisions</h2>
//         <div>
//           <label
//             htmlFor="annualPayment"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             while direct costs{" "}
//           </label>
//           <div className="relative">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//               $
//             </span>
//             <input
//               type="number"
//               id="annualPayment"
//               name="annualPayment"
//               className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="0.00"
//               step="0.01"
//               value={formData.annualPayment || ""}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-10">
//           <div>
//             <div>
//               <label
//                 htmlFor="depositStartDate"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Future Rent Revision Date 1
//               </label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   id="depositStartDate"
//                   name="depositStartDate"
//                   className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={formData.depositStartDate || ""}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="incrementalBorrowingRate"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Revised Annual Lease Payment 1
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

//           <div>
//             <div className="flex justify-end text-sm font-medium text-gray-700 mt-5">
//               <button
//                 type="button"
//                 className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#008F98] transition-colors"
//               >
//                 + Add
//               </button>
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

// export default LeaseRentRevision;
import React, { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { LeaseFormData, RentRevision } from "../../types";

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
  const [showExcelFormat, setShowExcelFormat] = useState(
    formData.rentRevisions && formData.rentRevisions.length > 1 || false
  );
  
  const [rentRevisions, setRentRevisions] = useState<RentRevision[]>(
    formData.rentRevisions || [
      {
        id: crypto.randomUUID(),
        revisionDate: "",
        revisedPayment: "",
      }
    ]
  );

  useEffect(() => {
    updateFormData({ rentRevisions });
  }, [rentRevisions, updateFormData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleRentRevisionChange = (
    id: string,
    field: keyof RentRevision,
    value: string
  ) => {
    setRentRevisions((prevRevisions) =>
      prevRevisions.map((revision) =>
        revision.id === id ? { ...revision, [field]: value } : revision
      )
    );
  };

  const addRentRevision = () => {
    if (!showExcelFormat) {
      setShowExcelFormat(true);
    }
    
    const newRevision: RentRevision = {
      id: crypto.randomUUID(),
      revisionDate: "",
      revisedPayment: "",
    };
    
    setRentRevisions((prev) => [...prev, newRevision]);
  };

  const removeRentRevision = (id: string) => {
    setRentRevisions((prev) => {
      const newRevisions = prev.filter((revision) => revision.id !== id);
      if (newRevisions.length <= 1) {
        setShowExcelFormat(false);
      }
      return newRevisions;
    });
  };

  const validateForm = () => {
    // Basic validation - just check initialDirectCosts exists
    return formData.initialDirectCosts !== undefined && formData.initialDirectCosts !== "";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Rent Revisions</h2>
      
      {/* Initial Direct Costs */}
      <div className="mb-8">
        <label
          htmlFor="initialDirectCosts"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Initial direct costs
        </label>
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            $
          </span>
          <input
            type="number"
            id="initialDirectCosts"
            name="initialDirectCosts"
            className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
            step="0.01"
            value={formData.initialDirectCosts || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Rent Revisions Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Future Rent Revisions</h3>
        <button
          type="button"
          onClick={addRentRevision}
          className="bg-[#008F98] text-white px-4 py-2 rounded-md hover:bg-[#007a82] transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {!showExcelFormat ? (
        // Single entry format
        rentRevisions.slice(0, 1).map((revision, index) => (
          <div key={revision.id} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label
                htmlFor={`revisionDate-${revision.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Future Rent Revision Date 1
              </label>
              <input
                type="date"
                id={`revisionDate-${revision.id}`}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={revision.revisionDate}
                onChange={(e) =>
                  handleRentRevisionChange(
                    revision.id,
                    "revisionDate",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label
                htmlFor={`revisedPayment-${revision.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Revised Annual Lease Payment 1
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id={`revisedPayment-${revision.id}`}
                  className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                  value={revision.revisedPayment}
                  onChange={(e) =>
                    handleRentRevisionChange(
                      revision.id,
                      "revisedPayment",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="flex items-end">
              <div className="w-full"></div>
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
                  #
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Future Rent Revision Date
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Revised Annual Lease Payment ($)
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rentRevisions.map((revision, index) => (
                <tr key={revision.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-0">
                    <input
                      type="date"
                      className="w-full border-0 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                      value={revision.revisionDate}
                      onChange={(e) =>
                        handleRentRevisionChange(
                          revision.id,
                          "revisionDate",
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
                      value={revision.revisedPayment}
                      onChange={(e) =>
                        handleRentRevisionChange(
                          revision.id,
                          "revisedPayment",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={addRentRevision}
                        className="p-1 text-green-600 hover:text-green-800 focus:outline-none"
                        aria-label="Add row"
                      >
                        <Plus size={16} />
                      </button>
                      {rentRevisions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRentRevision(revision.id)}
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

export default LeaseRentRevision;