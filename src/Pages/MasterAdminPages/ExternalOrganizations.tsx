// import React, { useEffect, useState } from "react";
// import { ChevronDown, Edit2 } from "lucide-react";
// import TableHeader from "../../component/common/ui/TableHeader";
// import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
// import { UserData } from "../../types";
// import { moduleOptions, roleOptions, userData } from "../../data/mockData";
// import Toggle from "../../component/common/ui/Toggle";
// import Pagination from "../../component/common/Pagination";
// import { useNavigate } from "react-router-dom";
// import axios from "../../helper/axios";

// interface ExternalOrganizationUserProps {
//   isReadOnly: boolean;
//   searchTerm?: string; // Make searchTerm optional
// }

// const ExternalOrganizations: React.FC<ExternalOrganizationUserProps> = ({
//   isReadOnly,
//   searchTerm = "",
// }) => {
//   const [users, setUsers] = useState<UserData[]>(userData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const [selectedUser, setSelectedUser] = useState<{
//     id: number;
//     type: "role" | "module";
//   } | null>(null);

//   const [userSelectedRoles, setUserSelectedRoles] = useState<
//     Record<number, string[]>
//   >({});
//   const [userSelectedModules, setUserSelectedModules] = useState<
//     Record<number, string[]>
//   >({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.OrgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (user.phone &&
//         user.phone.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const totalItems = filteredUsers.length;
//   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userType = localStorage.getItem("user_type");
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `api/users/v1/all-users`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           }
//         );
//         console.log("response users", response);

//         const rawUsers = response.data.data.tenant_users;

//         const mappedUsers: UserData[] = rawUsers.map(
//           (user: any, index: number) => ({
//             id: index + 1, // You can use `user.tenant_user_id` if it's guaranteed to be unique
//             name: user.name,
//             email: user.email,
//             OrgName: user.tenant_name,
//             created: new Date(user.created_at).toLocaleDateString(),
//             enabled: true,
//           })
//         );

//         setUsers(mappedUsers);
//       } catch (err: any) {
//         setError("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userType === "master_admin") {
//       fetchUsers();
//     }
//   }, []);

//   const handleToggleChange = (id: number) => {
//     if (isReadOnly) return;
//     setUsers(
//       users.map((user) =>
//         user.id === id ? { ...user, enabled: !user.enabled } : user
//       )
//     );
//   };

//   const handleApplyRoles = (userId: number, selectedRoles: string[]) => {
//     if (isReadOnly) return;
//     setUserSelectedRoles({
//       ...userSelectedRoles,
//       [userId]: selectedRoles,
//     });
//     setSelectedUser(null);
//   };

//   const handleToNavigate = (user: UserData) => {
//     navigate(`userDetails/${user.id}`, {
//       state: {
//         user,
//         roles: userSelectedRoles[user.id] || [],
//         modules: userSelectedModules[user.id] || [],
//       },
//     });
//   };

//   const handleResetRoles = (userId: number) => {
//     if (isReadOnly) return;
//     setUserSelectedRoles({
//       ...userSelectedRoles,
//       [userId]: [],
//     });
//   };

//   const toggleDropdown = (userId: number, type: "role" | "module") => {
//     if (isReadOnly) return;
//     setSelectedUser(
//       selectedUser?.id === userId && selectedUser?.type === type
//         ? null
//         : { id: userId, type }
//     );
//   };

//   // Get display text for selected items
//   const getSelectedText = (userId: number, type: "role" | "module") => {
//     const items =
//       type === "role" ? userSelectedRoles[userId] : userSelectedModules[userId];
//     if (!items?.length) return type === "role" ? "Roles" : "Standard";

//     const options = type === "role" ? roleOptions : moduleOptions;
//     const selectedLabels = items
//       .map((id) => options.find((opt) => opt.id === id)?.label)
//       .filter(Boolean);

//     return (
//       <div className="relative group">
//         <span>{`${selectedLabels.length} Selected`}</span>
//         <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md p-2 hidden group-hover:block z-50 min-w-[200px]">
//           <ul className="text-sm">
//             {selectedLabels.map((label, index) => (
//               <li key={index} className="py-1">
//                 {label}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-gray-50">
//       <div className="max-w-8xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <TableHeader className="pl-6">ITEM</TableHeader>
//                   <TableHeader>ORGANIZATION NAME</TableHeader>
//                   <TableHeader>USER</TableHeader>
//                   <TableHeader>EMAIL</TableHeader>
//                   <TableHeader>PHONE</TableHeader>
//                   <TableHeader>ROLES</TableHeader>
//                   <TableHeader>CREATED</TableHeader>
//                   <TableHeader>EDIT</TableHeader>
//                   <TableHeader>ENABLE/DISABLE</TableHeader>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredUsers.map((user) => (
//                   <tr
//                     key={user.id}
//                     className={`hover:bg-gray-50 ${
//                       isReadOnly ? "cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {user.id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {user.OrgName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {user.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {user.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {user.phone}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="relative">
//                         <button
//                           onClick={() => toggleDropdown(user.id, "role")}
//                           className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${
//                             isReadOnly
//                               ? "cursor-not-allowed opacity-75"
//                               : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                           }`}
//                           disabled={isReadOnly}
//                         >
//                           {getSelectedText(user.id, "role")}
//                           <ChevronDown size={16} className="ml-2" />
//                         </button>

