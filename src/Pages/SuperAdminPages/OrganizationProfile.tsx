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
    <div className="bg-white rounded-md shadow-sm w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              COMPANY NAME
            </h3>
            <p className="mt-1 text-base font-medium">{companyInfo.name}</p>
            <a
              href={companyInfo.tenant_id}
              className="text-blue-600 text-sm hover:underline"
            >
              {companyInfo.tenant_id}
            </a>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              organization_type
            </h3>
            <p className="mt-1 text-base">{companyInfo.organization_type}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              registration_tax_id
            </h3>
            <p className="mt-1 text-base">{companyInfo.registration_tax_id}</p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              CREATED DATE
            </h3>
            <p className="mt-1 text-base">{createdDate}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              address{" "}
            </h3>
            <p className="mt-1 text-base">{companyInfo.address}</p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-600">
              country
            </h3>
            <p className="mt-1 text-base text-gray-600">
              {/* {companyInfo.country} */} India
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-600">
              zip_postal_code
            </h3>
            <p className="mt-1 text-base text-gray-600">
              {companyInfo.zip_postal_code}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              industry_sector
            </h3>
            <p className="mt-1 text-base">{companyInfo.industry_sector}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrganizationDashboard = () => {
  const [profileData, setProfileData] = useState<UserProfileProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDefaultDashboard, setShowDefaultDashboard] = useState(false);
  const navigate = useNavigate();

  const handletonavigate = () => {
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
console.log(response);

const tenantData = response.data?.data?.tenants?.[0];

        if (!tenantData) {
          setShowDefaultDashboard(true);
        } else {
          const transformedData: UserProfileProps = {
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
          };

          setProfileData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching organization profile:", error);
        setShowDefaultDashboard(true); // Error fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (showDefaultDashboard) {
    return (
      <div className="flex items-center justify-center">
        <p className=" mt-10 text-gray-600">No data....</p>
        <p className=" mt-10 text-gray-600">
          Go back to your organization Form
        </p>
        <button
          className=" w-2/5 mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-md transition duration-300 text-lg"
          onClick={handletonavigate}
        >
          Organization Form
        </button>
      </div>
    );
  }

  return profileData ? (
    <OrganizationProfile {...profileData} />
  ) : (
    <p className="text-center mt-10 text-red-600">Something went wrong.</p>
  );
};

export default OrganizationDashboard;
