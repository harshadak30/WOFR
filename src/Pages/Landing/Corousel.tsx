// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import "./Corousel.css";

// const apps = [
//   {
//     name: "WOFR Lease Manager",
//     image: "/icons/lease.png",
//     left_image: "/background/carouselOne.png",
//   },
//   {
//     name: "WOFR ESOP Manager",
//     image: "/icons/esop.png",
//     left_image: "/background/carouselTwo.png",
//   },
//   {
//     name: "WOFR Consol TB Generator",
//     image: "/icons/tb.png",
//     left_image: "/background/carouselThree.png",
//   },
//   {
//     name: "WOFR EIR Calculator",
//     image: "/icons/eir.png",
//     left_image: "/background/carouselFour.png",
//   },
// ];

// export default function Carousel() {
//   // Create an extended array with duplicates to allow continuous scrolling
//   const extendedApps = [...apps, ...apps, ...apps];
//   const [currentIndex, setCurrentIndex] = useState(apps.length); // Start in the middle set
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [phoneImage, setPhoneImage] = useState(apps[0].left_image);
//   const carouselRef = useRef(null);

//   // Calculate the active app index in the original array
//   const activeAppIndex = currentIndex % apps.length;

//   // Update phone image when active app changes
//   useEffect(() => {
//     setPhoneImage(apps[activeAppIndex].left_image);
//   }, [activeAppIndex]);

//   // Function to handle next slide
//   const handleNext = () => {
//     if (isTransitioning) return;

//     setIsTransitioning(true);
//     setCurrentIndex((prev) => prev + 1);

//     // If we're at the end of the extended array, reset after transition
//     if (currentIndex >= extendedApps.length - apps.length) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(apps.length); // Reset to middle set without animation
//       }, 500);
//     } else {
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   // Function to handle previous slide
//   const handlePrev = () => {
//     if (isTransitioning) return;

//     setIsTransitioning(true);
//     setCurrentIndex((prev) => prev - 1);

//     // If we're at the beginning of the extended array, reset after transition
//     if (currentIndex <= apps.length) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(extendedApps.length - apps.length * 2); // Reset to middle set without animation
//       }, 500);
//     } else {
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   // Auto-scroll effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isTransitioning) {
//         handleNext();
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isTransitioning]);

//   // Calculate which apps to display
//   const visibleApps = extendedApps.slice(currentIndex - 1, currentIndex + 3);

//   return (
//     <div className="w-full">
//       {/* Header Section */}
//       <div className="w-full mb-6">
//         <h1 className="text-3xl font-bold text-blue-900 text-center">
//           WOFR Apps
//         </h1>
//         <p className="text-gray-600 mt-1 text-center text-lg">
//           Lorem ipsum dolor sit amet consectetur. Gravida convallis neque
//           pulvinar turpis pharetra erat vulputate.
//         </p>
//       </div>

//       {/* Main Content Area with dark background */}
//       <div className="bg-teal-600 h-[650px] flex justify-between  md:flex-row flex-col rounded-3xl relative">
//         {/* Left section with phone image */}
//         {/* <div className="lg:w-1/3 relative overflow-hidden lg:rounded-2xl"> */}
//         <div
//           className="w-full lg:w-1/3 md:w-2/5 h-64 lg:h-auto md:h-auto relative overflow-hidden
//                  lg:rounded-l-3xl md:rounded-l-3xl CarouselMainbackground"
//         >
//           <img
//             src={phoneImage}
//             alt="Mobile phone displaying WOFR app"
//             className="h-full w-full object-cover transition-opacity duration-500 z-10"
//           />
//         </div>
//         <div className="lg:h-100 lg:w-90 md:h-100 md:w-80  bg-white relative right-20 top-20 rounded-2xl "></div>

//         {/* Right section with dynamic cards */}
//         <div className="lg:w-3/4 md:w-3/4  flex flex-col justify-center lg:-ml-20 lg:-mr-50  md:-ml-35   md:-mr-32 relative lg:right-70  md:right-50">
//           <div className="relative  lg:h-64 md:h-60  sm:h-80 lg:overflow-hidden md:overflow-hidden  flex  items-center ">
//             <div
//               ref={carouselRef}
//               className="flex absolute transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(${
//                   -280 * (currentIndex - apps.length)
//                 }px)`,
//                 transition: isTransitioning
//                   ? "transform 0.5s ease-in-out"
//                   : "none",
//               }}
//             >
//               {extendedApps.map((app, index) => {
//                 const isActive = index === currentIndex;

