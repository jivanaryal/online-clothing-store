import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getSingle, remove } from "../../services/api";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TProduct } from "../../types/products";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CgMore } from "react-icons/cg";

const ViewProducts: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await getSingle("/products");
      setProducts(res.data);
    }

    getData();
  }, [toggle]);

  const handleDeleteProduct = async (id: number) => {
    try {
      const res = await remove(`/products/${id}`);
      if (res?.status === 200) {
        toast.success("product deleted");
        setToggle(!toggle);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="bg-[#F7F7F7] ">
      <header className="flex items-center justify-between mx-4 ">
        <h1 className="font-bold text-2xl">Products List</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200 delay-100 mt-3 text-sm font-semibold text-white py-2 px-3 flex items-center gap-2 rounded"
          onClick={() => navigate("/products/add-product")}
        >
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

          <section className="grid pb-6   pl-4 grid-cols-1 sm:grid- s-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.slice(0, 10).map((product, index) => (
              <section
                key={index}
                className="bg-white transition-all shadow-md delay-100 duration-300   p-4  border-[1px] rounded-md"
              >
                <div className="h-40 flex items-center justify-center">
                  <img
                    src={`http://localhost:5001${product.imageURL[0]}`}
                    alt={product.name}
                    className="object-cover h-full hover:scale-105 transition-all delay-100 duration-300"
                  />
                </div>
                <section className="text-sm mt-4">
                  <p className="text-gray-800 text-base">{product.name}</p>
                  <b className="font-bold text-sm">
                    Rs.{Number(product.price).toFixed(2)}
                  </b>
                </section>
                <section className="flex justify-center gap-5 mt-4 text-sm">
                  <Link
                    to={`/products/edit/${product.product_id}`}
                    state={product}
                  >
                    {" "}
                    <button className="bg-white shadow-sm hover:bg-green-100  border-[1px] px-3 py-2 flex gap-1 items-center rounded">
                      <FaPen className="text-[10px] text-gray-600" />
                      <p className="text-xs text-gray-800 font-bold ">Edit</p>
                    </button>{" "}
                  </Link>
                  <button
                    className="bg-white hover:bg-red-100 text-red-500 border-[1px]  p-2 gap-1 flex items-center rounded"
                    onClick={() => handleDeleteProduct(product.product_id)}
                  >
                    <MdDelete />
                    <p className="text-xs font-bold">Delete</p>
                  </button>
                  <button
                    className="bg-white hover:bg-blue-100 text-black  border-[1px]  p-2 gap-1 flex items-center rounded"
                    onClick={() => navigate(`action/${product.product_id}`)}
                  >
                    <CgMore />
                    <p className="text-xs font-bold">More</p>
                  </button>
                </section>
                <ToastContainer />
              </section>
            ))}
          </section>
        </div>
      </main>
    </main>
  );
};

export default ViewProducts;
