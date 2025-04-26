import React from 'react';

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  half?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  name,
  placeholder = '',
  required = false,
  half = false
}) => {
  return (
    <div className={`relative mb-4 ${half ? 'w-full' : ''}`}>
      <input
        type={type}
        id={name}
        name={name}
        placeholder=" "
        required={required}
        className="peer w-full p-3 pt-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
      />
      <label
        htmlFor={name}
        className="absolute left-3 top-2 text-sm text-gray-600 transition-all duration-200 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
};

export default FormField;