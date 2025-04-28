import Page1 from "../../LandingPage/page1";
import Page2 from "../../LandingPage/page2";
import Corousel from "./Corousel";
import Page3 from "../../LandingPage/page3";
import MainLayout from "../../Layout/mainLayout";

export default function WOFRDashboard() {
  return (
    <>
    <MainLayout>
    <div className="w-[90%] mx-auto my-10 flex flex-col gap-10">
       
        <Page1/>
        <Page2/>
        <Corousel/>
        <Page3/>
     
    </div>
    </MainLayout>
    </>
  );
}
