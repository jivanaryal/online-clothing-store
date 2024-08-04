import { Outlet } from "react-router-dom";
import TopNav from "../../shared-components/navbar/TopNav";
import SecondNav from "../../shared-components/navbar/SecondNav";

const Layout = () => {
  return (
    <main>
      <section className="">
        <TopNav />
        <SecondNav />
      </section>
      {/* <h1 className="bg-green-900">rendereds</h1> */}
      <section className="my-3 px-4">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