//                 return (
//                   <div
//                     key={`${app.id}-${index}`}
//                     className="mx-4 relative right-15 "
//                   >
//                     <div
//                       className={`bg-white relative right-50 shadow-2xl  p-6 flex flex-col  items-center rounded-xl transition-all duration-300 
//                         ${
//                           isActive
//                             ? "lg:h-52  md:h-45 w-70 shadow-2xl  z-20"
//                             : "h-52 w-60  "
//                         }`}
//                     >
//                       <div className="text-teal-500 mb-4">
//                         <img
//                           className="w-20 h-20"
//                           src={app.image}
//                           alt={app.name}
//                         />
//                       </div>

//                       <h2
//                         className={`text-blue-900 font-bold text-center ${
//                           isActive ? "text-xl" : "text-lg"
//                         }`}
//                       >
//                         {app.name}
//                       </h2>

//                       {/* {isActive && (
//                         <button className="border-2 border-teal-600 text-blue-800 mt-12 px-4 py-2 rounded-3xl cursor-pointer hover:bg-teal-50 transition-colors">
//                           KNOW MORE
//                         </button>
//                       )} */}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Navigation buttons */}
//           <div className="flex lg:justify-center md:justify-end sm:justify-center mt-6">
//             <button
//               onClick={handleNext}
//               disabled={isTransitioning}
//               className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
//               aria-label="Previous app"
//             >
//               <ChevronLeft className="w-5 h-5 text-blue-900" />
//             </button>
//             <button
//               onClick={handlePrev}
//               disabled={isTransitioning}
//               className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
//               aria-label="Next app"
//             >
//               <ChevronRight className="w-5 h-5 text-blue-900" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./Corousel.css";

const apps = [
  {
    name: "WOFR Lease Manager",
    image: "/icons/lease.png",
    left_image: "/background/carouselOne.png",
  },
  {
    name: "WOFR ESOP Manager",
    image: "/icons/esop.png",
    left_image: "/background/carouselTwo.png",
  },
  {
    name: "WOFR Consol TB Generator",
    image: "/icons/tb.png",
    left_image: "/background/carouselThree.png",
  },
  {
    name: "WOFR EIR Calculator",
    image: "/icons/eir.png",
    left_image: "/background/carouselFour.png",
  },
];

