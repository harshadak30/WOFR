
import { motion } from "framer-motion";

export default function Page3() {
  return (
    <div className="">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Experience Seamless Financial Management with WOFR
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Lease Management Section */}
        <div className="bg-gray-50 rounded-3xl p-5 ">
          <div className="flex items-start mb-4">
            <img src="/icons/phone.png" alt="" className="size-12" />
          </div>
          <h2 className="text-2xl font-semibold mb-1">
            Manage Leases with Ease
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Gain full control over lease agreements while ensuring compliance.
          </p>
          <div className="flex items-center justify-center">
          <img src="/icons/Animation_card_1.png" alt="" className="w-4/5 h-100 "/>
          </div>
        </div>

        {/* ESOP Administration Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start mb-4">
            <img src="/icons/graph.png" alt="" className="size-12" />
          </div>
          
          <h2 className="text-2xl font-semibold mb-1">
            Effortless ESOP Administration
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Simplify equity distribution and employee stock management.
          </p>
          <div className="flex items-center justify-center">
          <div className="relative items-center">
            <img src="/icons/Frame 17.png" alt="" className="w-full" />
            <img 
              src="/icons/Frame 16.png" 
              alt="" 
              className="absolute top-0 right-0 w-2/5 h-90"
            />
          </div>
          </div>
          
          

        </div>
      </div>

      {/* Trial Balance Section */}
      <div className="bg-gray-50 p-5 rounded-3xl">
        <img src="/icons/dollarIcon.png" alt="" className="object-contain size-12" />
        <div className=" mt-6 flex ">
          <div className="w-[40%] mt-3 ">
            <h2 className="text-4xl font-semibold mb-1">
              Automated Trial Balance Consolidation
            </h2>
            <p className="text-md text-gray-600 ">
              Streamline financial reporting with accurate TB generation.
            </p>
          </div>

          <div className=" w-[60%] relative">
          <img
            src="/background/Dotted_Map_White_Background_1-removebg-preview.png"
            alt="World map visualization"
            className="w-full h-auto object-cover -mt-20  "
          />
          <img src="/icons/Frame 18.png"  alt="frame18" className="absolute -top-20 left-20 w-2/4"/>
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
         <h3 className=" text-2xl xl:text-3xl 2xl:text-4xl 2xl:p-3 font-semibold m-4">
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
        <h3 className=" text-2xl xl:text-3xl 2xl:text-4xl 2xl:p-3 font-semibold m-4">
        Subscriptions you control in one place
        </h3>
        <motion.img
          src="/background/Frame2.png"
          alt=""
          className="absolute bottom-0 w-full"
          initial={{ y: 0 }}
          whileHover={{ y: -20 }}
          whileTap={{ y: -5 }}
        />
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
     
        
      <div className="absolute inset-0 flex flex-col items-start justify-center rounded-3xl cursor-pointer p-3">
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
