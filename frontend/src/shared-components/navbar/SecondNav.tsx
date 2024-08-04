import { NavLink } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdPersonOutline } from "react-icons/md";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./nav.css";

const SecondNav = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div>
      <nav className="flex py-1 md:py-4 shadow-md justify-between items-center px-2 md:px-3">
        <div className="logo">
          <p className="md:text-xl cursor-pointer font-semibold">Fashion</p>
        </div>
        <div>
          {/* Nav items */}
          <ul
            className={`sidebar ${
              sidebar ? "sidebar-open" : ""
            } fixed right-0 top-0 z-50 h-lvh w-[200px] px-4 py-6 leading-10 text-black shadow-sm backdrop-blur-md gap-4 font-normal md:flex md:gap-4 md:font-medium lg:gap-10`}
          >
            <div className="sm:hidden" onClick={() => setSidebar(!sidebar)}>
              <IoMdClose className="text-4xl" />
            </div>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/new-arrivals"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
              >
                New Arrivals
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/sales"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
              >
                Sales
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/about-us"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Search and profile section */}
        <div className="flex items-center gap-3">
          <div className="search flex items-center border-2 px-2 h-9 gap-2 rounded-md">
            <IoSearchSharp className="text-xl cursor-pointer" />
            <input
              type="text"
              placeholder="Search for clothes"
              className="h-full outline-none border-none max-w-40"
            />
            <HiOutlineShoppingBag className="cursor-pointer text-2xl" />
          </div>
          {/*  profile */}
          <div className={`hidden md:flex gap-2 items-center`}>
            <div className="p-2 rounded-full border-2">
              <FaRegHeart className="text-xl cursor-pointer" />
            </div>
            <div className="p-2 rounded-full border-2">
              <MdPersonOutline className="text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <GiHamburgerMenu
            className="text-2xl w-fit"
            onClick={() => setSidebar(!sidebar)}
          />
        </div>
      </nav>
    </div>
  );
};

export default SecondNav;
