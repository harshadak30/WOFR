
import Corousel from "./Corousel";
import MainLayout from "../../Layout/MainLayout";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";

export default function WOFRDashboard() {
  return (
    <>
      <MainLayout>
        <div className="w-[90%] mx-auto my-10 flex flex-col gap-10">
          <HeroSection />
          <FeaturesSection />
          <Corousel />
          <TestimonialsSection />
        </div>
      </MainLayout>
    </>
  );
}
