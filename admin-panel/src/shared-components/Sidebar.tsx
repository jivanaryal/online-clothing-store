import { MdCategory, MdDashboard, MdKeyboardArrowLeft, MdOutlinePending } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { MdOutlineFormatListNumberedRtl } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { GrCompliance } from "react-icons/gr";

export const SidebarItem = [
  {
    title: "dashboard",
    icon: <MdDashboard />,
    path: "/",
    subItems: null,
  },
  {
    title: "products",
    icon: <BsFillBagCheckFill />,
    path: null,
    subItems: [
      {
        title: "add product",
        path: "/products/add-product",
        icon: <IoBagAdd />,
      },
      {
        title: "product list",
        path: "/products/product-list",
        icon: <MdOutlineFormatListNumberedRtl />,
      },
      {
        title: "category",
        path: "/products/categories",
        icon: <MdCategory />,
      },
      {
        title: "sub-category",
        path: "/products/subcategories",
        icon: <BiSolidCategory />,
      },
    ],
  },
  {
    title: "orders",
    icon: <FaCartArrowDown />,
    path: null,
    subItems: [
      {
        title: "pending order list",
        path: "/orders",
        icon: <MdOutlinePending />,
      },
      {
        title: "completed order",
        path: "/orders/complete",
        icon: <GrCompliance />,
      },
    ],
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "toggle": {
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

const initialState = {
  products: true,
  orders: true,
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNavigation = (path: string | null) => {
    if (path) navigate(path);
  };

    const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token1");
    
    // Navigate to the login page
    navigate("/login");
  };

  const isActive = (path: string | null) => location.pathname === path;

  const renderSubItems = (subItems: any[]) => (
    <section className="ml-8 mt-1 ">
      <button className="absolute bottom-0 cursor-pointer left-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg w-full text-center py-3 font-semibold tracking-wide shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out transform"
        onClick={handleLogout }
      
      
      >
  Logout
</button>

      {subItems.map((item, i) => (
        <ul
          key={i}
          className={`flex items-center gap-2 my-4 cursor-pointer hover:text-blue-500 ${
            isActive(item.path) ? "text-blue-500" : "text-gray-800"
          }`}
          onClick={() => handleNavigation(item.path)}
        >
          <li className="text-xl">{item.icon}</li>
          <li className="capitalize text-[15px] leading-[20px] font-medium">
            {item.title}
          </li>
        </ul>
      ))}
    </section>
  );

  return (
    <div>
      <main>
        <h1 className="font-extrabold text-gray-800 text-2xl ml-6 mt-5">
          Jivan Aryal
        </h1>
        <section>
          <nav className="mt-6 flex justify-center flex-col ml-4 gap-2 mr-3">
            {SidebarItem.map((item, index) => (
              <nav key={index}>
                <ul
                  className={`flex items-center gap-2 cursor-pointer pl-4 rounded group hover:bg-[#5570F1] py-2 ${
                    isActive(item.path) && "bg-blue-200"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <li className="flex items-center gap-2">
                    <span className="text-2xl text-gray-700 group-hover:text-white">
                      {item.icon}
                    </span>
                    <span
                      className={`capitalize font-medium text-lg text-gray-800 group-hover:text-white ${
                        isActive(item.path) && "text-blue-600"
                      }`}
                    >
                      {item.title}
                    </span>
                  </li>
                  {item.subItems && (
                    <button
                      onClick={() =>
                        dispatch({ type: "toggle", payload: item.title })
                      }
                      className="ml-auto group-hover:text-white"
                    >
                      <MdKeyboardArrowLeft
                        className={`transition-transform duration-400 text-2xl ${
                          state[item.title] ? "-rotate-90" : ""
                        }`}
                      />
                    </button>
                  )}
                </ul>
                {item.subItems &&
                  state[item.title] &&
                  renderSubItems(item.subItems)}
              </nav>
            ))}
          </nav>
        </section>
      </main>
    </div>
  );
};

export default Sidebar;
