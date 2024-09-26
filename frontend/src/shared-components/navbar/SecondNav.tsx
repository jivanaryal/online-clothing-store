import { NavLink, useNavigate } from "react-router-dom";
import { GiGoldStack, GiHamburgerMenu } from "react-icons/gi";
import { GoStack } from "react-icons/go";
import { MdPersonOutline, MdLogout } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

const SecondNav = () => {
  const [sidebar, setSidebar] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0); // Track cart items
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate user authentication check
    const checkUserAuth = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("CustomerID");

      if (token || id) {
        setIsLoggedIn(true);
        setUsername("User"); // Replace with actual user fetch
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserAuth();

    fetch('http://localhost:5001/api/ocs/products/catsub')
      .then((res) => res.json())
      .then((data) => {
        const transformedData = transformAndFilterData(data);
        setCategories(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });

    // Simulate cart item count fetch
    const cartCount = localStorage.getItem("cartItemCount") || 0;
    setCartItemCount(Number(cartCount)); // Replace with actual cart count fetch
  }, []);

  const transformAndFilterData = (data: any[]): Category[] => {
    const categoriesMap = new Map<number, Category>();

    data.forEach((item) => {
      if (item.subcategory_id) {
        if (!categoriesMap.has(item.category_id)) {
          categoriesMap.set(item.category_id, {
            id: item.category_id,
            name: item.category_name,
            subcategories: []
          });
        }

        const category = categoriesMap.get(item.category_id)!;

        let subcategory = category.subcategories.find(sub => sub.id === item.subcategory_id);
        if (!subcategory) {
          subcategory = {
            id: item.subcategory_id!,
            name: item.subcategory_name!
          };
          category.subcategories.push(subcategory);
        }
      }
    });

    return Array.from(categoriesMap.values()).filter(category =>
      category.subcategories.length > 0
    );
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("CustomerID");
      setIsLoggedIn(false);
      setUsername(null);
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
 <div className="sticky top-0 z-50">
      <nav className="flex items-center justify-between py-3 px-6 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        {/* Left - Branding & Navigation Links */}
        <div className="flex items-center space-x-4">
          <p
            className="text-3xl font-bold cursor-pointer hover:text-yellow-300 transition duration-300 ease-in-out"
            onClick={() => navigate("/")}
          >
            Fashion
          </p>
          <NavLink
            to="/"
            className="text-lg font-medium hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg font-medium hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            About Us
          </NavLink>
        </div>

        {/* Center - Category Dropdowns */}
        <div className="hidden md:flex flex-grow justify-center space-x-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="relative group">
                <span className="text-xl font-semibold cursor-pointer hover:text-yellow-300">
                  {category.name}
                </span>
                <ul className="absolute left-0 top-8 hidden bg-white text-gray-800 shadow-lg rounded-md group-hover:block transform group-hover:scale-105 min-w-[250px] p-4 z-10">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id} className="border-b last:border-b-0">
                      <NavLink
                        to={`/subcategory/${subcategory.id}`}
                        className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                      >
                        {subcategory.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Right - User Icons & Cart */}
        <div className="flex items-center space-x-6">
          <NavLink to="/myorder" className="relative">
            <GoStack className="text-3xl hover:text-yellow-300 transition duration-300" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/cart" className="relative">
            <FaCartPlus className="text-3xl hover:text-yellow-300 transition duration-300" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </NavLink>

          {!isLoggedIn ? (
            <div className="flex space-x-4 items-center">
              <NavLink
                to="/login"
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-bold transition duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-md font-bold transition duration-300"
              >
                Signup
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <p className="text-sm font-medium">{username}</p>
              <NavLink to="/profile">
                <MdPersonOutline className="text-2xl hover:text-yellow-300 transition duration-300" />
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-2xl text-red-600 hover:text-red-800 transition duration-300"
              >
                <MdLogout />
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer hover:text-yellow-300 transition duration-300"
            onClick={() => setSidebar(true)}
          />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-transform duration-300 ease-in-out ${
            sidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <IoMdClose
              className="text-2xl cursor-pointer hover:text-yellow-300 transition duration-300"
              onClick={() => setSidebar(false)}
            />
          </div>
          <ul className="space-y-4 p-4">
            {loading ? (
              <li>Loading...</li>
            ) : (
              categories.map((category) => (
                <li key={category.id} className="relative group">
                  <span className="text-lg font-medium">{category.name}</span>
                  <ul className="mt-2 bg-white text-gray-800 rounded-md shadow-md">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.id}>
                        <NavLink
                          to={`/subcategory/${subcategory.id}`}
                          className="block px-4 py-2 hover:bg-blue-100"
                        >
                          {subcategory.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SecondNav;
