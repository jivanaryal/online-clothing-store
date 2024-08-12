import { useEffect, useState } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { getSingle } from "../../services/api";

const ViewCategories = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function getCategory() {
      const res = await getSingle("/categories");
      setCategory(res.data);
    }
    getCategory();
  }, []);

  return (
    <div className="pt-20  mx-10">
      <h1 className="text-2xl font-semibold text-gray-700 pb-5">
        Category List
      </h1>
      <table className="table-auto w-full rounded-lg border-collapse">
        <thead className="bg-blue-800 text-white text-sm font-semibold">
          <tr>
            <th className="py-3 text-center px-2 border-b border-mainColor">
              S.No
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
          {category.map((category, i) => (
            <tr key={i} className="border-b border-mainColor hover:bg-gray-100">
              <td className="py-3 text-center">{i + 1}</td>
              <td className="py-3 text-center capitalize">{category.name}</td>
              <td className="py-3 text-center capitalize hidden md:table-cell">
                {category.description}
              </td>
              <td className="py-3">
                <div className="flex justify-center md:justify-center gap-3">
                  <MdDelete className="md:text-3xl text-center text-xl hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300 cursor-pointer" />
                  <MdOutlineUpdate className="md:text-3xl text-center text-xl cursor-pointer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCategories;
