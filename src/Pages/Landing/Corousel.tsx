

// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const apps = [
//   { name: 'WOFR Lease Manager', image: '/icons/lease.png', left_image: "/background/carouselOne.png" },
//   { name: 'WOFR ESOP Manager', image: '/icons/esop.png', left_image: "/background/carouselTwo.png" },
//   { name: 'WOFR Consol TB Generator', image: '/icons/tb.png', left_image: "/background/carouselThree.png" },
//   { name: 'WOFR EIR Calculator', image: '/icons/eir.png', left_image: "/background/carouselFour.png" }
// ];

// function Corousel(){


//   const [appsList, setAppsList] = useState(apps);
//   const [transitioning, setTransitioning] = useState(false);

//   const handleRightClick = () => {
//     if (transitioning) return;

//     setTransitioning(true);

//     setTimeout(() => {
//       const newApps = [...appsList];
//       const firstApp = newApps.shift();
//       newApps.push(firstApp);
//       setAppsList(newApps);
//       setTransitioning(false);
//     }, 1000); // Animation duration
//   };

//   const handleLeftClick = () => {
//     if (transitioning) return;

//     setTransitioning(true);

//     setTimeout(() => {
//       const newApps = [...appsList];
//       const lastApp = newApps.pop();
//       newApps.unshift(lastApp);
//       setAppsList(newApps);
//       setTransitioning(false);
//     }, 1000);
//   };

//   // Auto-scroll effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!transitioning) {
//         handleRightClick();
//       }
//     }, 3000); 

//     return () => clearInterval(interval);
//   }, [appsList, transitioning]);

//   return (
//     <div className="w-full">
//       {/* Header Section */}
//       <div className="bg-white w-full mb-6 mt-19">
//         <h1 className="text-6xl font-bold text-blue-900 text-center">WOFR Apps</h1>
//         <p className="text-gray-600 mt-5 mb-10 text-center text-xl ">
//           Lorem ipsum dolor sit amet consectetur. Gravida convallis neque pulvinar turpis pharetra erat vulputate.
//         </p>
//       </div>

//       {/* Main Content Area with teal background */}
//       <div className="bg-teal-600 h-[650px] flex rounded-3xl relative ">
//         {/* Left section with phone image */}
//         <div className="w-1/4">
//           <img
//             src={appsList[0].left_image}
//             alt="Mobile phone displaying WOFR app"
//             className="rounded-3xl shadow-lg h-full object-cover"
//           />
//         </div>

//         {/* Right section with dynamic cards */}
//         {/* <Slider {...settings}> */}
//         <div className="w-3/4 flex flex-col justify-center -ml-20">
        
//           <div className="flex justify-between gap-3">
            
//             {appsList.map((app, index) => (
               
//               <div className={`h-100 w-80 ${index === 0 ? 'bg-white rounded-2xl' : ''} `}>
//            <motion.div
//                 key={app.name} // Using name as a unique key is better than index
//                 className={`bg-white z-20 p-6 flex flex-col shadow-xl items-center rounded-xl ${
//                   index === 0 ? 'h-52 w-60 shadow-2xl shadow-gray-800  mt-22 ml-6' : 'h-52 w-80 mt-22'
//                 }`}
//                 initial={{ opacity: 0, x: index === 0 ? 0 : 300 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: index === 0 ? 0 : -300 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="text-teal-500 mb-4">
//                   <img 
//                     className={`${index === 0 ? "w-20 h-20" : "w-20 h-20"}`} 
//                     src={app.image} 
//                     alt={app.name}
//                     onError={(e) => {
//                       console.error(`Failed to load image: ${app.image}`);
//                       e.target.src = "/placeholder.png"; // Fallback image
//                     }} 
//                   />
//                 </div>
//                 <h2 className={`text-blue-900 font-bold text-center ${index === 0 ? "text-xl" : "text-lg"}`}>
//                   {app.name}
//                 </h2>
//                 {index === 0 && (
//                   <button className="border-2 border-teal-600 text-blue-800 mt-12 px-4 py-2 rounded-3xl cursor-pointer hover:bg-teal-50 transition-colors">
//                     KNOW MORE
//                   </button>
//                 )}
//               </motion.div>
//               </div>
            
//             ))}
            
//           </div>
         

//           {/* Navigation buttons */}
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={handleLeftClick}
//               disabled={transitioning}
//               className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
//             >
//               <ChevronLeft className="w-5 h-5 text-blue-900" />
//             </button>
//             <button
//               onClick={handleRightClick}
//               disabled={transitioning}
//               className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
//             >
//               <ChevronRight className="w-5 h-5 text-blue-900" />
//             </button>
//           </div>
//         </div>
//         {/* </Slider> */}
//       </div>
//     </div>
//   );
// }

// export default Corousel;


