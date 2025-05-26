import React, { useState } from 'react';
import Buttons from '../../component/common/Button/Buttons';

interface CreateRoleFormProps {
  onSubmit: (roleData: { role_name: string; description: string; status: string }) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const CreateRoleForm: React.FC<CreateRoleFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    role_name: '',
    description: '',
    status: 'active'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.role_name.trim()) {
      newErrors.role_name = 'Role name is required';
    } else if (formData.role_name.length < 3) {
      newErrors.role_name = 'Role name must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="role_name" className="block text-sm font-medium text-gray-700">
          Role Name
        </label>
        <input
          type="text"
          id="role_name"
          name="role_name"
          value={formData.role_name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm 
            border-gray-300 focus:ring-blue-500 focus:border-blue-500
            ${errors.role_name ? 'border-red-300' : ''}`}
        />
        {errors.role_name && (
          <p className="mt-1 text-sm text-red-600">{errors.role_name}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm 
            border-gray-300 focus:ring-blue-500 focus:border-blue-500
            ${errors.description ? 'border-red-300' : ''}`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Buttons 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Buttons>
        <Buttons 
          type="submit" 
          variant="primary" 
          isLoading={isLoading}
        >
          Create Role
        </Buttons>
      </div>
    </form>
  );
};

export default CreateRoleForm;