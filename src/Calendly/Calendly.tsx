import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const Calendly = () => {
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    // Load Calendly widget directly on this page
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Set timeout to show the back button after 3 seconds
    const timer = setTimeout(() => {
      setShowBackButton(true);
    }, 3000);

    // Clean up on unmount
    return () => {
      clearTimeout(timer);

      if (window.Calendly) {
        window.Calendly.closePopupWidget();
      }
      // Remove script if needed
      const calendlyScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (calendlyScript) {
        document.body.removeChild(calendlyScript);
      }
    };
  }, []);

  return (
    <>

      <div className='flex items-center backdiv'>
        {showBackButton && (
          <NavLink to="/">
            <button className='back flex gap-2 items-center fixed cursor-pointer bg-blue-600 p-4 rounded-full mt-5 ms-4'>
              <FaArrowLeft /> Back to home
            </button>
          </NavLink>
        )}
      </div>
      <div
        className="calendly-container"
        style={{ height: '100vh', width: '100%', marginTop: '55px' }}
      >
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/maitriai-sales/business-meet"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>


    </>
  );
};

export default Calendly;