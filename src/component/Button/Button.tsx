import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'secondary';
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'primary',
  htmlType = 'button',
  onClick,
  className = '',
  icon
}) => {
  const baseClasses = 'py-3 px-6 rounded-md font-medium flex items-center justify-center transition-all duration-300 text-base';
  
  const typeClasses = {
    primary: 'bg-teal-500 hover:bg-teal-600 text-white',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={`${baseClasses} ${typeClasses[type]} ${className}`}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;