

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';

const apps = [
  { name: 'WOFR Lease Manager', image: '/background/lease.png', left_image: "/background/corsole1.png" },
  { name: 'WOFR ESOP Manager', image: '/background/esop.png', left_image: "/background/corsole2.png" },
  { name: 'WOFR Consol TB Generator', image: '/background/tb.png', left_image: "/background/corsole3.png" },
  { name: 'WOFR EIR Calculator', image: '/background/eir.png', left_image: "/background/corsole4.png" }
];

function Corousel(){
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   pauseOnHover: true
  // };

  const [appsList, setAppsList] = useState(apps);
  const [transitioning, setTransitioning] = useState(false);

  const handleRightClick = () => {
    if (transitioning) return;

    setTransitioning(true);

    // After animation duration, update the state
    setTimeout(() => {
      const newApps = [...appsList];
      const firstApp = newApps.shift();
      newApps.push(firstApp);
      setAppsList(newApps);
      setTransitioning(false);
    }, 300); // Animation duration
  };

  const handleLeftClick = () => {
    if (transitioning) return;

    setTransitioning(true);

    // After animation duration, update the state
    setTimeout(() => {
      const newApps = [...appsList];
      const lastApp = newApps.pop();
      newApps.unshift(lastApp);
      setAppsList(newApps);
      setTransitioning(false);
    }, 100);
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!transitioning) {
        handleRightClick();
      }
    }, 5000); // Show each card for 5 seconds

    return () => clearInterval(interval);
  }, [appsList, transitioning]);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-white w-full mb-6">
        <h1 className="text-3xl font-bold text-blue-900 text-center">WOFR Apps</h1>
        <p className="text-gray-600 mt-1 text-center text-lg">
          Lorem ipsum dolor sit amet consectetur. Gravida convallis neque pulvinar turpis pharetra erat vulputate.
        </p>
      </div>

      {/* Main Content Area with teal background */}
      <div className="bg-teal-600 h-[650px] flex rounded-3xl relative ">
        {/* Left section with phone image */}
        <div className="w-1/4">
          <img
            src={appsList[0].left_image}
            alt="Mobile phone displaying WOFR app"
            className="rounded-3xl shadow-lg h-full object-cover"
          />
        </div>

        {/* Right section with dynamic cards */}
        {/* <Slider {...settings}> */}
        <div className="w-3/4 flex flex-col justify-center -ml-20">
        
          <div className="flex justify-between gap-3">
            
            {appsList.map((app, index) => (
               
              <div className={`h-100 w-80 ${index === 0 ? 'bg-white rounded-2xl' : ''} `}>
           <motion.div
                key={app.name} // Using name as a unique key is better than index
                className={`bg-white z-20 p-6 flex flex-col shadow-xl items-center rounded-xl ${
                  index === 0 ? 'h-52 w-60 shadow-2xl shadow-gray-800  mt-22 ml-6' : 'h-52 w-60 mt-22'
                }`}
                initial={{ opacity: 0, x: index === 0 ? 0 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: index === 0 ? 0 : -100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-teal-500 mb-4">
                  <img 
                    className={`${index === 0 ? "w-20 h-20" : "w-20 h-20"}`} 
                    src={app.image} 
                    alt={app.name}
                    onError={(e) => {
                      console.error(`Failed to load image: ${app.image}`);
                      e.target.src = "/placeholder.png"; // Fallback image
                    }} 
                  />
                </div>
                <h2 className={`text-blue-900 font-bold text-center ${index === 0 ? "text-xl" : "text-lg"}`}>
                  {app.name}
                </h2>
                {index === 0 && (
                  <button className="border-2 border-teal-600 text-blue-800 mt-12 px-4 py-2 rounded-3xl cursor-pointer hover:bg-teal-50 transition-colors">
                    KNOW MORE
                  </button>
                )}
              </motion.div>
              </div>
            
            ))}
            
          </div>
         

          {/* Navigation buttons */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLeftClick}
              disabled={transitioning}
              className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-blue-900" />
            </button>
            <button
              onClick={handleRightClick}
              disabled={transitioning}
              className="bg-white rounded-full p-2 mx-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-blue-900" />
            </button>
          </div>
        </div>
        {/* </Slider> */}
      </div>
    </div>
  );
}

export default Corousel;