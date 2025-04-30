
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturesSection() {
  return (
    <div className=" w-full">
      <div className="p-5">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <div className="md:w-2/5">
            <h1 className="text-6xl font-bold text-gray-800 leading-tight">
              Why Use WOFR Apps?
            </h1>
          </div>
          <div className="md:w-2/5 text-gray-500 text-lg mt-3">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              quasi possimus ratione, facere neque beatae eum at voluptate
              placeat mollitia obcaecati quidem cupiditate consectetur dolore
              laborum repellendus exercitationem. Maxime, omnis?
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div
              className=" rounded-2xl shadow-2xl shadow-dark p-8 w-full md:w-1/3 h-96 flex flex-col justify-start items-start"
              style={{
                transform: "perspective(600px) rotateY(20deg)",
              }}
            >
              <div className="text-purple-600 mb-6">
                <img src="/icons/support_agent.png" alt="" />
              </div>

              <h3 className="text-2xl font-bold  rounded-lg p-4 text-black mb-4 ">
                Support System
              </h3>

              <p className="text-black  rounded-lg p-4 text-sm leading-relaxed">
                Li Europan lingues es membres del sam familie. Lor separat
                existentie es un myth.
              </p>
            </div>

            <div
              className="relative rounded-2xl shadow-xl w-full md:w-1/3 h-96 text-white flex flex-col items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #00BCD4, #3F51B5, #673AB7)",
              }}
            >
              {/* Top-left decorative image */}
              <img
                src="/icons/Rectangle 5.png"
                alt="rectangleimage"
                className="absolute top-0 left-0"
              />

              {/* Bottom-right decorative image */}
              <img
                src="/icons/Rectangle 6.png"
                alt="rectangleimage"
                className="absolute bottom-0 right-0"
              />

              {/* Wallet Icon */}
              <div className="w-20 h-20 flex items-center justify-center mb-6">
                <img
                  src="/icons/account_balance_wallet.png"
                  alt="Wallet Icon"
                  className="w-20 h-20"
                />
              </div>

              {/* Text content */}
              <h3 className="text-3xl font-bold mb-4">Financial Management</h3>
              <p className="text-white/90 text-lg text-center w-70">
                Lorem ipsum dolor sit amet consectetur. Amet magna a aliquet praesent
                rhoncus diam.
              </p>
            </div>


            {/* Safety Compliance Card */}
            <div
              className=" rounded-2xl shadow-2xl shadow-dark p-8 w-full md:w-1/3 h-96 flex flex-col justify-start items-end "
              style={{
                transform: "perspective(900px) rotateY(-30deg)",
              }}
            >
              <div className="text-purple-600 mb-6">
                <img src="/icons/admin_panel_settings.png" />
              </div>
              <h3 className="text-2xl font-bold  rounded-lg p-4 text-black mb-4">
                Safety Compliance
              </h3>

              <p className="text-black  rounded-lg py-4 pl-22 text-sm leading-relaxed ">
                Li Europan lingues es membres del sam familie. Lor separat
                existentie es un myth.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 cursor-pointer">
          <Link  to="/free-trial" className="bg-teal-500 hover:bg-blue-700 hover:pr-2 text-white font-medium py-3 px-8 rounded-md flex items-center gap-2 transition-all cursor-pointer">
            Try WOFR Apps for Free
            <img src="/icons/arrow.png" alt="" className="pl-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}

