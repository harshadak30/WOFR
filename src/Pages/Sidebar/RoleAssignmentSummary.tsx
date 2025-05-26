// import React, { useState } from "react";
// import { ChevronDown, Search } from "lucide-react";

// interface RoleAssignmentSummaryProps {
//   groupedRoleMappings: Record<string, any[]>;
// }

// const RoleAssignmentSummary: React.FC<RoleAssignmentSummaryProps> = ({ groupedRoleMappings }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});

//   const toggleRoleExpand = (roleName: string) => {
//     setExpandedRoles(prev => ({
//       ...prev,
//       [roleName]: !prev[roleName]
//     }));
//   };

//   const filteredRoleMappings = Object.entries(groupedRoleMappings).filter(([roleName]) => 
//     roleName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 bg-white">
//       <div className="mb-4 relative">
//         <div className="relative">
//           <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search roles..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       {filteredRoleMappings.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No role assignments found
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filteredRoleMappings.map(([roleName, entries]) => {
//             const groupedByModule = entries.reduce((acc, item) => {
//               if (!acc[item.module_name]) acc[item.module_name] = [];
//               acc[item.module_name].push(item.action_name);
//               return acc;
//             }, {} as Record<string, string[]>);

//             const status = entries[0]?.status || "active";
//             const isExpanded = expandedRoles[roleName] || false;

//             return (
//               <div 
//                 key={roleName}
//                 className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
//               >
//                 <div 
//                   className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
//                   onClick={() => toggleRoleExpand(roleName)}
//                 >
//                   <div className="flex items-center">
//                     <span className="font-medium text-gray-800">{roleName}</span>
//                     <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
//                       status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
//                     }`}>
//                       {status}
//                     </span>
//                   </div>
//                   <ChevronDown 
//                     size={18} 
//                     className={`text-gray-500 transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""}`}
//                   />
//                 </div>
                
//                 {isExpanded && (
//                   <div className="p-4 border-t border-gray-200 bg-white">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {Object.entries(groupedByModule).map(([module, actions]) => (
//                         <div
//                           key={module}
//                           className="border border-gray-200 rounded-md p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
//                         >
//                           <h4 className="font-medium text-gray-800 mb-2">{module}</h4>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                             {actions.map((action) => (
//                               <div key={action} className="flex items-center bg-white p-2 rounded border border-gray-200">
//                                 <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-2">
//                                   <span className="text-white text-xs">✓</span>
//                                 </span>
//                                 <span className="text-sm text-gray-700">{action}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoleAssignmentSummary;

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface RoleAssignmentSummaryProps {
  groupedRoleMappings: Record<string, any[]>;
}

const RoleAssignmentSummary: React.FC<RoleAssignmentSummaryProps> = ({ groupedRoleMappings }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});

  const toggleRoleExpand = (roleName: string) => {
    setExpandedRoles(prev => ({
      ...prev,
      [roleName]: !prev[roleName]
    }));
  };

  const filteredRoleMappings = Object.entries(groupedRoleMappings).filter(([roleName]) => 
    roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-white">
      <div className="mb-4 relative">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredRoleMappings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No role assignments found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRoleMappings.map(([roleName, entries]) => {
            const groupedByModule = entries.reduce((acc, item) => {
              if (!acc[item.module_name]) acc[item.module_name] = [];
              acc[item.module_name].push(item.action_name);
              return acc;
            }, {} as Record<string, string[]>);

            const status = entries[0]?.status || "active";
            const isExpanded = expandedRoles[roleName] || false;

            return (
              <div 
                key={roleName}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div 
                  className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                  onClick={() => toggleRoleExpand(roleName)}
                >
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">{roleName}</span>
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                      status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {status}
                    </span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-gray-500 transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""}`}
                  />
                </div>
                
                {isExpanded && (
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(groupedByModule).map(([module, actions]) => (
                        <div
                          key={module}
                          className="border border-gray-200 rounded-md p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                        >
                          <h4 className="font-medium text-gray-800 mb-2">{module}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {actions.map((action: any) => (
                              <div key={action} className="flex items-center bg-white p-2 rounded border border-gray-200">
                                <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-2">
                                  <span className="text-white text-xs">✓</span>
                                </span>
                                <span className="text-sm text-gray-700">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoleAssignmentSummary;