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

// export interface LeaseFormData {
//   rentRevisions: any;
//   securityDeposits: { id: `${string}-${string}-${string}-${string}-${string}`; depositNumber: string; amount: string; rate: string; startDate: string; endDate: string; }[];
//   cashflowEntries: any;
//   notes: string;
//   clientContact: string;
//   clientName: string;
//   propertyAddress: string;
//   propertyName: string;
//   propertyId: string;
//   leaseType: string;
//   cashflowAmount: string;
//   cashflowType: string;
//   // Basic Info
//   leaseId: string;
//   leaseClass: string;

//   // Lease Terms
//   isShortTerm: boolean;
//   isLowValue: boolean;
//   startDate: string;
//   endDate: string;
//   terminationDate: string;
//   duration: {
//     years: number;
//     months: number;
//     days: number;
//   };
//   hasCashflow: boolean;

//   // Financial Details
//   annualPayment: number;
//   incrementalBorrowingRate: number;
//   initialDirectCosts: number;
//   paymentFrequency: string;
//   paymentTiming: string;
//   paymentDelay: number;

//   // Security Deposit
//   depositNumber: string;
//   depositAmount: number;
//   depositRate: number;
//   depositStartDate: string;
//   depositEndDate: string;

//   // Documents
//   documents: File[];
// }

export type FormStep =
  | "basicInfo"
  | "leaseTerms"
  | "financialDetails"
  | "documents"
  | "reviewSubmit";

export interface Duration {
  years: number;
  months: number;
  days: number;
}

export interface Document {
  name: string;
  url?: string;
  size?: number;
}

export interface CashflowEntry {
  id: string;
  leaseId: string;
  date: string;
  amount: string;
}

export interface SecurityDeposit {
  id: string;
  depositNumber: string;
  amount: string;
  rate: string;
  startDate: string;
  endDate: string;
}

export interface RentRevision {
  id: string;
  revisionDate: string;
  revisedPayment: string;
}

export interface LeaseFormData {
  leaseId: string;
  leaseClass: string;
  isShortTerm: boolean;
  isLowValue: boolean;
  startDate: string;
  endDate: string;
  terminationDate: string;
  duration: Duration;
  hasCashflow: boolean;
  annualPayment: number | string;
  incrementalBorrowingRate: number | string;
  initialDirectCosts: number | string;
  paymentFrequency: string;
  paymentTiming: string;
  paymentDelay: number | string;
  depositNumber: string;
  depositAmount: number | string;
  depositRate: number | string;
  depositStartDate: string;
  depositEndDate: string;
  securityDeposits?: SecurityDeposit[];
  rentRevisions?: RentRevision[];
  cashflowEntries?: CashflowEntry[];
  documents: Document[];
  notes: string;
  clientContact: string;
  clientName: string;
  propertyAddress: string;
  propertyName: string;
  propertyId: string;
  leaseType: string;
  cashflowAmount: string;
  cashflowType: string;
}
