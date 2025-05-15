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
    tenetId: string;
    name: string;
    email: string;
    roleId: string | null;
    moduleId: string | null;
    created: string;
    enabled: boolean;
  }