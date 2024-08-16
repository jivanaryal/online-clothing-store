import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_IMAGE_URL, getSingle } from "../../services/api";
import { TProduct } from "../../types/products";
import Modal from "../../shared-components/Modal";
import AddProductDiscount from "../discounts/AddProductDiscount";

type IdProps = {
  newId: number;
};

const MoreAction = ({ newId }: IdProps) => {
  const [singleProduct, setSingleProduct] = useState<TProduct>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { id } = useParams();
  newId = Number(id);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getSingleProduct = async () => {
      const res = await getSingle(`/products/${id}`);

      setSingleProduct(res.data);
      console.log(singleProduct);
    };

    getSingleProduct();
  }, [id]);

  // brand: "samsung";
  // category_id: 4;
  // color: "red";
  // created_at: "2024-08-15T09:01:00.000Z";
  // description: "this is first descirption";
  // discount: "10.00";
  // imageURL: ["/uploads/imageURL-1723712460777-993735676.png"];
  // name: "pubg";
  // price: "1000.00";
  // product_id: 58;
  // size: "xl";
  // stockQuantity: 19;
  // subcategory_id: 11;
  // updated_at: "2024-08-15T09:01:00.000Z";
  return (
    <main className=" w-9/12 mx-auto ">
      <section className="grid grid-cols-12 ">
        <section className="left col-span-5 border-2">
          {singleProduct != undefined &&
            singleProduct.imageURL.map((val, index) => (
              <img src={API_IMAGE_URL + val} alt="image" key={index} />
            ))}
        </section>
        <section className="right col-span-7 border-2">
          {/* <h1>{singleProduct.name}</h1> */}
          <section>rating</section>
          <b>Brand : {singleProduct?.brand}</b>
          <hr />
          <p>Rs. {singleProduct?.price}</p>
          <p>{singleProduct?.discount}%</p>
          <hr />
          <p>{singleProduct?.color}</p>

          <section className="border-2 h-full ">
            <div className="flex">
              <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                update discount
              </button>

              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AddProductDiscount newId={newId} />
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Close
                </button>
              </Modal>
            </div>
            <button></button>
          </section>
        </section>
      </section>
    </main>
  );
};

export default MoreAction;
