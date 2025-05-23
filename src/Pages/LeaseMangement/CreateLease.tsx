import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LeaseFormData } from "../../types";
import MultiStepIndicator from "../LeaseForms/MultistepIndicator";
import LeaseBasicInfo from "../LeaseForms/LeaseBasicInfo";
import LeaseFinancialDetails from "../LeaseForms/LeaseFinancialDetails";
import LeaseRentRevision from "../LeaseForms/LeaseRentRevision";
import LeaseReviewSubmit from "../LeaseForms/LeaseReviewSubmit";

const initialFormData: LeaseFormData = {
  leaseId: "",
  leaseClass: "",
  isShortTerm: false,
  isLowValue: false,
  startDate: "",
  endDate: "",
  terminationDate: "",
  duration: {
    years: 0,
    months: 0,
    days: 0,
  },
  hasCashflow: false,
  annualPayment: 0,
  incrementalBorrowingRate: 0,
  initialDirectCosts: 0,
  paymentFrequency: "",
  paymentTiming: "",
  paymentDelay: 0,
  depositNumber: "",
  depositAmount: 0,
  depositRate: 0,
  depositStartDate: "",
  depositEndDate: "",
  documents: [],
  notes: "",
  clientContact: "",
  clientName: "",
  propertyAddress: "",
  propertyName: "",
  propertyId: "",
  leaseType: "",
  cashflowAmount: "",
  cashflowType: "",
};

const CreateLease: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<LeaseFormData>(initialFormData);

  const steps = [
    {
      id: 1,
      name: "Lease Terms",
      status:
        currentStep === 1
          ? "current"
          : currentStep > 1
          ? "complete"
          : "upcoming",
    },
    {
      id: 2,
      name: "Financial Details",
      status:
        currentStep === 2
          ? "current"
          : currentStep > 2
          ? "complete"
          : "upcoming",
    },
    {
      id: 3,
      name: "Rent Revisions",
      status:
        currentStep === 3
          ? "current"
          : currentStep > 3
          ? "complete"
          : "upcoming",
    },

    {
      id: 4,
      name: "Review & Submit",
      status: currentStep === 4 ? "current" : "upcoming",
    },
  ];

  const updateFormData = (data: Partial<LeaseFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // In a real app, submit form data to API
    console.log("Submitting form data:", formData);

    // Simulate submission and redirect
    setTimeout(() => {
      alert("Lease created successfully!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="ml-5">
      <div className="flex justify-between">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create New Lease</h1>
          <p className="text-gray-500">
            Fill in the details to create a new lease agreement
          </p>
        </div>
        <div className="mb-6 fles justify-end">
          <Link
            to="/dashboard/Lease"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Leases
          </Link>
        </div>
      </div>
      <MultiStepIndicator steps={steps} currentStep={currentStep} />

      {currentStep === 1 && (
        <LeaseBasicInfo
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
        />
      )}

      {currentStep === 2 && (
        <LeaseFinancialDetails
          formData={formData}
          updateFormData={updateFormData}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}

      {currentStep === 3 && (
        <LeaseRentRevision
          formData={formData}
          updateFormData={updateFormData}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}

      {currentStep === 4 && (
        <LeaseReviewSubmit
          formData={formData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateLease;
