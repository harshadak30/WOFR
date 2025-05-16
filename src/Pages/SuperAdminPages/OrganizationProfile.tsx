import React from "react";

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
    <div className="bg-white rounded-md shadow-sm w-full  mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              COMPANY NAME
            </h3>
            <p className="mt-1 text-base font-medium">{companyInfo.name}</p>
            <a
              href={companyInfo.website}
              className="text-blue-600 text-sm hover:underline"
            >
              {companyInfo.website}
            </a>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500">
              CREATED DATE
            </h3>
            <p className="mt-1 text-base">{createdDate}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-medium uppercase text-gray-500">
                INDUSTRY
              </h3>
              <p className="mt-1 text-base">{companyInfo.industry}</p>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase text-gray-500">
                LOCATION
              </h3>
              <p className="mt-1 text-base">{companyInfo.location}</p>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase text-gray-500">
                FOUNDED
              </h3>
              <p className="mt-1 text-base">{companyInfo.founded}</p>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium uppercase text-gray-500">
              MODULES
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center justify-center w-5 h-5 ${
                  moduleAccess.crm ? "bg-indigo-600" : "bg-gray-200"
                } rounded`}
              >
                {moduleAccess.crm && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <span className="text-base">CRM</span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center justify-center w-5 h-5 ${
                  moduleAccess.project ? "bg-indigo-600" : "bg-gray-200"
                } rounded`}
              >
                {moduleAccess.project && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <span className="text-base">Project</span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center justify-center w-5 h-5 ${
                  moduleAccess.hr ? "bg-indigo-600" : "bg-gray-200"
                } rounded`}
              >
                {moduleAccess.hr && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <span className="text-base">HR</span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center justify-center w-5 h-5 ${
                  moduleAccess.finance ? "bg-indigo-600" : "bg-gray-200"
                } rounded`}
              >
                {moduleAccess.finance && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <span className="text-base">Finance</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div>
              <h3 className="text-xs font-medium uppercase text-gray-500">
                TOTAL USERS
              </h3>
              <p className="mt-1 text-base">{companyInfo.totalUsers}</p>
            </div>
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

export default () => <OrganizationProfile {...sampleUserData} />;
