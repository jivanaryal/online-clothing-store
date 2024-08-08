import { MdDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const SidbarItem = [
  {
    title: "dashboard",
    icons: <MdDashboard />,
    path: "/",
  },
  {
    title: "products",
    icons: <MdOutlineProductionQuantityLimits />,
    path: "/products",
  },
  {
    title: "categories",
    icons: <FaSitemap />,
    path: "/categories",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <main>
        <h1 className="font-extrabold text-gray-800 text-2xl ml-6 mt-5">
          Jivan Aryal
        </h1>
        <section>
          <nav className="mt-6 flex justify-center flex-col ml-4 gap-2 mr-3">
            {SidbarItem.map((items, index) => (
              <nav key={index}>
                <ul
                  className="flex items-center gap-2 cursor-pointer pl-4 rounded group hover:bg-[#5570F1] hover:text-white py-2"
                  onClick={() => navigate(items.path)}
                >
                  <li className="text-xl text-gray-600 group-hover:text-white">
                    {items.icons}
                  </li>
                  <li className="capitalize font-medium text-base text-gray-700 group-hover:text-white">
                    {items.title}
                  </li>
                </ul>
              </nav>
            ))}
          </nav>
        </section>
      </main>
    </div>
  );
};

export default Sidebar;
