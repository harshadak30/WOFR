import React from "react";
import TrialForm from "./TrialForm";
import MainLayout from "../../Layout/mainLayout";

const dashboardImage = "/background/freetrial.png";
const backgroundImage = "/background/Vector.png";

const FreeTrialPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="w-full bg-white">
        <div className="relative">
          <div
            className="absolute inset-0 h-[220px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "center 20%",
            }}
          >
            <div className="absolute inset-0"></div>
          </div>

          <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
            <h1 className="text-4xl lg:text-6xl font-bold mb-16 text-black text-center animate-fade-in">
              Start a 7 day trial for free
            </h1>

            <div className="flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between  mt-24">
              <div className="w-4/5 lg:w-2/5 mt-8 m-8 lg:mt-0 animate-fade-in">
                <div className="lg:max-w-xl">
                  <TrialForm />
                </div>
              </div>

              <div className="w-full lg:w-3/5 flex justify-center items-center">
                <img
                  src={dashboardImage}
                  alt="Dashboard preview"
                  className="w-full h-auto object-contain lg:object-cover"
                  style={{ maxHeight: "750px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FreeTrialPage;
