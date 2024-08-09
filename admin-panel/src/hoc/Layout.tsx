import { Outlet } from "react-router-dom";
import Sidebar from "../shared-components/Sidebar";
import Navbar from "../shared-components/Navbar";

const Layout = () => {
  return (
    <div className="grid  grid-cols-12  ">
      <section className="col-span-2 bg-[#FFFFFF] min-h-screen sticky top-0 left-0 max-h-screen border-[2px] border-[#E5E6ED] border-t-[2px] shadow-xl">
        <Sidebar />
      </section>
      <section className="col-span-10 ">
        <section className="fixed w-10/12 mx-auto border-b-2 h-16 bg-white">
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
