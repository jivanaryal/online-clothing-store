import { NavLink, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdPersonOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./nav.css";

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
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div>
      <nav className="flex py-1 md:py-3 shadow-md justify-between items-center px-2 md:px-3">
        <div className="logo">
          <p className="md:text-2xl cursor-pointer font-semibold" onClick={() => navigate("/")}>Fashion</p>
        </div>

        <div>
          <ul
            className={`${
              sidebar
                ? "fixed right-0 top-0 z-[1000] text-xl block h-screen w-[250px] px-4 py-6 leading-10 text-black shadow-sm backdrop-blur-md"
                : "hidden"
            } gap-4 font-normal md:flex md:gap-4 md:font-medium lg:gap-10`}
          >
            <div className="sm:hidden" onClick={() => setSidebar(false)}>
              <IoMdClose className="text-4xl" />
            </div>

            {loading ? (
              <li>Loading...</li>
            ) : (
              categories.map((category) => (
                <li key={category.id} className="relative group">
                  <span className="text-black text-xl font-medium hover:text-gray-600 transition-colors duration-200 cursor-pointer">
                    {category.name}
                  </span>

                  {/* Dropdown for subcategories */}
                  <ul className="absolute text-lg bg-white text-black shadow-xl -mt-1 rounded-md w-[500px] z-[2000] hidden group-hover:block ">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.id} className="border-b last:border-b-0">
                        <NavLink
                          to={`/subcategory/${subcategory.id}`} // Adjust path as necessary
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
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

        <div className="flex items-center gap-3">
          <div className="search flex items-center border-2 px-2 h-9 gap-2 rounded-md">
            <IoSearchSharp className="text-xl cursor-pointer" />
            <input
              type="text"
              placeholder="Search for clothes"
              className="h-full outline-none border-none max-w-40"
            />
            <HiOutlineShoppingBag
              className="cursor-pointer text-2xl"
              onClick={() => navigate("/cart")}
            />
          </div>

          <div className="hidden md:flex gap-2 items-center">
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
            onClick={() => setSidebar(true)}
          />
        </div>
      </nav>
    </div>
  );
};

export default SecondNav;
