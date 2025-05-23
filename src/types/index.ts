export interface Option {
  id: string;
  label: string;
}

export interface MultiSelectDropdownProps {
  title: string;
  options: Option[];
  selectedOptions: string[];
  onApply: (selected: string[]) => void;
  onReset: () => void;
  className?: string;
}

export interface ModuleData {
  id: number;
  name: string;
  description: string;
  actionId: string | null;
  roleId: string | null;
  enabled: boolean;
}

export interface UserData {
  id: number;
  OrgName: string;
  name: string;
  email: string;
  phone: string;
  roleId: string | null;
  moduleId: string | null;
  created: string;
  enabled: boolean;
  tenant_user_id: string;
  tenant_id: string;
}

// Type definitions for the Lease Management System

export type LeaseStatus =
  | "All Lease"
  | "Draft"
  | "Pending"
  | "Active"
  | "Rejected"
  | "Expired";

export interface Lease {
  id: string;
  leaseNumber: string;
  propertyType: string;
  client: string;
  price: number;
  startDate: string;
  endDate: string;
  status: Omit<LeaseStatus, "All lease">;
}

export interface CashflowItem {
  id: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  description: string;
}

export interface LeaseFormData {
  notes: string;
  clientContact: string;
  clientName: string;
  propertyAddress: string;
  propertyName: string;
  propertyId: string;
  leaseType: string;
  cashflowAmount: string;
  cashflowType: string;
  // Basic Info
  leaseId: string;
  leaseClass: string;

  // Lease Terms
  isShortTerm: boolean;
  isLowValue: boolean;
  startDate: string;
  endDate: string;
  terminationDate: string;
  duration: {
    years: number;
    months: number;
    days: number;
  };
  hasCashflow: boolean;

  // Financial Details
  annualPayment: number;
  incrementalBorrowingRate: number;
  initialDirectCosts: number;
  paymentFrequency: string;
  paymentTiming: string;
  paymentDelay: number;

  // Security Deposit
  depositNumber: string;
  depositAmount: number;
  depositRate: number;
  depositStartDate: string;
  depositEndDate: string;

  // Documents
  documents: File[];
}

export type FormStep =
  | "basicInfo"
  | "leaseTerms"
  | "financialDetails"
  | "documents"
  | "reviewSubmit";
