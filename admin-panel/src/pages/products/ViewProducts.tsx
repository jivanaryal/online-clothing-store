import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getSingle } from "../../services/api";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TProduct } from "../../types/products";

const ViewProducts: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await getSingle("/products");
      setProducts(res.data);
    }

    getData();
  }, []);
  return (
    <main className="bg-[#F7F7F7] ">
      <header className="flex items-center justify-between mx-4 ">
        <h1 className="font-bold text-2xl">Products List</h1>
        <button className="bg-blue-700 mt-3 text-sm font-semibold text-white py-2 px-3 flex items-center gap-2 rounded">
          <FaPlus />
          <p>Create New</p>
        </button>
      </header>

      <main className="min-h-screen   bg-[#F7F7F7]  ">
        <div className="mx-10  bg-[#FFFFFF]">
          <header className="flex justify-between mt-3 px-3 py-2 ">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="search.."
              className="m-2 border-2 py-1 my-3 pl-2 pr-20 rounded border-gray-400"
            />
            <section>
              <button>Category</button>
              <button>Latest</button>
            </section>
          </header>

          <section className="grid pb-6   pl-4 grid-cols-1 sm:grid- s-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.slice(0, 10).map((product, index) => (
              <section
                key={index}
                className="bg-white   p-4 rounded-sm border-[1px] shadow-sm"
              >
                <div className="h-40 flex items-center justify-center">
                  <img
                    src={`http://localhost:5001${product.imageURL[0]}`}
                    alt={product.name}
                    className="object-cover h-full"
                  />
                </div>
                <section className="text-sm mt-4">
                  <p className="text-gray-800 text-base">{product.name}</p>
                  <b className="font-bold text-sm">
                    Rs.{Number(product.price).toFixed(2)}
                  </b>
                </section>
                <section className="flex justify-center gap-5 mt-4 text-sm">
                  <button className="bg-white  border-[1px] px-3 py-2 flex gap-1 items-center rounded">
                    <FaPen className="text-[10px] text-gray-600" />
                    <p className="text-xs text-gray-800 font-bold ">Edit</p>
                  </button>
                  <button className="bg-white text-red-500 border-[1px]  p-2 gap-1 flex items-center rounded">
                    <MdDelete />
                    <p className="text-xs font-bold">Delete</p>
                  </button>
                </section>
              </section>
            ))}
          </section>
        </div>
      </main>
    </main>
  );
};

export default ViewProducts;
