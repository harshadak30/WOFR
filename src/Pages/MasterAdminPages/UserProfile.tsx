// import React from "react";
// import { useLocation } from "react-router-dom";

// interface ModuleAccess {
//   crm: boolean;
//   project: boolean;
//   hr: boolean;
//   finance: boolean;
// }

// interface CompanyInfo {
//   name: string;
//   website: string;
//   industry: string;
//   location: string;
//   founded: number;
//   totalUsers: number;
//   activeUsers: number;
// }

// interface UserProfileProps {
//   userName: string;
//   email: string;
//   createdDate: string;
//   moduleAccess: ModuleAccess;
//   companyInfo: CompanyInfo;
// }

// const UserProfile: React.FC<UserProfileProps> = ({
//   createdDate,
//   moduleAccess,
//   companyInfo,
// }) => {
//   const { state } = useLocation();
//   const user = state?.user;
//   const roles = state?.roles || [];
//   const modules = state?.modules || [];
//   console.log(user, roles, modules);

//   return (
//     <div className="bg-white rounded-md shadow-sm w-full  mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
//         {/* User Information Section */}
//         <div className="space-y-6">
//           <div>
//             <h3 className="text-xs font-medium uppercase text-gray-500">
//               USER NAME
//             </h3>
//             <p className="mt-1 text-base font-medium">{user.id}</p>
//           </div>

//           <div>
//             <h3 className="text-xs font-medium uppercase text-gray-500">
//               name
//             </h3>
//             <p className="mt-1 text-base">{user.name}</p>
//           </div>
//           <div>
//             <h3 className="text-xs font-medium uppercase text-gray-500">
//               EMAIL
//             </h3>
//             <p className="mt-1 text-base">{user.email}</p>
//           </div>
//           <div>
//             <h3 className="text-xs font-medium uppercase text-gray-500">
//               CREATED DATE
//             </h3>
//             <p className="mt-1 text-base">{createdDate}</p>
//           </div>

//           <div>
//             <h3 className="text-xs font-medium uppercase text-gray-500">
//               COMPANY NAME
//             </h3>
//             <p className="mt-1 text-base font-medium">{companyInfo.name}</p>
//             <a
//               href={companyInfo.website}
//               className="text-blue-600 text-sm hover:underline"
//             >
//               {companyInfo.website}
//             </a>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-xs font-medium uppercase text-gray-500">
//                 INDUSTRY
//               </h3>
//               <p className="mt-1 text-base">{companyInfo.industry}</p>
//             </div>
//             <div>
//               <h3 className="text-xs font-medium uppercase text-gray-500">
//                 LOCATION
//               </h3>
//               <p className="mt-1 text-base">{companyInfo.location}</p>
//             </div>
//             <div>
//               <h3 className="text-xs font-medium uppercase text-gray-500">
//                 FOUNDED
//               </h3>
//               <p className="mt-1 text-base">{companyInfo.founded}</p>
//             </div>
//           </div>
//         </div>

//         {/* Modules Section */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xs font-medium uppercase text-gray-500">
//               MODULES
//             </h3>
//             {/* <button className="text-gray-500 hover:text-gray-700">
//               <Edit2 className="h-5 w-5" />
//             </button> */}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center space-x-2">
//               <div
//                 className={`flex items-center justify-center w-5 h-5 ${
//                   moduleAccess.crm ? "bg-indigo-600" : "bg-gray-200"
//                 } rounded`}
//               >
//                 {moduleAccess.crm && (
//                   <span className="text-white text-xs">✓</span>
//                 )}
//               </div>
//               <span className="text-base">CRM</span>
//             </div>

//             <div className="flex items-center space-x-2">
//               <div
//                 className={`flex items-center justify-center w-5 h-5 ${
//                   moduleAccess.project ? "bg-indigo-600" : "bg-gray-200"
//                 } rounded`}
//               >
//                 {moduleAccess.project && (
//                   <span className="text-white text-xs">✓</span>
//                 )}
//               </div>
//               <span className="text-base">Project</span>
//             </div>

//             <div className="flex items-center space-x-2">
//               <div
//                 className={`flex items-center justify-center w-5 h-5 ${
//                   moduleAccess.hr ? "bg-indigo-600" : "bg-gray-200"
//                 } rounded`}
//               >
//                 {moduleAccess.hr && (
//                   <span className="text-white text-xs">✓</span>
//                 )}
//               </div>
//               <span className="text-base">HR</span>
//             </div>

//             <div className="flex items-center space-x-2">
//               <div
//                 className={`flex items-center justify-center w-5 h-5 ${
//                   moduleAccess.finance ? "bg-indigo-600" : "bg-gray-200"
//                 } rounded`}
//               >
//                 {moduleAccess.finance && (
//                   <span className="text-white text-xs">✓</span>
//                 )}
//               </div>
//               <span className="text-base">Finance</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6 mt-12">
//             <div>
//               <h3 className="text-xs font-medium uppercase text-gray-500">
//                 TOTAL USERS
//               </h3>
//               <p className="mt-1 text-base">{companyInfo.totalUsers}</p>
//             </div>
//             <div>
//               <h3 className="text-xs font-medium uppercase text-green-600">
//                 ACTIVE USERS
//               </h3>
//               <p className="mt-1 text-base text-green-600">
//                 {companyInfo.activeUsers}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const sampleUserData: UserProfileProps = {
//   userName: "Vinay",
//   email: "Vinay@gmail.com",
//   createdDate: "01-04-2025",
//   moduleAccess: {
//     crm: true,
//     project: true,
//     hr: true,
//     finance: true,
//   },
//   companyInfo: {
//     name: "Tech Solutions International",
//     website: "www.techsolutions.com",
//     industry: "Information Technology",
//     location: "San Francisco, CA",
//     founded: 2015,
//     totalUsers: 100,
//     activeUsers: 80,
//   },
// };

// export default () => <UserProfile {...sampleUserData} />;


import  { useMemo } from "react";


// Types
interface ModuleAccess {
  crm: boolean;
  project: boolean;
  hr: boolean;
  finance: boolean;
}


interface CompanyInfo {
  name: string;
  website: string;
  industry: string;
  location: string;
  founded: number;
  totalUsers: number;
  activeUsers: number;
}


interface UserProfileProps {
  userName: string;
  email: string;
  createdDate: string;
  moduleAccess: ModuleAccess;
  companyInfo: CompanyInfo;
}


// Module item component for better code reuse
const ModuleItem = ({ name, isActive }) => (
  <div className="flex items-center space-x-2">
    <div
      className={`flex items-center justify-center w-5 h-5 ${
        isActive ? "bg-indigo-600" : "bg-gray-200"
      } rounded`}
    >
      {isActive && <span className="text-white text-xs">✓</span>}
    </div>
    <span className="text-base">{name}</span>
  </div>
);


// Info section component for better code reuse
const InfoItem = ({ label, value, className = "" }) => (
  <div className={className}>
    <h3 className="text-xs font-medium uppercase text-gray-500">{label}</h3>
    <p className="mt-1 text-base">{value}</p>
  </div>
);


const UserProfile = ({
  userName,
  email,
  createdDate,
  moduleAccess,
  companyInfo,
}) => {
  // For demo purposes, creating a mock user object with the props
  const user = { id: userName, name: userName, email };


  // Memoize modules rendering to prevent unnecessary re-renders
  const moduleItems = useMemo(() => [
    { name: "CRM", isActive: moduleAccess.crm },
    { name: "Project", isActive: moduleAccess.project },
    { name: "HR", isActive: moduleAccess.hr },
    { name: "Finance", isActive: moduleAccess.finance },
  ], [moduleAccess]);


  return (
    <div className="bg-white rounded-md shadow-sm w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 lg:p-10">
        {/* User Information Section */}
        <div className="space-y-4 md:space-y-6">
          <InfoItem label="USER NAME" value={user.id} />
          <InfoItem label="NAME" value={user.name} />
          <InfoItem label="EMAIL" value={user.email} />
          <InfoItem label="CREATED DATE" value={createdDate} />


          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              COMPANY NAME
            </h3>
            <p className="mt-1 text-base font-medium">{companyInfo.name}</p>
            <a
              href={companyInfo.website}
              className="text-blue-600 text-sm hover:underline"
              rel="noopener noreferrer"
            >
              {companyInfo.website}
            </a>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <InfoItem label="INDUSTRY" value={companyInfo.industry} />
            <InfoItem label="LOCATION" value={companyInfo.location} />
            <InfoItem label="FOUNDED" value={companyInfo.founded} />
          </div>
        </div>


        {/* Modules Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium uppercase text-gray-500">
              MODULES
            </h3>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {moduleItems.map((module, index) => (
              <ModuleItem
                key={index}
                name={module.name}
                isActive={module.isActive}
              />
            ))}
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
            <InfoItem
              label="TOTAL USERS"
              value={companyInfo.totalUsers}
            />
            <div>
              <h3 className="text-xs font-medium uppercase text-green-600">
                ACTIVE USERS
              </h3>
              <p className="mt-1 text-base text-green-600">
                {companyInfo.activeUsers}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const sampleUserData: UserProfileProps = {
  userName: "Vinay",
  email: "Vinay@gmail.com",
  createdDate: "01-04-2025",
  moduleAccess: {
    crm: true,
    project: true,
    hr: true,
    finance: true,
  },
  companyInfo: {
    name: "Tech Solutions International",
    website: "www.techsolutions.com",
    industry: "Information Technology",
    location: "San Francisco, CA",
    founded: 2015,
    totalUsers: 100,
    activeUsers: 80,
  },
};


export default () => <UserProfile {...sampleUserData} />;
