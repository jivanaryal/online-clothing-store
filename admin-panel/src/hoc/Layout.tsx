import { Outlet } from "react-router-dom";
import Sidebar from "../shared-components/Sidebar";
import Navbar from "../shared-components/Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <section className="flex-none w-2/4 lg:w-1/6 md:w-1/4 bg-[#FFFFFF] sticky md:sticky md:top-0 md:left-0 md:max-h-screen border-[2px] border-[#E5E6ED] border-t-[2px] shadow-xl md:overflow-y-auto overflow-hidden">
        <Sidebar />
      </section>
      <section className="flex-1">
        <section>
          <Navbar />
          <div className="mt-16">
            <Outlet />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Layout;
