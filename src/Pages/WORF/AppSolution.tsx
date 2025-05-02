import React from "react";
import { Link } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
import {
  FaFileContract,
  FaUsers,
  FaTable,
  FaCalculator,
  FaBox,
  FaFileAlt,
  FaChartLine,
  FaFileInvoice,
  FaTasks,
} from "react-icons/fa";
import MainLayout from "../../Layout/MainLayout";
import backgroundImages from "../../../public/background";

const appData = [
  {
    title: "Lease Manager",
    description:
      "Streamline lease management and compliance with automated solutions",
    icon: <FaFileContract />,
    path: "/wofr/lease-intro", // Ensure this path is defined
  },
  {
    title: "ESOP Manager",
    description: "Efficiently manage employee stock ownership programs",
    icon: <FaUsers />,
    // path: "/Wofr2", // Add a valid path
  },
  {
    title: "Consol TB Generator",
    description: "Generate consolidated trial balances with ease",
    icon: <FaTable />,
    // path: "/Wofr3", // Add a valid path
  },
  {
    title: "EIR Calculator",
    description: "Calculate effective interest rates accurately",
    icon: <FaCalculator />,
    // path: "/Wofr4", // Add a valid path
  },
  {
    title: "Asset Manager",
    description: "Comprehensive asset management and tracking solution",
    icon: <FaBox />,
    // path: "/Wofr5", // Add a valid path
  },
  {
    title: "Disclosure Maker",
    description: "Generate compliant financial disclosures automatically",
    icon: <FaFileAlt />,
    // path: "/Wofr6", // Add a valid path
  },
  {
    title: "MIS Dashboard",
    description: "Create custom management information system dashboards",
    icon: <FaChartLine />,
    // path: "/Wofr7", // Add a valid path
  },
  {
    title: "FS Preparer",
    description: "Streamline financial statement preparation process",
    icon: <FaFileInvoice />,
    // path: "/Wofr8", // Add a valid path
  },
  {
    title: "Pre Accounting",
    description: "Simplify pre-accounting processes and workflows",
    icon: <FaTasks />,
    // path: "/Wofr9", // Add a valid path
  },
];

const AppSolutions: React.FC = () => {
  return (
    <MainLayout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003061] mt-4">
            Explore Our App Solutions
          </h1>
          <div>
            <img
              src={backgroundImages.moreToDiscoverBanner}
              alt="WOFR Apps"
              className="mt-8 lg:mt-14 w-auto max-w-full"
            />
          </div>{" "}
          <p className="text-gray-600 text-[25px] mt-10 lg:mt-14 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Gravida convallis neque
            pulvinar turpis pharetra erat vulputate.
          </p>
        </section>

        {/* App Cards */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-screen-2xl mx-auto">
            {appData.map((app, index) => (
              <Link
                to={app.path || "/default-path"}
                key={index}
                className="w-full h-full"
              >
                <div className="flex flex-col justify-between h-full p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-100 hover:border-[#008F98] transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-50 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                      <div className="text-xl md:text-2xl text-[#003061]">
                        {app.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl text-[#003061] mb-1 md:mb-2">
                        {app.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0 py-10 lg:py-16 px-4 mt-8">
          <Link
            to="/login"
            className="flex items-center justify-center w-full sm:w-auto px-6 md:px-8 py-3 rounded text-white bg-[#008F98] hover:bg-[#007a82] transition-colors mb-6 sm:mb-0"
          >
            Already a user? Sign In
            <FaCircleArrowRight className="text-white bg-[#003061] rounded-full ml-2 md:ml-3 text-lg p-1 w-5 h-5 md:w-6 md:h-6" />
          </Link>

          <Link
            to="/free-trial"
            className="flex items-center justify-center w-full sm:w-auto bg-[#008F98] text-white px-6 md:px-8 py-3 rounded hover:bg-[#007a82] transition-colors"
          >
            Try WOFR Apps for Free
            <FaCircleArrowRight className="text-white bg-[#003061] rounded-full ml-2 md:ml-3 text-lg p-1 w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default AppSolutions;
