import { motion } from "framer-motion";
import backgroundImages from "../../../public/background/index";
import icons from "../../../public/icons/index";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  const [flagVisible, setFlagVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    // Set flag visible immediately on load
    setFlagVisible(true);

    // Delay the header appearance for a smoother sequence
    const timer = setTimeout(() => {
      setHeaderVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      <header className="text-center px-4 sm:px-6 md:px-8 lg:px-10 mx-auto w-full flex justify-center items-center py-5 max-w-full overflow-hidden">
        <h1 className="font-bold text-black-900 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%]">
          Experience Seamless Financial Management with WOFR
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 nx-5">
        {/* Lease Management Section */}
        <div className="bg-gray-50 rounded-3xl px-6 md:px-10 pt-8 md:pt-10 m-2 md:m-5">
          <div className="flex items-start mb-4">
            <img
              src={icons.phone}
              alt="phone"
              className="w-10 h-10 md:w-14 md:h-14"
            />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-3 mt-6 md:mt-10 ml-2 md:ml-3">
            Manage Leases with Ease
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-gray-400 mb-6 md:mb-10 ml-2 md:ml-3">
            Gain full control over lease agreements while ensuring compliance.
          </p>

          {/* Hover group - Visa Cards */}
          <div className="relative overflow-hidden cursor-pointer h-52 sm:h-64 md:h-72 lg:h-80">
            {/* Container to control card positioning */}
            <div className="absolute inset-0 group">
              {/* Card 2 - Front (Positioned in front) */}
              <img
                src={backgroundImages.visaCardFront}
                alt="visaCardFront"
                className="w-40 sm:w-45 md:w-52 lg:w-60 absolute left-1/3 sm:left-1/4 top-16 sm:top-20 md:top-24
                      transition-all duration-[1500ms] ease-out transform z-0
                      group-hover:-translate-y-24 sm:group-hover:-translate-y-32 md:group-hover:-translate-y-40 delay-150"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />

              {/* Card 1 - Back (Positioned slightly behind) */}
              <img
                src={backgroundImages.visaCardBack}
                alt="visaCardBack"
                className="w-40 sm:w-45 md:w-52 lg:w-60 absolute left-2/4 sm:left-2/4 top-6 sm:top-8 md:top-10
                      transition-all duration-[1500ms] ease-out transform z-10
                      group-hover:-translate-y-24 sm:group-hover:-translate-y-32 md:group-hover:-translate-y-40"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            </div>
          </div>
        </div>
        {/* ESOP Administration Section */}
        <div className="bg-gray-50 rounded-3xl p-6 md:p-10 m-2 md:m-5">
          <div className="flex items-start mb-4">
            <img
              src={icons.graph}
              alt="graph"
              className="w-10 h-10 md:w-14 md:h-14"
            />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-3 mt-6 md:mt-10 ml-2 md:ml-3">
            Effortless ESOP Administration
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-gray-400 mb-6 md:mb-10 ml-2 md:ml-3">
            Simplify equity distribution and employee stock management.
          </p>
          {/* ESOP Graph Animation Container */}
          <div className="relative h-52 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
            {/* Container to prevent overflow and handle positioning */}
            <div className="absolute inset-0 flex items-center justify-center group">
              {/* Main graph image */}
              <img
                src={backgroundImages.featureStepTwo}
                className="w-60 sm:w-68 md:w-75 lg:w-85 transition-all duration-[1500ms] ease-out
                        transform group-hover:translate-y-2 group-hover:translate-x-2"
                alt="featureStepTwo"
              />
              {/* Overlay graph image */}
              <img
                src={backgroundImages.featureStepOne}
                alt="featureStepOne"
                className="w-40 sm:w-48 md:w-56 lg:w-64 transition-all duration-[1500ms] ease-out
                        transform absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2
                        group-hover:-translate-x-2 group-hover:translate-y-6"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.74, 1.2, 0.84, 1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trial Balance Section with Enhanced Animations */}
      {/* <div className="bg-gray-50 p-5 rounded-3xl overflow-hidden">
        <img
          src={icons.dollarIcon}
          alt="Dollar Icon"
          className="object-contain w-12 h-12 ml-10 mt-3"
        />
        <div className="mt-6 flex flex-col lg:flex-row">
          <div className="w-full lg:w-[40%] mt-3 m-4 lg:m-10">
            <h2 className="text-3xl lg:text-5xl font-semibold mb-1 w-full lg:w-[80%]">
              Automated Trial Balance Consolidation
            </h2>
            <p className="text-xl lg:text-3xl text-gray-400 mt-5 lg:mt-10">
              Streamline financial reporting with accurate TB generation.
            </p>
          </div>
         
          <div className="w-full lg:w-[60%] relative">
            <img
              src={backgroundImages.mapBackground}
              alt="World map visualization"
              className="w-full h-auto object-cover -mt-5 lg:-mt-20"
            />
           
            <div className={`absolute right-5 lg:-top-9 lg:right-20 w-1/6 lg:w-1/5 transform transition-all duration-700 ease-out ${flagVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <img
                src={backgroundImages.flagIcon}
                alt="Flag Icon"
                className="w-full h-auto"
              />
            </div>
           
            <div className={`absolute -top-5 lg:-top-20 left-5 lg:left-20 w-2/5 lg:w-2/4 transform transition-all duration-700 ease-out ${headerVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <img
                src={backgroundImages.featureHeader}
                alt="Feature Visualization"
                className="w-full transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* Trial Balance Section with Enhanced Animations */}
      <div className="bg-gray-50 p-5 rounded-3xl overflow-hidden">
        <img
          src={icons.dollarIcon}
          alt="Dollar Icon"
          className="object-contain w-12 h-12 ml-10 mt-3"
        />
        <div className=" flex flex-col lg:flex-row">
          <div className="w-full lg:w-[40%]  sm:ml-5 sm:my-5 lg:m-10">
            <h2 className="text-3xl 2xl:text-5xl lg:text-3xl  font-semibold  w-full lg:w-[80%]">
              Automated Trial Balance Consolidation
            </h2>
            <p className="text-xl 2xl:text-3xl lg:text-xl text-gray-400 mt-5 2xl:mt-10 lg:mt-5">
              Streamline financial reporting with accurate TB generation.
            </p>
          </div>

          <div className="w-full lg:w-[60%] relative pt-6">
            <img
              src={backgroundImages.mapBackground}
              alt="World map visualization"
              className="w-full h-auto object-cover -mt-5 lg:-mt-20"
            />

            {/* Mobile-friendly layout for flag and feature header */}
            <div className="flex flex-row justify-between absolute top-0 w-full px-2 sm:px-5">
              {/* Feature header with delayed animation - positioned left */}
              <div
                className={`w-1/2 transform transition-all duration-700 ease-out ${
                  headerVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-20 opacity-0"
                }
                       lg:absolute lg:-top-10 lg:left-30 lg:w-2/4`}
              >
                <img
                  src={backgroundImages.featureHeader}
                  alt="Feature Visualization"
                  className="w-4/5 transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Flag image with animation - positioned right */}
              <div
                className={`w-1/3 transform transition-all duration-700 ease-out ${
                  flagVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
                       lg:absolute lg:-top-9 lg:right-20 lg:w-1/5`}
              >
                <img
                  src={backgroundImages.flagIcon}
                  alt="Flag Icon"
                  className="w-4/5 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <div className="bg-gray-50 rounded-3xl p-10 relative lg:h-120 overflow-hidden ">
          <img src={icons.phone2} alt="Phone" className="w-14 h-14 mb-4" />
          <h3 className="text-3xl lg:text-4xl font-semibold mb-10 ">
            Hold money in 30+ currencies
          </h3>
          <img
            src={backgroundImages.mainBackground}
            alt="Currency Background"
            className="absolute bottom-0 w-full"
          />
        </div>


        <motion.div
          className="bg-gray-50 rounded-3xl p-10 relative h-120 overflow-hidden"
          initial={{ y: 0 }}
          whileHover={{ y: -20 }}
          whileTap={{ y: -5 }}
        >
          <img src={icons.list} alt="List Icon" className="w-14 h-14 mb-4" />
          <h3 className="text-3xl lg:text-4xl font-semibold mb-4 z-10 relative">
            Subscriptions you control in one place
          </h3>
          <img
            src={backgroundImages.featureStepThree}
            alt="Subscription BG"
            className="absolute bottom-0 w-full z-0"
          />
        </motion.div>


        <div className="bg-gray-50 rounded-3xl relative h-120 overflow-hidden cursor-pointer">
          <img
            src={backgroundImages.featureStepFour}
            alt="Product Features"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-10 bg-opacity-30 rounded-3xl">
            <h3 className="text-white text-3xl lg:text-4xl font-semibold mb-4">
              Check our other product features
            </h3>
            <button className="bg-[#008F98]  hover:bg-yellow-500 text-white px-6 py-5  mt-5 rounded-full font-medium transition-transform duration-300 hover:scale-105 w-1/3">
              View More {"->"}
            </button>
          </div>
        </div>
      </div> */}

      {/* Feature Cards - Responsive on all devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-10 px-4 sm:px-6 lg:px-0">
        {/* Multi-Currency */}
        <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-10 relative h-96 sm:h-100 lg:h-120 overflow-hidden">
          <img
            src={icons.phone2}
            alt="Phone"
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-4"
          />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-10">
            Hold money in 30+ currencies
          </h3>
          <img
            src={backgroundImages.mainBackground}
            alt="Currency Background"
            className="absolute bottom-0 left-0 w-full object-contain"
          />
        </div>

        {/* Subscriptions */}
        {/* Subscriptions */}
        <motion.div
          className="bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-10 relative h-96 sm:h-100 lg:h-120 overflow-hidden"
          initial={{ y: 0 }}
          whileTap={{ y: -5 }}
        >
          {/* List icon - stays in place */}
          <img
            src={icons.list}
            alt="List Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-4 relative z-10"
          />

          {/* H3 heading in its own motion div */}
          <motion.div
            className="relative z-10"
            initial={{ y: 20 }}
            whileHover={{ y: -10 }}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Subscriptions you control in one place
            </h3>

            {/* Background image in its own motion div */}
            <motion.img
              src={backgroundImages.featureStepThree}
              alt="Subscription BG"
              className="absolute bottom-0 left-0 w-full z-0 object-contain"
              initial={{ bottom: "-250px" }}
              whileHover={{
                bottom: "-250px", // Move up from -280px to -180px on hover
                y: -10, // Also apply the same upward movement as the heading
              }}
            />
          </motion.div>
        </motion.div>

        {/* Other Features */}
        <div className="bg-gray-50 rounded-3xl relative h-96 sm:h-100 lg:h-120 overflow-hidden cursor-pointer">
          <img
            src={backgroundImages.featureStepFour}
            alt="Product Features"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 lg:p-10 bg-opacity-30 rounded-3xl">
            <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
              Check our other product features
            </h3>
            <button className="bg-[#008F98] hover:bg-yellow-500 text-white px-1 py-2 sm:px-5 sm:py-3 lg:px-2 lg:py-3 mt-4 lg:mt-5 rounded-full font-medium transition-transform duration-300 hover:scale-105 inline-flex items-center justify-center gap-2 text-sm sm:text-base  w-[60%]">
              <span>View More</span>
              <ArrowRight size={18} className="inline-block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
