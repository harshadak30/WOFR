import React, { ReactNode } from "react";
import Header from "../component/Shared/Header/Header";
import Footer from "../component/Shared/Footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
