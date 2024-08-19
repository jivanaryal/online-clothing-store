import { useEffect, useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CgMore } from "react-icons/cg";
import { getSingle, remove } from "../../services/api";
import { TProduct } from "../../types/products";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
        toast.success("Product deleted successfully");
        setToggle(!toggle);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <header className="flex items-center justify-between mx-6 py-4 bg-white shadow-md rounded-lg">
        <h1 className="font-bold text-3xl text-gray-800">Products List</h1>
        <button
          className="bg-blue-600 text-white text-sm font-semibold py-2 px-4 flex items-center gap-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          onClick={() => navigate("/add-product")}
        >
          <FaPlus />
          Create New
        </button>
      </header>

      <section className="mx-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <header className="flex justify-between items-center pb-4 border-b">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search products..."
              className="border border-gray-300 rounded-lg py-2 px-4 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex gap-4">
              <button className="text-blue-600 font-semibold">Category</button>
              <button className="text-blue-600 font-semibold">Latest</button>
            </div>
          </header>

          <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
            {products.slice(0, 10).map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-40 flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={`http://localhost:5001${product.imageURL[0]}`}
                    alt={product.name}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </p>
                  <p className="text-blue-600 font-bold text-sm mt-1">
                    Rs.{Number(product.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/products/edit/${product.product_id}`}
                    state={product}
                  >
                    <button className="flex items-center gap-1 text-blue-600 font-semibold text-sm bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-all">
                      <FaPen className="text-xs" />
                      Edit
                    </button>
                  </Link>
                  <button
                    className="flex items-center gap-1 text-red-600 font-semibold text-sm bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-all"
                    onClick={() => handleDeleteProduct(product.product_id)}
                  >
                    <MdDelete />
                    Delete
                  </button>
                  <button
                    className="flex items-center gap-1 text-gray-800 font-semibold text-sm bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-all"
                    onClick={() => navigate(`action/${product.product_id}`)}
                  >
                    <CgMore />
                    More
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
        <ToastContainer />
      </section>
    </main>
  );
};

export default ViewProducts;
