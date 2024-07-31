import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <h1>rendereds</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
