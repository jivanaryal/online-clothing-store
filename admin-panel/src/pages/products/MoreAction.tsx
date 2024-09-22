import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_IMAGE_URL, getSingle } from "../../services/api";
import { TProduct } from "../../types/products";
import Modal from "../../shared-components/Modal";
import AddProductDiscount from "../discounts/AddProductDiscount";
import UpdateProductDiscount from "../discounts/EditProductDiscount";
import axios from "axios";

type IdProps = {
  newId: number;
};

const MoreAction = ({ newId }: IdProps) => {
  const [singleProduct, setSingleProduct] = useState<TProduct>();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  const { id } = useParams();
  newId = Number(id);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  useEffect(() => {
    const getSingleProduct = async () => {
      const res = await getSingle(`/products/${id}`);
      setSingleProduct(res.data);

      const res1 = await axios.get(`http://localhost:5001/api/ocs/products/${id}`);
      if (res1.data.discount_percentage === null) {
        setButtonDisable(false);
      } else {
        setButtonDisable(true);
      }
    };

    getSingleProduct();
  }, [id]);

  return (
    <main className="w-10/12 mx-auto py-8">
      <section className="grid grid-cols-12 gap-6">
        {/* Left Section: Product Image */}
        <section className="left col-span-5">
          <div className="border rounded-lg p-4 shadow-md">
            {singleProduct?.imageURL?.map((val, index) => (
              <img
                src={API_IMAGE_URL + val}
                alt="product"
                key={index}
                className="rounded-lg w-full object-cover mb-4"
              />
            ))}
          </div>
        </section>

        {/* Right Section: Product Details */}
        <section className="right col-span-7">
          <div className="border rounded-lg p-6 shadow-md">
            {/* Product Brand and Info */}
            <h2 className="text-2xl font-bold mb-4">{singleProduct?.brand}</h2>
            <p className="text-gray-600 text-lg mb-2">Price: <span className="font-semibold">Rs. {singleProduct?.price}</span></p>
            <p className="text-gray-600 text-lg mb-2">Discount: <span className="font-semibold">{singleProduct?.discount}%</span></p>
            <p className="text-gray-600 text-lg mb-4">Color: <span className="font-semibold">{singleProduct?.color}</span></p>

            {/* Action Buttons */}
            <section className="flex space-x-4">
              {/* Add Discount Button */}
              <button
                onClick={openAddModal}
                disabled={buttonDisable}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  buttonDisable
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Add Discount
              </button>

              {/* Update Discount Button */}
              <button
                onClick={openUpdateModal}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition hover:bg-blue-700"
              >
                Update Discount
              </button>
            </section>
          </div>
        </section>
      </section>

      {/* Modals */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <AddProductDiscount newId={newId} />
        <button
          onClick={closeAddModal}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onClose={closeUpdateModal}>
        <UpdateProductDiscount newId={newId} />
        <button
          onClick={closeUpdateModal}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </Modal>
    </main>
  );
};

export default MoreAction;
