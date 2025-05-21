import Corousel from "./Corousel";
import MainLayout from "../../component/Layout/MainLayout";
import HeroSection from "./HeroSection";
import Testimonials from "./Testimonials";
import Features from "./Features";

export default function WOFRDashboard() {
  return (
    <>
      <MainLayout>
        <div className="w-[90%] mx-auto my-10 flex flex-col gap-10">
          <HeroSection />
          <Features />
          <Corousel />
          <Testimonials />
        </div>
      </MainLayout>
    </>
  );
}
