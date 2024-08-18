import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_IMAGE_URL, getSingle } from "../../services/api";
import { TProduct } from "../../types/products";
import Modal from "../../shared-components/Modal";
import AddProductDiscount from "../discounts/AddProductDiscount";
import UpdateProductDiscount from "../discounts/EditProductDiscount";

type IdProps = {
  newId: number;
};

const MoreAction = ({ newId }: IdProps) => {
  const [singleProduct, setSingleProduct] = useState<TProduct>();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

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
      console.log(singleProduct);
    };

    getSingleProduct();
  }, [id]);

  return (
    <main className="w-9/12 mx-auto">
      <section className="grid grid-cols-12">
        <section className="left col-span-5 border-2">
          {singleProduct?.imageURL?.map((val, index) => (
            <img src={API_IMAGE_URL + val} alt="product" key={index} />
          ))}
        </section>
        <section className="right col-span-7 border-2">
          <section>rating</section>
          <b>Brand : {singleProduct?.brand}</b>
          <hr />
          <p>Rs. {singleProduct?.price}</p>
          <p>{singleProduct?.discount}%</p>
          <hr />
          <p>{singleProduct?.color}</p>

          <section className="border-2 h-full">
            <div className="flex space-x-4">
              <button
                onClick={openAddModal}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Discount
              </button>
              <button
                onClick={openUpdateModal}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Discount
              </button>

              <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
                <AddProductDiscount newId={newId} />
                <button
                  onClick={closeAddModal}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Close
                </button>
              </Modal>

              <Modal isOpen={isUpdateModalOpen} onClose={closeUpdateModal}>
                <UpdateProductDiscount newId={newId} />
                <button
                  onClick={closeUpdateModal}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Close
                </button>
              </Modal>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
};

export default MoreAction;
