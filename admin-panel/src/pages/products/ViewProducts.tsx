import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { get, getSingle } from "../../services/api";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await getSingle("/products");
      setProducts(res.data);
    }

    getData();
  }, []);
  return (
    <main className="w-11/12 mx-auto mt-6">
      <header className=" overflow-x-hidden flex items-center justify-between">
        <h1 className="font-bold text-2xl ">Products List</h1>
        <button className="bg-blue-500 text-white py-2 px-3 flex items-center gap-2 rounded">
          <FaPlus />
          <p>Create New</p>
        </button>
      </header>

      <main className="min-h-screen bg-gray-200 mt-4">
        <header className="flex justify-between">
          <input type="search" name="search" id="search" className="m-2" />
          <section>
            <button>category</button>
            <button>latest</button>
          </section>
        </header>
        <hr />
        <section className="grid grid-cols-5">
          {products.map((product, index) => {
            console.log(product.imageURL[0]);
            return (
              <section key={index}>
                <img
                  src={`http://localhost:5001${product.imageURL[0]}`}
                  alt="image"
                />
              </section>
            );
          })}
        </section>
      </main>
    </main>
  );
};

export default ViewProducts;
