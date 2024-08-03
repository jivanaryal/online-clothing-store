import { Outlet } from "react-router-dom";
import TopNav from "../../shared-components/navbar/TopNav";

const Layout = () => {
  return (
    <main>
      <section className="bg-red-400">
        <TopNav />
      </section>
      <h1 className="bg-green-900">rendereds</h1>
      <section className="bg-red-400">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
