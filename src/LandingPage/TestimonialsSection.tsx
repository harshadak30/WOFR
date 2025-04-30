
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <div className="">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Experience Seamless Financial Management with WOFR
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Lease Management Section */}
        <div className="bg-gray-50 rounded-3xl  p-5">
  <div className="flex items-start mb-4">
    <img src="/icons/phone.png" alt="" className="size-12" />
  </div>
  <h2 className="text-2xl font-semibold mb-3 mt-10 ml-3">
    Manage Leases with Ease
  </h2>
  <p className="text-normal text-gray-600 mb-10 ml-3">
    Gain full control over lease agreements while ensuring compliance.
  </p>

  {/* Hover group */}
  <div className="flex items-center justify-center group relative overflow-hidden h-100 cursor-pointer pr-0 m-5 pl-10">
    {/* Card 1 */}
    <img
      src="/icons/visacard1.png"
      alt=""
      className="w-4/5 relative top-20 transition-all duration-[1500ms] ease-out transform group-hover:-translate-y-40"
      style={{
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}
    />

    {/* Card 2 */}
    <img
      src="/icons/visacard2.png"
      alt=""
      className="w-4/4 relative -left-20 top-40 transition-all duration-[1500ms] ease-out transform group-hover:-translate-y-40 delay-150"
      style={{
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}
    />
  </div>
</div>

        {/* ESOP Administration Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
  <div className="flex items-start mb-4">
    <img src="/icons/graph.png" alt="" className="size-12" />
  </div>

  <h2 className="text-2xl font-semibold  mb-3 mt-10 ml-3">
    Effortless ESOP Administration
  </h2>
  <p className="text-normal text-gray-600 mb-10 ml-3">
    Simplify equity distribution and employee stock management.
  </p>
  <div className="flex items-center justify-center group">
    <div className="relative items-center">
      <img src="/icons/Frame 17.png" alt="" className="w-full" />
      <img
        src="/icons/Frame 16.png"
        alt=""
        className="absolute -top-20 left-50 w-2/3 h-90 transition-all duration-[1500ms] ease-out group-hover:-translate-x-70 group-hover:translate-y-70 "
        style={{
          transitionTimingFunction: "cubic-bezier(0.74, 1.56, 0.84, 1)"
        }}
        
      />
    </div>
  </div>
</div>
      </div>

      {/* Trial Balance Section */}
      <div className="bg-gray-50 p-5 rounded-3xl">
        <img src="/icons/dollarIcon.png" alt="" className="object-contain size-12 ml-10 mt-3" />
        <div className=" mt-6 flex ">
          <div className="w-[40%] mt-3 m-10 ">
            <h2 className="text-4xl font-semibold mb-1">
              Automated Trial Balance Consolidation
            </h2>
            <p className="text-2xl text-gray-400 mt-10">
              Streamline financial reporting with accurate TB generation.
            </p>
          </div>

          <div className=" w-[60%] relative">
            <img
              src="/background/mapbg.png"
              alt="World map visualization"
              className="w-full h-auto object-cover -mt-20  "
            />
            <img src="/icons/Frame 18.png" alt="frame18" className="absolute -top-20 left-20 w-2/4 transition-transform duration-300 hover:scale-110" />
            <div>
              <img src="/icons/flag.png" alt="" className="absolute -top-9 left-130 w-1/5"/>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Cards */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
        <div className=" bg-gray-50 rounded-3xl relative">
          <img src="/icons/phone2.png" alt="" className="size-14 m-4" />
          <h3 className="text-xl font-semibold m-4">
            Hold money in 30+ currencies
          </h3>
          <img src="/background/backgroundimg.png" alt="" className="absolute bottom-0" />
        </div>

        <div className="bg-gray-50 rounded-3xl relative">
          <img src="/icons/list.png" alt="" className="size-14 m-4" />
          <h3 className="text-xl font-semibold m-4 ">
            Subscriptions you control in one place
          </h3>
          <img src="/background/Frame 2.png" alt="" className="absolute bottom-0 w-full " />
        </div>

        <div className="bg-gray-50 cursor-pointer h-80 rounded-3xl">
          <img src="/background/Frame 3.png" alt="" className="h-90 w-full" />
        </div>
      </div> */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-4 p-5">
        {/* Multi-currency Support */}
        <div className="bg-gray-50 rounded-3xl relative overflow-hidden h-80 2xl:h-120 p-5">
          <img src="/icons/phone2.png" alt="" className="size-14 m-4" />
          <h3 className=" text-2xl xl:text-3xl 2xl:text-4xl 2xl:p-3 font-semibold m-4 mt-4">
            Hold money in 30+ currencies
          </h3>
          <img
            src="/background/backgroundimg.png"
            alt=""
            className="absolute bottom-0 w-full"
          />
        </div>

        {/* Subscription Management - With hover effect */}
        <div className="bg-gray-50 rounded-3xl relative overflow-hidden h-80 2xl:h-120 p-5">
          <img src="/icons/list.png" alt="" className="size-14 m-4" />
      
          {/* <motion.h3
            className=" text-start text-2xl xl:text-3xl 2xl:text-4xl 2xl:p-3 font-semibold m-4"
            initial={{ y: 0 }}
            whileHover={{ y: -20 }}
            whileTap={{ y: -5 }}
          >
            Subscriptions you control in one place
          </motion.h3>
          <motion.img
            src="/background/Frame2.png"
            alt=""
            className="absolute bottom-0 w-full"
            initial={{ y: 0 }}
            whileHover={{ y: -20 }}
            whileTap={{ y: -5 }}
          /> */}


<motion.div
  className="relative w-full h-[300px] flex flex-col items-center justify-center overflow-hidden mt-15"
  initial={{ y: 0 }}
  whileHover={{ y: -20 }}
  whileTap={{ y: -5 }}
>
  <h3 className="text-start text-2xl xl:text-3xl 2xl:text-4xl 2xl:p-3 font-semibold m-4 z-10 mb-55 lg:mb-60 ">
    Subscriptions you control in one place
  </h3>

  <img
    src="/background/Frame2.png"
    alt=""
    className="absolute bottom-0 w-full z-0 mt-10 lg:mt-0"
  />
</motion.div>

        </div>

        {/* <div className="bg-gray-50 rounded-3xl relative h-80 2xl:h-120">
        <img
          src="/background/Frame 3.png"
          alt=""
          className="h-full w-full object-cover"
        />
       
        <button
            className="px-6 py-3 bg-blue-500 hover:bg-yellow-500 text-white font-medium rounded-full
            transition-colors duration-300 transform hover:scale-105"
          >
            Learn More
          </button>
      </div> */}

        {/* Other Features Card - With yellow button hover */}
        <div className="bg-gray-50 cursor-pointer rounded-3xl relative h-80 2xl:h-120 overflow-hidden ">
          <img
            src="/background/Frame 3.png"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col items-start justify-center rounded-3xl cursor-pointer p-3 mx-2">
            <h3 className=" text-2xl xl:text-3xl 2xl:text-4xl 2xl:p-3 font-semibold m-4 text-white">
              Check our other product features
            </h3>
            <button
              className="px-8 py-3 bg-blue-500 hover:bg-yellow-500 text-white font-medium rounded-full
            transition-colors duration-300 transform hover:scale-105 ml-4"
            >
              View More
              {/* <MoveRight /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
