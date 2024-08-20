import { MdCategory, MdDashboard } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";

import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { useReducer } from "react";
import { IoBagAdd } from "react-icons/io5";
import { MdOutlineFormatListNumberedRtl } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

export const SidebarItem = [
  {
    title: "dashboard",
    icons: <MdDashboard />,
    path: "/",
    extralist: null,
  },
  {
    title: "products",
    icons: <BsFillBagCheckFill />,
    path: null,
    extralist: [
      {
        title: "add product",
        path: "/products/add-product",
        icons: <IoBagAdd />,
      },
      {
        title: "product list",
        path: "/products/product-list", // Fixed typo here
        icons: <MdOutlineFormatListNumberedRtl />,
      },
      {
        title: "category",
        path: "/products/categories",
        icons: <MdCategory />,
      },
      {
        title: "sub-category",
        path: "/products/subcategories",
        icons: <BiSolidCategory />,
      },
    ],
  },

  {
    title: "orders",
    icons: <FaCartArrowDown />,
    path: null,
    extralist: [
      { title: null, path: null },
      {
        title: "order list",
        path: "/order-list", // Fixed typo here
        icons: <IoBagAdd />,
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
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);

  const absoluteLocation = location.pathname?.split("/").filter(Boolean)[0];

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
                <ul
                  className={`flex items-center gap-2 cursor-pointer pl-4 rounded group hover:bg-[#5570F1]  py-2 ${
                    absoluteLocation === items.title && "bg-blue-200 "
                  }`}
                  onClick={() => navigate(items.path)}
                >
                  <li className="flex items-center gap-2">
                    <span className="text-xl text-gray-700 ">
                      {items.icons}
                    </span>
                    <span
                      className={`capitalize font-medium text-base text-gray-800 group-hover:text-white ${
                        location.pathname === items.path && `text-blue-600`
                      }`}
                    >
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
                          (items.title === "categories" &&
                            state.showcategory) ||
                          (items.title === "orders" && state.showorder)
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
                        className={` flex items-center gap-1 mb-3 cursor-pointer text-gray-800 hover:text-blue-500 ${
                          location.pathname == val.path && "text-blue-500"
                        }`}
                        onClick={() => navigate(val.path)}
                      >
                        <li>{val.icons}</li>
                        <li className="capitalize text-[13px] leading-[20px] font-medium">
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
                        className="cursor-pointer text-gray-700 hover:text-blue-500"
                        onClick={() => navigate(val.path)}
                      >
                        <li className="capitalize text-[13px]  font-medium">
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
