import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Navbar from "./navbar";
import { Toaster } from "@/components/ui/sonner"

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
