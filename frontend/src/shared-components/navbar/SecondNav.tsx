import { NavLink, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdPersonOutline, MdLogout } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state
  const [username, setUsername] = useState<string | null>(null); // Store username
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate user authentication check
    const checkUserAuth = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("CustomerID");
      
      if (token || id) {
        setIsLoggedIn(true);
        // Simulate fetching username
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
    <div>
      <nav className="flex items-center justify-between py-3 px-6 shadow-md bg-white">
        <div className="flex items-center space-x-4">
          <p className="text-2xl font-bold cursor-pointer text-gray-800 hover:text-blue-600 mr-32" onClick={() => navigate("/")}>Fashion</p>
          <NavLink to="/" className="text-lg font-bold text-gray-700 hover:text-blue-600">Home</NavLink>
          <NavLink to="/about" className="text-lg text-gray-700 font-bold hover:text-blue-600">About Us</NavLink>
        </div>

        <div className="hidden md:flex flex-grow justify-center space-x-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="relative group">
                <span className="text-lg font-medium cursor-pointer text-gray-800 hover:text-gray-600">{category.name}</span>
                <ul className="absolute left-0 hidden -mt-[0.8px] bg-white shadow-lg rounded-md group-hover:block">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id} className="border-b last:border-b-0">
                      <NavLink
                        to={`/subcategory/${subcategory.id}`}
                        className="block px-4 py-2 text-black hover:bg-gray-100"
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

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <div className="flex space-x-4">
              <NavLink to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</NavLink>
              <NavLink to="/signup" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Signup</NavLink>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <p className="text-sm font-medium text-gray-800">{username}</p>
              <NavLink to="/profile" className="text-xl text-gray-800 hover:text-blue-600">
                <MdPersonOutline />
              </NavLink>
              <button onClick={handleLogout} className="text-xl text-red-600 hover:text-red-800">
                <MdLogout />
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer text-gray-800 hover:text-blue-600"
            onClick={() => setSidebar(true)}
          />
        </div>

        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-md transition-transform duration-300 ease-in-out ${sidebar ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-end p-4">
            <IoMdClose className="text-2xl cursor-pointer text-gray-800 hover:text-blue-600" onClick={() => setSidebar(false)} />
          </div>
          <ul className="space-y-4 p-4">
            {loading ? (
              <li>Loading...</li>
            ) : (
              categories.map((category) => (
                <li key={category.id} className="relative group">
                  <span className="text-lg font-medium cursor-pointer text-gray-800 hover:text-gray-600">{category.name}</span>
                  <ul className="absolute left-0 hidden mt-2 bg-white shadow-lg rounded-md group-hover:block">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.id} className="border-b last:border-b-0">
                        <NavLink
                          to={`/subcategory/${subcategory.id}`}
                          className="block px-4 py-2 text-black hover:bg-gray-100"
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
