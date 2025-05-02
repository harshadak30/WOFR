import { motion } from "framer-motion";
import backgroundImages from "../../../public/background/index";
import icons from "../../../public/icons/index";

export default function TestimonialsSection() {
  return (
    <div className="">
      <header className="text-center m-10 w-full mb-6 flex justify-center items-center py-5">
        <h1 className="lg:text-6xl font-bold text-black-900 text-center w-[70%]  text-5xl">
          {" "}
          Experience Seamless Financial Management with WOFR
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 nx-5">
        {/* Lease Management Section */}
        <div className="bg-gray-50 rounded-3xl px-10 pt-10 m-5">
          <div className="flex items-start mb-4">
            <img src={icons.phone} alt="phone" className="size-15" />
          </div>
          <h2 className="lg:text-4xl  text-3xl font-semibold mb-3 mt-10 ml-3">
            Manage Leases with Ease
          </h2>
          <p className="text-normal text-gray-400 mb-10 ml-3 lg:text-xl">
            Gain full control over lease agreements while ensuring compliance.
          </p>

          {/* Hover group */}
          <div className="flex items-center justify-center group relative overflow-hidden  cursor-pointer pr-0 m-0 pl-5">
            {/* Card 1 */}
            <img
              src={backgroundImages.visaCardFront}
              alt="visaCardFront"
              className="w-2/5 relative top-0 transition-all duration-[1500ms] ease-out transform group-hover:-translate-y-40 bg-cover"
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />

            {/* Card 2 */}
            <img
              src={backgroundImages.visaCardBack}
              alt="visaCardBack"
              className="w-2/5 relative -left-20 top-40 transition-all duration-[1500ms] ease-out transform group-hover:-translate-y-40 delay-150"
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </div>
        </div>

        {/* ESOP Administration Section */}
        <div className="bg-gray-50 rounded-3xl p-10 m-5">
          <div className="flex items-start mb-4">
            <img src={icons.graph} alt="graph" className="size-15" />
          </div>

          <h2 className="lg:text-4xl text-3xl font-semibold  mb-3 mt-10 ml-3">
            Effortless ESOP Administration
          </h2>
          <p className="text-normal text-gray-400 mb-10 ml-3 lg:text-xl">
            Simplify equity distribution and employee stock management.
          </p>
          <div className="flex items-center justify-center group">
            <div className="relative items-center">
              <img
                src={backgroundImages.featureStepTwo}
                className=" w-3/3  -top-20 left-50  transition-all duration-[1500ms] ease-out group-hover:-translate-y-5 group-hover:translate-x-2 "
                alt="featureStepTwo"
                // className="w-full"
              />
              <img
                src={backgroundImages.featureStepOne}
                alt="featureStepOne"
                className="absolute -top-20 left-50 w-2/3 h-90 transition-all duration-[1500ms] ease-out group-hover:-translate-x-10 group-hover:translate-y-10 "
                style={{
                  transitionTimingFunction: "cubic-bezier(0.74, 1.2, 0.84, 1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trial Balance Section */}
      <div className="bg-gray-50 p-5 rounded-3xl">
        <img
          src={icons.dollarIcon}
          alt=""
          className="object-contain size-12 ml-10 mt-3"
        />
        <div className=" mt-6 flex ">
          <div className="w-[40%] mt-3 m-10 ">
            <h2 className="text-5xl font-semibold mb-1 w-[80%]">
              Automated Trial Balance Consolidation
            </h2>
            <p className="text-3xl text-gray-400 mt-10">
              Streamline financial reporting with accurate TB generation.
            </p>
          </div>

          <div className=" w-[60%] relative">
            <img
              src={backgroundImages.mapBackground}
              alt="World map visualization"
              className="w-full h-auto object-cover -mt-20  "
            />
            <img
              src={backgroundImages.featureHeader}
              alt="frame18"
              className="absolute -top-20 left-20 w-2/4 transition-transform duration-300 hover:scale-110"
            />
            <div>
              <img
                src={backgroundImages.flagIcon}
                alt=""
                className="absolute -top-9 left-130 w-1/5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {/* Multi-Currency */}
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

        {/* Subscriptions */}
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

        {/* Other Features */}
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
      </div>
    </div>
  );
}
