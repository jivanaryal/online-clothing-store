import { Outlet } from "react-router-dom";
import Sidebar from "../shared-components/Sidebar";

const Layout = () => {
  return (
    <div className="grid  grid-cols-11  ">
      <section className="col-span-2 bg-[#FFFFFF] min-h-screen max-h-screen border-[2px] border-[#E5E6ED] border-t-[2px] shadow-xl">
        <Sidebar />
      </section>
      <section className="col-span-9 ">
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
