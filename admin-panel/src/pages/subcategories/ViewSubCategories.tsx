import { useEffect, useState } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { getSingle, remove } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { TCategory } from "../../types/category";

const ViewSubCategories = () => {
  const [category, setCategory] = useState<TCategory[]>([]);
  const [subcategory, setSubCategory] = useState([]);
  const [toggele, setToggle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getCategory() {
      const res = await getSingle("/categories");
      const res1 = await getSingle("/subcategories/all");
      console.log(res1);
      setCategory(res.data);
      setSubCategory(res1.data);
    }
    getCategory();
  }, [toggele]);

  const handleDelete = async (id: number) => {
    try {
      const res = await remove(`/subcategories/${id}`);
      if (res?.status === 200) {
        toast.success("delete from sucessfully");
        setToggle(!toggele);
      } else {
        toast.error("having error in deleting the product check you query");
      }
    } catch (error) {
      toast.error("can't delete the product");
    }
  };

  return (
    <div className="pt-20  mx-10">
      <div className="flex justify-between pb-5">
        <h1 className="text-2xl font-semibold text-gray-700 ">
          Sub Category List
        </h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200 delay-100 mt-3 text-sm font-semibold text-white py-2 px-3 flex items-center gap-2 rounded"
          onClick={() => navigate("/products/add-subcategory")}
        >
          <FaPlus />
          <p>Create New</p>
        </button>
      </div>
      <table className="table-auto w-full rounded-lg border-collapse">
        <thead className="bg-blue-800 text-white text-sm font-semibold">
          <tr>
            <th className="py-3 text-center px-2 border-b border-mainColor">
              S.No
            </th>
            <th className="py-3 px-1 border-b border-mainColor">
              Sub Category Name
            </th>
            <th className="py-3 px-1 border-b border-mainColor">
              Category Name
            </th>
            <th className="py-3 px-2 border-b border-mainColor hidden md:table-cell">
              Description
            </th>
            <th className="py-3 border-b border-mainColor">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 md:text-base text-[12px] font-bold">
          {subcategory.map((category, i) => (
            <tr key={i} className="border-b border-mainColor hover:bg-gray-100">
              <td className="py-3 text-center">{i + 1}</td>

              <td className="py-3 text-center  capitalize">
                {category.subcategory_name}
              </td>
              <td className="py-3 text-center capitalize">
                {category.category_name}
              </td>
              <td className="py-3 text-center text-xs capitalize hidden md:table-cell">
                {category.subcategory_description}
              </td>
              <td className="py-3">
                <div className="flex justify-center md:justify-center gap-3">
                  <MdDelete
                    className="md:text-3xl text-center text-xl hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300 cursor-pointer"
                    onClick={() => handleDelete(category.subcategory_id)}
                  />
                  <Link to={`edit/${category.subcategory_id}`} state={category}>
                    {" "}
                    <MdOutlineUpdate className="md:text-3xl text-center text-xl cursor-pointer" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSubCategories;