import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const apps = [
  { name: 'WOFR Lease Manager', image: '/icons/lease.png', left_image: "/background/carouselOne.png" },
  { name: 'WOFR ESOP Manager', image: '/icons/esop.png', left_image: "/background/carouselTwo.png" },
  { name: 'WOFR Consol TB Generator', image: '/icons/tb.png', left_image: "/background/carouselThree.png" },
  { name: 'WOFR EIR Calculator', image: '/icons/eir.png', left_image: "/background/carouselFour.png" }
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % apps.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + apps.length) % apps.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white w-full mb-6 mt-19">
        <h1 className="text-6xl font-bold text-blue-900 text-center">WOFR Apps</h1>
        <p className="text-gray-600 mt-5 mb-10 text-center text-xl">
          Lorem ipsum dolor sit amet consectetur. Gravida convallis neque pulvinar turpis pharetra erat vulputate.
        </p>
      </div>

      <div className="bg-teal-600 h-[650px] flex rounded-3xl relative overflow-hidden">
        {/* Left Image */}
        <div className="w-1/4">
          <img
            src={apps[currentIndex].left_image}
            alt="Left visual"
            className="rounded-3xl shadow-lg h-full object-cover"
          />
        </div>

        {/* Right Cards */}
        <div className="w-3/4 flex justify-center items-center relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isMobile ? (
              <motion.div
                key={apps[currentIndex].name}
                initial={{ x: direction === 'right' ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 'right' ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-xl w-80 h-80 flex flex-col items-center justify-center absolute"
              >
                <img src={apps[currentIndex].image} alt={apps[currentIndex].name} className="w-20 h-20 mb-4" />
                <h2 className="text-blue-900 font-bold text-xl text-center">{apps[currentIndex].name}</h2>
                <button className="border-2 border-teal-600 text-blue-800 mt-8 px-4 py-2 rounded-3xl hover:bg-teal-50 transition-colors">
                  KNOW MORE
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={currentIndex}
                initial={{ x: direction === 'right' ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 'right' ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-4 gap-4 absolute"
              >
                {[0, 1, 2, 3].map((offset) => {
                  const index = (currentIndex + offset) % apps.length;
                  const app = apps[index];
                  return (
                    <div
                      key={app.name}
                      className="bg-white p-6 rounded-2xl shadow-xl w-64 h-80 flex flex-col items-center justify-center"
                    >
                      <img src={app.image} alt={app.name} className="w-20 h-20 mb-4" />
                      <h2 className="text-blue-900 font-bold text-xl text-center">{app.name}</h2>
                      <button className="border-2 border-teal-600 text-blue-800 mt-8 px-4 py-2 rounded-3xl hover:bg-teal-50 transition-colors">
                        KNOW MORE
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons (both desktop & mobile) */}
          <div className="absolute bottom-6 flex gap-4">
            <button
              onClick={prevSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-blue-900" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-blue-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;



// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';

// const apps = [
//   { name: 'WOFR Lease Manager', image: '/icons/lease.png', left_image: "/background/carouselOne.png" },
//   { name: 'WOFR ESOP Manager', image: '/icons/esop.png', left_image: "/background/carouselTwo.png" },
//   { name: 'WOFR Consol TB Generator', image: '/icons/tb.png', left_image: "/background/carouselThree.png" },
//   { name: 'WOFR EIR Calculator', image: '/icons/eir.png', left_image: "/background/carouselFour.png" }
// ];

// function Carousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState<'left' | 'right'>('right');

//   const nextSlide = () => {
//     setDirection('right');
//     setCurrentIndex((prev) => (prev + 1) % apps.length);
//   };

//   const prevSlide = () => {
//     setDirection('left');
//     setCurrentIndex((prev) => (prev - 1 + apps.length) % apps.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const currentApp = apps[currentIndex];

//   return (
//     <div className="w-full">
//       <div className="bg-white w-full mb-6 mt-19">
//         <h1 className="text-6xl font-bold text-blue-900 text-center">WOFR Apps</h1>
//         <p className="text-gray-600 mt-5 mb-10 text-center text-xl">
//           Lorem ipsum dolor sit amet consectetur. Gravida convallis neque pulvinar turpis pharetra erat vulputate.
//         </p>
//       </div>

//       <div className="bg-teal-600 h-[650px] flex rounded-3xl relative overflow-hidden">
//         {/* Left Image */}
//         <div className="w-1/4">
//           <img
//             src={currentApp.left_image}
//             alt="Left visual"
//             className="rounded-3xl shadow-lg h-full object-cover"
//           />
//         </div>

//         {/* Right Card */}
//         <div className="w-3/4 flex justify-center items-center relative">
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.div
//               key={currentApp.name}
//               initial={{ x: direction === 'right' ? 300 : -300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: direction === 'right' ? -300 : 300, opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white p-6 rounded-2xl shadow-xl w-80 h-80 flex flex-col items-center justify-center absolute"
//             >
//               <img src={currentApp.image} alt={currentApp.name} className="w-20 h-20 mb-4" />
//               <h2 className="text-blue-900 font-bold text-xl text-center">{currentApp.name}</h2>
//               <button className="border-2 border-teal-600 text-blue-800 mt-8 px-4 py-2 rounded-3xl hover:bg-teal-50 transition-colors">
//                 KNOW MORE
//               </button>
//             </motion.div>
            
//           </AnimatePresence>

//           {/* Navigation Buttons */}
//           <div className="absolute bottom-6 flex gap-4">
//             <button
//               onClick={prevSlide}
//               className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
//             >
//               <ChevronLeft className="w-5 h-5 text-blue-900" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
//             >
//               <ChevronRight className="w-5 h-5 text-blue-900" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Carousel;





