// const NewLease = () => {
//   return (
//     <div>NewLease</div>
//   )
// }

// export default NewLease


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, FileText, DollarSign, Calendar, Building, User, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewLease = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    leaseTitle: '',
    leaseType: '',
    propertyAddress: '',
    propertyType: '',
    clientName: '',
    clientType: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    leaseAmount: '',
    paymentFrequency: '',
    securityDeposit: '',
    startDate: '',
    endDate: '',
    termsAndConditions: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the lease would go here
    alert('Lease submitted for approval');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">Create New Lease</h2>
          <p className="mt-1 text-gray-500">Complete the form to create a new lease agreement.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="p-1">
          <div className="flex mb-6">
            <div className={`flex-1 p-4 text-center relative ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className="flex justify-center mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-300 text-gray-400'}`}>
                  <Building className="h-5 w-5" />
                </div>
              </div>
              <div className="font-medium">Property Details</div>
              {step > 1 && (
                <div className="absolute right-0 top-1/2 h-0.5 w-full bg-primary-500 -z-10"></div>
              )}
            </div>
            
            <div className={`flex-1 p-4 text-center relative ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className="flex justify-center mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-300 text-gray-400'}`}>
                  <User className="h-5 w-5" />
                </div>
              </div>
              <div className="font-medium">Client Information</div>
              {step > 2 && (
                <div className="absolute right-0 top-1/2 h-0.5 w-full bg-primary-500 -z-10"></div>
              )}
            </div>
            
            <div className={`flex-1 p-4 text-center relative ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className="flex justify-center mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-300 text-gray-400'}`}>
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
              <div className="font-medium">Financial Terms</div>
              {step > 3 && (
                <div className="absolute right-0 top-1/2 h-0.5 w-full bg-primary-500 -z-10"></div>
              )}
            </div>
            
            <div className={`flex-1 p-4 text-center ${step >= 4 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className="flex justify-center mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 4 ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-300 text-gray-400'}`}>
                  <FileText className="h-5 w-5" />
                </div>
              </div>
              <div className="font-medium">Review & Submit</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 pb-6">
              {/* Step 1: Property Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-gray-900">Property Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="leaseTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Lease Title <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="leaseTitle"
                        name="leaseTitle"
                        value={formData.leaseTitle}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        placeholder="e.g., Office Space Downtown"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="leaseType" className="block text-sm font-medium text-gray-700 mb-1">
                        Lease Type <span className="text-error-500">*</span>
                      </label>
                      <select
                        id="leaseType"
                        name="leaseType"
                        value={formData.leaseType}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      >
                        <option value="">Select Lease Type</option>
                        <option value="commercial">Commercial</option>
                        <option value="residential">Residential</option>
                        <option value="retail">Retail</option>
                        <option value="industrial">Industrial</option>
                        <option value="healthcare">Healthcare</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Address <span className="text-error-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="propertyAddress"
                          name="propertyAddress"
                          value={formData.propertyAddress}
                          onChange={handleChange}
                          className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Street address, city, state, zip code"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Type <span className="text-error-500">*</span>
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      >
                        <option value="">Select Property Type</option>
                        <option value="office">Office Space</option>
                        <option value="retail">Retail Space</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="medical">Medical Facility</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button onClick={nextStep} >
                      Next: Client Information
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Client Information */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-gray-900">Client Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                        Client/Company Name <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="clientType" className="block text-sm font-medium text-gray-700 mb-1">
                        Client Type <span className="text-error-500">*</span>
                      </label>
                      <select
                        id="clientType"
                        name="clientType"
                        value={formData.clientType}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      >
                        <option value="">Select Client Type</option>
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                        <option value="government">Government</option>
                        <option value="nonprofit">Non-Profit Organization</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Person <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Email <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Phone <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button  onClick={prevStep} >
                      Back
                    </button>
                    <button onClick={nextStep}>
                      Next: Financial Terms
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Financial Terms */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-gray-900">Financial Terms</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="leaseAmount" className="block text-sm font-medium text-gray-700 mb-1">
                        Lease Amount <span className="text-error-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="leaseAmount"
                          name="leaseAmount"
                          value={formData.leaseAmount}
                          onChange={handleChange}
                          className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="paymentFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Frequency <span className="text-error-500">*</span>
                      </label>
                      <select
                        id="paymentFrequency"
                        name="paymentFrequency"
                        value={formData.paymentFrequency}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      >
                        <option value="">Select Frequency</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="biannual">Bi-Annual</option>
                        <option value="annual">Annual</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700 mb-1">
                        Security Deposit <span className="text-error-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="securityDeposit"
                          name="securityDeposit"
                          value={formData.securityDeposit}
                          onChange={handleChange}
                          className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date <span className="text-error-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        End Date <span className="text-error-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button  onClick={prevStep} >
                      Back
                    </button>
                    <button onClick={nextStep} >
                      Next: Review & Submit
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review & Submit */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-gray-900">Review & Submit</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Property Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Lease Title:</span>
                          <span className="md:ml-2 font-medium">{formData.leaseTitle || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Lease Type:</span>
                          <span className="md:ml-2 font-medium capitalize">{formData.leaseType || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between md:block md:col-span-2">
                          <span className="text-gray-500">Property Address:</span>
                          <span className="md:ml-2 font-medium">{formData.propertyAddress || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Property Type:</span>
                          <span className="md:ml-2 font-medium capitalize">{formData.propertyType || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Client Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Client Name:</span>
                          <span className="md:ml-2 font-medium">{formData.clientName || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Client Type:</span>
                          <span className="md:ml-2 font-medium capitalize">{formData.clientType || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Contact Person:</span>
                          <span className="md:ml-2 font-medium">{formData.contactPerson || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Contact Email:</span>
                          <span className="md:ml-2 font-medium">{formData.contactEmail || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Contact Phone:</span>
                          <span className="md:ml-2 font-medium">{formData.contactPhone || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Financial Terms</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Lease Amount:</span>
                          <span className="md:ml-2 font-medium">${formData.leaseAmount || '0.00'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Payment Frequency:</span>
                          <span className="md:ml-2 font-medium capitalize">{formData.paymentFrequency || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Security Deposit:</span>
                          <span className="md:ml-2 font-medium">${formData.securityDeposit || '0.00'}</span>
                        </div>
                        <div className="flex justify-between md:block">
                          <span className="text-gray-500">Lease Period:</span>
                          <span className="md:ml-2 font-medium">
                            {formData.startDate && formData.endDate 
                              ? `${formData.startDate} to ${formData.endDate}` 
                              : 'Not provided'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="termsAndConditions"
                      name="termsAndConditions"
                      type="checkbox"
                      checked={Boolean(formData.termsAndConditions)}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="termsAndConditions" className="ml-2 block text-sm text-gray-700">
                      I confirm that all information provided is accurate and complete. By submitting this form, 
                      I authorize the creation of this lease agreement.
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <button  onClick={prevStep} >
                      Back
                    </button>
                    <button 
                      type="submit" 
                  
                
                      disabled={!formData.termsAndConditions}
                    >
                      Submit Lease for Approval
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLease;