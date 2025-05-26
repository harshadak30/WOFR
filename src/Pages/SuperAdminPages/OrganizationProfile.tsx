
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface ModuleAccess {
//   crm: boolean;
//   project: boolean;
//   hr: boolean;
//   finance: boolean;
// }

// interface CompanyInfo {
//   tenant_id: string;
//   name: string;
//   organization_type: string;
//   industry_sector: string;
//   registration_tax_id: string;
//   address: number;
//   country: number;
//   zip_postal_code: number;
//   created_at: number;
// }

// interface UserProfileProps {
//   createdDate: string;
//   moduleAccess: ModuleAccess;
//   companyInfo: CompanyInfo;
// }

// const OrganizationProfile: React.FC<UserProfileProps> = ({
//   createdDate,
//   moduleAccess,
//   companyInfo,
// }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg w-full  mx-auto  p-8">
//       <h2 className="text-2xl font-bold text-teal-700 mb-6  pb-2">Organization Profile</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           <ProfileItem label="Company Name" value={companyInfo.name} />
//           <ProfileItem label="Tenant ID" value={companyInfo.tenant_id} isLink />
//           <ProfileItem label="Organization Type" value={companyInfo.organization_type} />
//           <ProfileItem label="Tax ID" value={companyInfo.registration_tax_id} />
//           <ProfileItem label="Created Date" value={createdDate} />
//         </div>
//         <div className="space-y-4">
//           <ProfileItem label="Address" value={String(companyInfo.address)} />
//           <ProfileItem label="Country" value="India" />
//           <ProfileItem label="Postal Code" value={String(companyInfo.zip_postal_code)} />
//           <ProfileItem label="Industry Sector" value={companyInfo.industry_sector} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProfileItem = ({
//   label,
//   value,
//   isLink = false,
// }: {
//   label: string;
//   value: string;
//   isLink?: boolean;
// }) => (
//   <div>
//     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</h4>
//     {isLink ? (
//       <a href={value} className="text-sm text-blue-600 hover:underline break-words">
//         {value}
//       </a>
//     ) : (
//       <p className="text-sm text-gray-800">{value}</p>
//     )}
//   </div>
// );

// const OrganizationDashboard = () => {
//   const [profileData, setProfileData] = useState<UserProfileProps | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showDefaultDashboard, setShowDefaultDashboard] = useState(false);
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate("/dashboard/org-form");
//   };

//   useEffect(() => {
//     const fetchModules = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get(
//           "http://192.168.29.82:8000/api/v1/tenant?page=1&limit=10&sort_by=created_at&sort_order=asc",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const tenantData = response.data?.data?.tenants?.[0];
// console.log("aaaaaaaa",response.data?.data?.tenants);

//         if (!tenantData) {
//           setShowDefaultDashboard(true);
//         } else {
//           const transformedData: UserProfileProps = {
//             createdDate: tenantData.created_at || "N/A",
//             moduleAccess: {
//               crm: tenantData.modules?.includes("CRM"),
//               project: tenantData.modules?.includes("Project"),
//               hr: tenantData.modules?.includes("HR"),
//               finance: tenantData.modules?.includes("Finance"),
//             },
//             companyInfo: {
//               tenant_id: tenantData.tenant_id,
//               name: tenantData.name,
//               organization_type: tenantData.organization_type,
//               industry_sector: tenantData.industry_sector,
//               registration_tax_id: tenantData.registration_tax_id,
//               address: tenantData.address,
//               country: tenantData.country,
//               zip_postal_code: tenantData.zip_postal_code,
//               created_at: tenantData.created_at,
//             },
//           };

//           setProfileData(transformedData);
//         }
//       } catch (error) {
//         console.error("Error fetching organization profile:", error);
//         setShowDefaultDashboard(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchModules();
//   }, []);

//   if (isLoading) {
//     return <p className="text-center text-gray-500 mt-10">Loading organization data...</p>;
//   }

//   if (showDefaultDashboard) {
//     return (
//       <div className="flex flex-col items-center justify-center mt-20 space-y-4">
//         <p className="text-lg text-gray-700 font-medium">No organization data found.</p>
//         <p className="text-sm text-gray-500">Please fill out the organization form to proceed.</p>
//         <button
//           onClick={handleNavigate}
//           className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
//         >
//           Go to Organization Form
//         </button>
//       </div>
//     );
//   }

//   return profileData ? (
//     <OrganizationProfile {...profileData} />
//   ) : (
//     <p className="text-center mt-10 text-red-600">Something went wrong.</p>
//   );
// };

// export default OrganizationDashboard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModuleAccess {
  crm: boolean;
  project: boolean;
  hr: boolean;
  finance: boolean;
}

interface CompanyInfo {
  tenant_id: string;
  name: string;
  organization_type: string;
  industry_sector: string;
  registration_tax_id: string;
  address: number;
  country: number;
  zip_postal_code: number;
  created_at: number;
}

interface UserProfileProps {
  createdDate: string;
  moduleAccess: ModuleAccess;
  companyInfo: CompanyInfo;
}