export default function Carousel() {
  // Create an extended array with duplicates to allow continuous scrolling
  const extendedApps = [...apps, ...apps, ...apps];
  const [currentIndex, setCurrentIndex] = useState(apps.length); // Start in the middle set
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phoneImage, setPhoneImage] = useState(apps[0].left_image);
  const carouselRef = useRef(null);

  // Calculate the active app index in the original array
  const activeAppIndex = currentIndex % apps.length;

  // Update phone image when active app changes
  useEffect(() => {
    setPhoneImage(apps[activeAppIndex].left_image);
  }, [activeAppIndex]);

  // Function to handle next slide
  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);

    // If we're at the end of the extended array, reset after transition
    if (currentIndex >= extendedApps.length - apps.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(apps.length); // Reset to middle set without animation
      }, 500);
    } else {
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Function to handle previous slide
  const handlePrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);

    // If we're at the beginning of the extended array, reset after transition
    if (currentIndex <= apps.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(extendedApps.length - apps.length * 2); // Reset to middle set without animation
      }, 500);
    } else {
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  // Calculate which apps to display
  const visibleApps = extendedApps.slice(currentIndex - 1, currentIndex + 3);

  // Mobile and tablet view
  const mobileView = (
    <div className="w-full px-4 md:hidden">
      {/* Header Section */}
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-blue-900 text-center">
          WOFR Apps
        </h1>
        <p className="text-sm text-gray-600 mt-1 text-center">
          Lorem ipsum dolor sit amet consectetur. Gravida convallis neque
          pulvinar turpis pharetra erat vulputate.
        </p>
      </div>

      {/* Mobile Content Area */}
      <div className="bg-teal-600 min-h-[400px] flex flex-col rounded-3xl relative overflow-hidden">
        {/* Top section with image */}
        <div className="w-full h-70 relative overflow-hidden">
          <img
            src={phoneImage}
            alt="Mobile phone displaying WOFR app"
            className="h-70 w-full object-cover transition-opacity duration-500 z-10 rounded-2xl"
          />
        </div>

        {/* Bottom section with active card */}
        <div className="flex-1 flex flex-col justify-center items-center py-8 px-4 relative z-10">
          <div className="bg-white shadow-xl p-6 flex flex-col items-center rounded-xl mx-auto max-w-xs">
            <div className="text-teal-500 mb-4">
              <img
                className="w-16 h-16"
                src={apps[activeAppIndex].image}
                alt={apps[activeAppIndex].name}
              />
            </div>
            <h2 className="text-blue-900 font-bold text-center text-xl">
              {apps[activeAppIndex].name}
            </h2>
            <button className="border-2 border-teal-600 text-blue-800 mt-6 px-4 py-2 rounded-3xl 
                           cursor-pointer hover:bg-teal-50 transition-colors">
              KNOW MORE
            </button>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 
                     transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Previous app"
            >
              <ChevronLeft className="w-5 h-5 text-blue-900" />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 
                     transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Next app"
            >
              <ChevronRight className="w-5 h-5 text-blue-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Original desktop view - preserved exactly as in the original code
  const desktopView = (
    <div className="w-full hidden md:block">
      {/* Header Section */}
      <div className="w-full mb-6">
        <h1 className="text-3xl font-bold text-blue-900 text-center">
          WOFR Apps
        </h1>
        <p className="text-gray-600 mt-1 text-center text-lg">
          Lorem ipsum dolor sit amet consectetur. Gravida convallis neque
          pulvinar turpis pharetra erat vulputate.
        </p>
      </div>

      {/* Main Content Area with dark background */}
      <div className="bg-teal-600 h-[650px] flex justify-between md:flex-row flex-col rounded-3xl relative">
        {/* Left section with phone image */}
        <div
          className="w-full lg:w-1/3 md:w-2/5 h-[650px] relative overflow-hidden
                 lg:rounded-l-3xl md:rounded-l-3xl"
        >
          <img
            src={phoneImage}
            alt="Mobile phone displaying WOFR app"
            className="h-full w-full object-cover transition-opacity duration-500 z-10"
          />
        </div>
        <div className="lg:h-100 lg:w-90 md:h-100 md:w-80 bg-white relative right-20 top-20 rounded-2xl"></div>

        {/* Right section with dynamic cards */}
        <div className="lg:w-3/4 md:w-3/4 flex flex-col justify-center lg:-ml-20 lg:-mr-50 md:-ml-35 md:-mr-32 relative lg:right-70 md:right-50">
          <div className="relative lg:h-64 md:h-60 sm:h-80 overflow-hidden flex items-center">
            <div
              ref={carouselRef}
              className="flex absolute transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${
                  -280 * (currentIndex - apps.length)
                }px)`,
                transition: isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
              }}
            >
              {extendedApps.map((app, index) => {
                const isActive = index === currentIndex;

                return (
                  <div
                    key={`${app.name}-${index}`}
                    className="mx-4 relative right-15"
                  >
                    <div
                      className={`bg-white relative right-50 shadow-2xl p-6 flex flex-col items-center rounded-xl transition-all duration-300 
                        ${
                          isActive
                            ? "lg:h-52 md:h-45 w-70 shadow-2xl z-20"
                            : "h-52 w-60"
                        }`}
                    >
                      <div className="text-teal-500 mb-4">
                        <img
                          className="w-20 h-20"
                          src={app.image}
                          alt={app.name}
                        />
                      </div>

                      <h2
                        className={`text-blue-900 font-bold text-center ${
                          isActive ? "text-xl" : "text-lg"
                        }`}
                      >
                        {app.name}
                      </h2>

                      {/* {isActive && (
                        <button className="border-2 border-teal-600 text-blue-800 mt-12 px-4 py-2 rounded-3xl cursor-pointer hover:bg-teal-50 transition-colors">
                          KNOW MORE
                        </button>
                      )} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex lg:justify-center md:justify-end sm:justify-center mt-6">
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Previous app"
            >
              <ChevronLeft className="w-5 h-5 text-blue-900" />
            </button>
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Next app"
            >
              <ChevronRight className="w-5 h-5 text-blue-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
}