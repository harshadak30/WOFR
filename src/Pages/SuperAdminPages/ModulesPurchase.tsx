

import React from 'react';
import { Check } from 'lucide-react';
import { PurchasemoduleData } from '../../data/mockData';

export const ModulesPurchase: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Choose the Perfect Plan for Your Business</h2>
        <p className="mt-2 text-sm text-gray-500">One-time setup and integration fee</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PurchasemoduleData.map((module) => (
          <div 
            key={module.id}
            className={`relative rounded-lg border ${
              module.id === 2 ? 'border-[#008F98] ring-2 ring-[#008F98]' : 'border-gray-200'
            } bg-white p-6 py-10 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col h-full`}
          >
            {module.id === 2 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#008F98] text-white text-xs px-3 py-1 rounded-full">
                Popular
              </div>
            )}
            
            <h3 className="text-xl font-semibold text-gray-900">{module.name}</h3>
            <p className="mt-2 text-gray-600 text-sm flex-grow">{module.description}</p>
            
            <div className="mt-4">
              {module.features.map((feature, index) => (
                <div key={index} className="flex items-start mt-3">
                  <div className="flex-shrink-0">
                    <Check size={18} className="text-[#008F98]" />
                  </div>
                  <p className="ml-2 text-sm text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="mb-4">
                <span className="text-xl font-bold text-gray-900">{module.price}</span>
              </p>
              <button 
                className={`w-full py-3 px-4 rounded-md ${
                  module.id === 2
                    ? 'bg-[#008F98] hover:bg-[#008F98]'
                    : 'bg-[#008F98] hover:bg-[#008F98]'
                } text-white font-medium transition-colors duration-150`}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};