//                         {!isReadOnly &&
//                           selectedUser?.id === user.id &&
//                           selectedUser?.type === "role" && (
//                             <div className="absolute z-10 mt-1 w-72">
//                               <MultiSelectDropdown
//                                 title="Roles"
//                                 options={roleOptions}
//                                 selectedOptions={
//                                   userSelectedRoles[user.id] || []
//                                 }
//                                 onApply={(selected) =>
//                                   handleApplyRoles(user.id, selected)
//                                 }
//                                 onReset={() => handleResetRoles(user.id)}
//                               />
//                             </div>
//                           )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {user.created}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         className="text-gray-500 hover:text-gray-700"
//                         onClick={() => handleToNavigate(user)}
//                       >
//                         <Edit2 size={18} />
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <Toggle
//                         enabled={user.enabled}
//                         onChange={() => handleToggleChange(user.id)}
//                         className={isReadOnly ? "opacity-50" : ""}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               totalItems={totalItems}
//               itemsPerPage={itemsPerPage}
//               onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExternalOrganizations;

import React, { useState, useEffect } from "react";
import { ChevronDown, Edit2 } from "lucide-react";
import TableHeader from "../../component/common/ui/TableHeader";
import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
import { UserData } from "../../types";
import { moduleOptions, roleOptions } from "../../data/mockData";
import Toggle from "../../component/common/ui/Toggle";
import Pagination from "../../component/common/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ExternalOrganizationUserProps {
  isReadOnly: boolean;
  searchTerm?: string;
}

const ExternalOrganizations: React.FC<ExternalOrganizationUserProps> = ({
  isReadOnly,
  searchTerm = "",
}) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moduleDropdownOptions, setModuleDropdownOptions] = useState<
  { id: string; label: string }[]
>([]);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    type: "role" | "module";
  } | null>(null);

  const [userSelectedRoles, setUserSelectedRoles] = useState<
    Record<number, string[]>
  >({});
  const [userSelectedModules, setUserSelectedModules] = useState<
    Record<number, string[]>
  >({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.29.82:8000/api/users/v1/all-users",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDAwMDMiLCJ1c2VyX3R5cGUiOiJtYXN0ZXJfYWRtaW4iLCJleHAiOjE3NTA4NDMxNDIuOTE3ODQzM30.8NzUI3F2qy_JRbRuUyzdTYj1HdeFan-MNJEYZmpfakQ",
            },
          }
        );
