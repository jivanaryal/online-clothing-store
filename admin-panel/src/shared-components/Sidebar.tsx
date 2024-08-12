import { MdDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { useReducer } from "react";

export const SidebarItem = [
  {
    title: "dashboard",
    icons: <MdDashboard />,
    path: "/",
    extralist: null,
  },
  {
    title: "products",
    icons: <MdOutlineProductionQuantityLimits />,
    path: "/products",
    extralist: [
      { title: "add product", path: "/add-product" },
      {
        title: "product list",
        path: "/products", // Fixed typo here
      },
    ],
  },
  {
    title: "categories",
    icons: <FaSitemap />,
    path: "/categories",
    extralist: [
      { title: "add category", path: "/add-category" },
      {
        title: "category list",
        path: "/category-list", // Fixed typo here
      },
    ],
  },
  {
    title: "orders",
    icons: <FaCartArrowDown />,
    path: "/orders",
    extralist: [
      { title: null, path: null },
      {
        title: "order list",
        path: "/order-list", // Fixed typo here
      },
    ],
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "products": {
      return {
        showproduct: !state.showproduct,
        showcategory: state.showcategory,
        showorder: state.showorder,
      };
    }
    case "categories": {
      return {
        showcategory: !state.showcategory,
        showproduct: state.showproduct,
        showorder: state.showorder,
      };
    }
    case "orders": {
      return {
        showorder: !state.showorder,
        showcategory: state.showcategory,
        showproduct: state.showproduct,
      };
    }
    default:
      throw new Error("unknown action " + action.type);
  }
}

const initialState = {
  showproduct: false,
  showcategory: false,
  showorder: false,
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <main>
        <h1 className="font-extrabold text-gray-800 text-2xl ml-6 mt-5">
          Jivan Aryal
        </h1>
        <section>
          <nav className="mt-6 flex justify-center flex-col ml-4 gap-2 mr-3">
            {SidebarItem.map((items, index) => (
              <nav key={index}>
                <ul className="flex items-center gap-2 cursor-pointer pl-4 rounded group hover:bg-[#5570F1] hover:text-white py-2">
                  <li
                    className="flex items-center gap-2"
                    onClick={() => navigate(items.path)}
                  >
                    <span className="text-xl text-gray-600 group-hover:text-white">
                      {items.icons}
                    </span>
                    <span className="capitalize font-medium text-base text-gray-700 group-hover:text-white">
                      {items.title}
                    </span>
                  </li>
                  {items.extralist != null && (
                    <button
                      onClick={() => dispatch({ type: items.title })}
                      className="ml-auto group-hover:text-white"
                    >
                      <MdKeyboardArrowLeft
                        className={`transition-transform duration-400 text-2xl ${
                          (items.title === "products" && state.showproduct) ||
                          (items.title === "categories" && state.showcategory)
                            ? "-rotate-90"
                            : ""
                        }`}
                      />
                    </button>
                  )}
                </ul>
                {items.title === "products" && state.showproduct && (
                  <section className="ml-8 mt-1">
                    {items.extralist?.map((val, i) => (
                      <ul
                        key={i}
                        className="cursor-pointer text-gray-700 hover:text-blue-500"
                        onClick={() => navigate(val.path)}
                      >
                        <li className="capitalize text-[13px] leading-[20px] mt-2 font-medium">
                          {val.title}
                        </li>
                      </ul>
                    ))}
                  </section>
                )}
                {items.title === "categories" && state.showcategory && (
                  <section className="ml-8 mt-1">
                    {items.extralist?.map((val, i) => (
                      <ul
                        key={i}
                        className="cursor-pointer text-gray-600 hover:text-blue-500"
                        onClick={() => navigate(val.path)}
                      >
                        <li className="capitalize text-[13px] mt-2 font-medium">
                          {val.title}
                        </li>
                      </ul>
                    ))}
                  </section>
                )}
                {items.title === "orders" && state.showorder && (
                  <section className="ml-8 mt-1">
                    {items.extralist?.map((val, i) => (
                      <ul
                        key={i}
                        className="cursor-pointer text-gray-600 hover:text-blue-500"
                        onClick={() => navigate(val.path)}
                      >
                        <li className="capitalize text-[13px] mt-2 font-medium">
                          {val.title}
                        </li>
                      </ul>
                    ))}
                  </section>
                )}
              </nav>
            ))}
          </nav>
        </section>
      </main>
    </div>
  );
};

export default Sidebar;
