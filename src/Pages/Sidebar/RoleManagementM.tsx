// import React, { useState } from "react";
// import {  PlusCircle } from "lucide-react";
// import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

// import CreateRoleForm from "./CreateRoleForm";

// import Buttons from "../../component/common/Button/Buttons";
// import Modal from "../../component/common/ui/Modal";
// import RoleAssignmentSummary from "./RoleAssignmentSummary";
// import RoleTable from "./RoleTable";
// import MessageAlert from "../../component/common/ui/MessageAlert";
// import { useRoleManagement } from "../../hooks/useRoleManagement";

// const RoleManagementM: React.FC<{ isReadOnly: boolean }> = ({ isReadOnly }) => {
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);

//   const {

//     message,
//     setMessage,
//     isCreatingRole,
//     currentPage,
//     setCurrentPage,
//     itemsPerPage,
//     totalItems,
//     totalPages,
//     currentRoles,
//     roleModules,
//     roleActions,
//     selectedRole,
//     setSelectedRole,
//     handleApply,
//     handleToggleChange,
//     handleSaveAssignments,
//     handleCreateRole,

//     groupedRoleMappings,
//     moduleOptions,
//     actionOptions,
//   } = useRoleManagement(isReadOnly);

//   return (
//     <div className="mx-auto bg-white shadow rounded-lg overflow-hidden transition-all duration-200">
//       <div className="p-5 flex justify-between items-center border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//         <h2 className="text-xl font-bold text-gray-800">Role Management</h2>
//         {!isReadOnly && (
//           <div className="space-x-3">
//             <Buttons
//               onClick={() => setIsCreateModalOpen(true)}
//               className="transition-all duration-200 hover:scale-105"
//             >
//               <PlusCircle size={18} className="mr-2" />
//               Create Role
//             </Buttons>
//             <Buttons
//               onClick={handleSaveAssignments}
//               disabled={Object.keys(roleActions).length === 0}
//               className={`transition-all duration-200 ${
//                 Object.keys(roleActions).length > 0 ? "hover:scale-105" : "opacity-70"
//               }`}
//             >
//               Save Assignments
//             </Buttons>
//           </div>
//         )}
//       </div>

//       {message && (
//         <MessageAlert
//           message={message}
//           onClose={() => setMessage("")}
//           type={message.includes("failed") ? "error" : "success"}
//         />
//       )}

//       <Tabs activeTab={activeTab} onChange={setActiveTab}>
//         <TabList>
//           <Tab>Role Management</Tab>
//           <Tab>Assignment Summary</Tab>
//         </TabList>

//         <TabPanel>
//           <RoleTable
//             currentRoles={currentRoles}
//             indexOfFirstItem={currentPage * itemsPerPage - itemsPerPage}
//             roleModules={roleModules}
//             roleActions={roleActions}
//             selectedRole={selectedRole}
//             moduleOptions={moduleOptions}
//             actionOptions={actionOptions}
//             isReadOnly={isReadOnly}
//             toggleDropdown={(roleId, type) => {
//               if (isReadOnly) return;
//               setSelectedRole(
//                 selectedRole?.id === roleId && selectedRole?.type === type
//                   ? null
//                   : { id: roleId, type }
//               );
//             }}
//             handleApply={handleApply}
//             handleToggleChange={handleToggleChange}
//             currentPage={currentPage}
//             totalPages={totalPages}
//             totalItems={totalItems}
//             itemsPerPage={itemsPerPage}
//             onPageChange={setCurrentPage}
//           />
//         </TabPanel>

//         <TabPanel>
//           <RoleAssignmentSummary
//             groupedRoleMappings={groupedRoleMappings}
//           />
//         </TabPanel>
//       </Tabs>

//       <Modal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         title="Create New Role"
//       >
//         <CreateRoleForm
//           onSubmit={handleCreateRole}
//           onCancel={() => setIsCreateModalOpen(false)}
//           isLoading={isCreatingRole}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default RoleManagementM;

import React, { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import CreateRoleForm from "./CreateRoleForm";
import Buttons from "../../component/common/Button/Buttons";
import Modal from "../../component/common/ui/Modal";
import RoleTable from "./RoleTable";
import MessageAlert from "../../component/common/ui/MessageAlert";
import { useRoleManagement } from "../../hooks/useRoleManagement";

const RoleManagementM: React.FC<{ isReadOnly: boolean }> = ({ isReadOnly }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    roles,
    moduleActionPairs,
    message,
    setMessage,
    isCreatingRole,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    currentRoles,
    roleModules,
    roleActions,
    selectedRole,
    setSelectedRole,
    handleApply,
    handleToggleChange,
    handleSaveAssignments,
    handleCreateRole,
    moduleOptions,
    actionOptions,
    groupedRoleMappings,
  } = useRoleManagement(isReadOnly);

  const filteredRoles = currentRoles.filter(
    (role) =>
      role.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (role.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto bg-white shadow rounded-lg overflow-hidden transition-all duration-200">
      <div className="p-5 flex justify-between items-center border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-xl font-bold text-gray-800">Role Management</h2>
        {!isReadOnly && (
          <div className="space-x-3">
            <Buttons
              onClick={() => setIsCreateModalOpen(true)}
              className="transition-all duration-200 hover:scale-105"
            >
              <PlusCircle size={18} className="mr-2" />
              Create Role
            </Buttons>
            <Buttons
              onClick={handleSaveAssignments}
              disabled={Object.keys(roleActions).length === 0}
              className={`transition-all duration-200 ${
                Object.keys(roleActions).length > 0
                  ? "hover:scale-105"
                  : "opacity-70"
              }`}
            >
              Save Assignments
            </Buttons>
          </div>
        )}
      </div>

      {message && (
        <MessageAlert
          message={message}
          onClose={() => setMessage("")}
          type={
            message.includes("failed") || message.includes("Please select both")
              ? "error"
              : "success"
          }
        />
      )}

      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <RoleTable
        currentRoles={filteredRoles}
        indexOfFirstItem={currentPage * itemsPerPage - itemsPerPage}
        roleModules={roleModules}
        roleActions={roleActions}
        selectedRole={selectedRole}
        moduleOptions={moduleOptions}
        actionOptions={actionOptions}
        isReadOnly={isReadOnly}
        toggleDropdown={(roleId, type) => {
          if (isReadOnly) return;
          setSelectedRole(
            selectedRole?.id === roleId && selectedRole?.type === type
              ? null
              : { id: roleId, type }
          );
        }}
        handleApply={handleApply}
        handleToggleChange={handleToggleChange}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        groupedRoleMappings={groupedRoleMappings}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Role"
      >
        <CreateRoleForm
          onSubmit={handleCreateRole}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isCreatingRole}
        />
      </Modal>
    </div>
  );
};

export default RoleManagementM;