const OrganizationProfile: React.FC<UserProfileProps> = ({
  createdDate,
  moduleAccess,
  companyInfo,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full  mx-auto  p-8">
      <h2 className="text-2xl font-bold text-teal-700 mb-6  pb-2">
        Organization Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <ProfileItem label="Company Name" value={companyInfo.name} />
          <ProfileItem label="Tenant ID" value={companyInfo.tenant_id} isLink />
          <ProfileItem
            label="Organization Type"
            value={companyInfo.organization_type}
          />
          <ProfileItem label="Tax ID" value={companyInfo.registration_tax_id} />
          <ProfileItem label="Created Date" value={createdDate} />
        </div>
        <div className="space-y-4">
          <ProfileItem label="Address" value={String(companyInfo.address)} />
          <ProfileItem label="Country" value="India" />
          <ProfileItem
            label="Postal Code"
            value={String(companyInfo.zip_postal_code)}
          />
          <ProfileItem
            label="Industry Sector"
            value={companyInfo.industry_sector}
          />
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) => (
  <div>
    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </h4>
    {isLink ? (
      <a
        href={value}
        className="text-sm text-blue-600 hover:underline break-words"
      >
        {value}
      </a>
    ) : (
      <p className="text-sm text-gray-800">{value}</p>
    )}
  </div>
);

const OrganizationDashboard = () => {
  const [profileData, setProfileData] = useState<UserProfileProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDefaultDashboard, setShowDefaultDashboard] = useState(false);
  const navigate = useNavigate();
  const [profileDataList, setProfileDataList] = useState<UserProfileProps[]>(
    []
  );

  const handleNavigate = () => {
    navigate("/dashboard/org-form");
  };

  useEffect(() => {
    const fetchModules = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://192.168.29.82:8000/api/v1/tenant?page=1&limit=10&sort_by=created_at&sort_order=asc",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tenantData = response.data?.data?.tenants?.[0];
        console.log("aaaaaaaa", response.data?.data?.tenants);


        const tenantList = response.data?.data?.tenants || [];

        if (!tenantList.length) {
          setShowDefaultDashboard(true);
        } else {
          const transformedList = tenantList.map((tenantData: any) => ({
            createdDate: tenantData.created_at || "N/A",
            moduleAccess: {
              crm: tenantData.modules?.includes("CRM"),
              project: tenantData.modules?.includes("Project"),
              hr: tenantData.modules?.includes("HR"),
              finance: tenantData.modules?.includes("Finance"),
            },
            companyInfo: {
              tenant_id: tenantData.tenant_id,
              name: tenantData.name,
              organization_type: tenantData.organization_type,
              industry_sector: tenantData.industry_sector,
              registration_tax_id: tenantData.registration_tax_id,
              address: tenantData.address,
              country: tenantData.country,
              zip_postal_code: tenantData.zip_postal_code,
              created_at: tenantData.created_at,
            },
          }));
        
          setProfileDataList(transformedList);
        }
        

        // if (!tenantData) {
        //   setShowDefaultDashboard(true);
        // } else {
        //   const transformedData: UserProfileProps = {
        //     createdDate: tenantData.created_at || "N/A",
        //     moduleAccess: {
        //       crm: tenantData.modules?.includes("CRM"),
        //       project: tenantData.modules?.includes("Project"),
        //       hr: tenantData.modules?.includes("HR"),
        //       finance: tenantData.modules?.includes("Finance"),
        //     },
        //     companyInfo: {
        //       tenant_id: tenantData.tenant_id,
        //       name: tenantData.name,
        //       organization_type: tenantData.organization_type,
        //       industry_sector: tenantData.industry_sector,
        //       registration_tax_id: tenantData.registration_tax_id,
        //       address: tenantData.address,
        //       country: tenantData.country,
        //       zip_postal_code: tenantData.zip_postal_code,
        //       created_at: tenantData.created_at,
        //     },
        //   };

        //   setProfileData(transformedData);
        // }
      } catch (error) {
        console.error("Error fetching organization profile:", error);
        setShowDefaultDashboard(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading organization data...
      </p>
    );
  }

  if (showDefaultDashboard) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 space-y-4">
        <p className="text-lg text-gray-700 font-medium">
          No organization data found.
        </p>
        <p className="text-sm text-gray-500">
          Please fill out the organization form to proceed.
        </p>
        <button
          onClick={handleNavigate}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Go to Organization Form
        </button>
      </div>
    );
  }

  // return profileData ? (
  //   <OrganizationProfile {...profileData} />
  // ) : (
  //   <p className="text-center mt-10 text-red-600">Something went wrong.</p>
  // );
  return profileDataList.length ? (
    <div className="space-y-8">
      {profileDataList.map((profile, index) => (
        <OrganizationProfile key={index} {...profile} />
      ))}
    </div>
  ) : (
    <p className="text-center mt-10 text-red-600">Something went wrong.</p>
  );
};

export default OrganizationDashboard;