console.log(response.data);

        const transformed = response.data.map((user: any, index: number) => ({
          id: index + 1,
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          user_type: user.user_type,
          is_verified: user.is_verified,
          organization_name: user.organization_name || "N/A",
          status: user.status,
          created_at: user.created_at,
          enabled: user.status === "active",
        }));

        setUsers(transformed);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const userType = localStorage.getItem("user_type");

  //   const fetchRoles = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         `http://192.168.29.82:8000/api/v1/modules?page=1&limit=10&sort_by=module_id&order=asc`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );
  //       console.log("modules_response", response.data.data.modules);

     
  //     } catch (err) {
  //       setError("Failed to fetch user roles");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

   
  //     fetchRoles();
  
  // }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
  
    const fetchModules = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://192.168.29.82:8000/api/v1/modules?page=1&limit=10&sort_by=module_id&order=asc",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
  
        const modules = response.data.data.modules || [];
  
        const formattedModules = modules.map((module: any) => ({
          id: String(module.module_id),
          label: module.module_name,
        }));
  
        setModuleDropdownOptions(formattedModules);
      } catch (err) {
        console.error("Failed to fetch modules:", err);
        setError("Failed to fetch modules");
      } finally {
        setLoading(false);
      }
    };
  
    fetchModules();
  }, []);
  

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleToggleChange = (id: number) => {
    if (isReadOnly) return;
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, enabled: !user.enabled } : user
      )
    );
  };

  const handleApplyRoles = (userId: number, selectedRoles: string[]) => {
    if (isReadOnly) return;
    setUserSelectedRoles({
      ...userSelectedRoles,
      [userId]: selectedRoles,
    });
    setSelectedUser(null);
  };

  const handleResetRoles = (userId: number) => {
    if (isReadOnly) return;
    setUserSelectedRoles({
      ...userSelectedRoles,
      [userId]: [],
    });
  };


  const handleApplyModules = (userId: number, selectedModules: string[]) => {
    if (isReadOnly) return;
    setUserSelectedModules({
      ...userSelectedModules,
      [userId]: selectedModules,
    });
    setSelectedUser(null);
  };

  
  const handleResetModules = (userId: number) => {
    if (isReadOnly) return;
    setUserSelectedModules({
      ...userSelectedModules,
      [userId]: [],
    });
  };

  const handleToNavigate = (user: UserData) => {
    navigate(`userDetails/${user.user_id}`, {
      state: {
        user,
        roles: userSelectedRoles[user.id] || [],
        modules: userSelectedModules[user.id] || [],
      },
    });
  };

  const toggleDropdown = (userId: number, type: "role" | "module") => {
    if (isReadOnly) return;
    setSelectedUser(
      selectedUser?.id === userId && selectedUser?.type === type
        ? null
        : { id: userId, type }
    );
  };

  const getSelectedText = (userId: number, type: "role" | "module") => {
    const items =
      type === "role" ? userSelectedRoles[userId] : userSelectedModules[userId];
    if (!items?.length) return type === "role" ? "Roles" : "Modules";

    const options = type === "role" ? roleOptions : moduleOptions;
    const selectedLabels = items
      .map((id) => options.find((opt) => opt.id === id)?.label)
      .filter(Boolean);

    return (
      <div className="relative group">
        <span>{`${selectedLabels.length} Selected`}</span>
        <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md p-2 hidden group-hover:block z-50 min-w-[200px]">
          <ul className="text-sm">
            {selectedLabels.map((label, index) => (
              <li key={index} className="py-1">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader className="pl-6">ITEM</TableHeader>
                  <TableHeader>ORGANIZATION NAME</TableHeader>
                  <TableHeader>USER</TableHeader>
                  <TableHeader>EMAIL</TableHeader>
                  <TableHeader>PHONE</TableHeader>
                  <TableHeader>ROLES</TableHeader>
                  <TableHeader>Modules</TableHeader>
                  <TableHeader>CREATED</TableHeader>
                  <TableHeader>EDIT</TableHeader>
                  <TableHeader>ENABLE/DISABLE</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((user) => (
                  <tr
                    key={user.user_id}
                    className={`hover:bg-gray-50 ${
                      isReadOnly ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.organization_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.phone_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(user.id, "role")}
                          className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${
                            isReadOnly
                              ? "cursor-not-allowed opacity-75"
                              : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          }`}
                          disabled={isReadOnly}
                        >
                          {getSelectedText(user.id, "role")}
                          <ChevronDown size={16} className="ml-2" />
                        </button>

                        {!isReadOnly &&
                          selectedUser?.id === user.id &&
                          selectedUser?.type === "role" && (
                            <div className="absolute z-10 mt-1 w-72">
                              <MultiSelectDropdown
                                title="Roles"
                                options={roleOptions}
                                selectedOptions={
                                  userSelectedRoles[user.id] || []
                                }
                                onApply={(selected) =>
                                  handleApplyRoles(user.id, selected)
                                }
                                onReset={() => handleResetRoles(user.id)}
                              />
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(user.id, "module")}
                          className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${
                            isReadOnly
                              ? "cursor-not-allowed opacity-75"
                              : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          }`}
                          disabled={isReadOnly}
                        >
                          {getSelectedText(user.id, "module")}
                          <ChevronDown size={16} className="ml-2" />
                        </button>

                        {!isReadOnly &&
                          selectedUser?.id === user.id &&
                          selectedUser?.type === "module" && (
                            <div className="absolute z-10 mt-1 w-72">
                              <MultiSelectDropdown
                                title="Modules"
                                options={moduleDropdownOptions}
                                selectedOptions={
                                  userSelectedModules[user.id] || []
                                }
                                onApply={(selected) =>
                                  handleApplyModules(user.id, selected)
                                }
                                onReset={() => handleResetModules(user.id)}
                              />
                            </div>
                          )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleToNavigate(user)}
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Toggle
                        enabled={user.enabled}
                        onChange={() => handleToggleChange(user.id)}
                        className={isReadOnly ? "opacity-50" : ""}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ExternalOrganizations;
