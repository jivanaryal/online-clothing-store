import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_IMAGE_URL, getSingle } from "../../services/api";
import { TProduct } from "../../types/products";

const MoreAction = () => {
  const [singleProduct, setSingleProduct] = useState<TProduct>();

  const { id } = useParams();

  useEffect(() => {
    const getSingleProduct = async () => {
      const res = await getSingle(`/products/${id}`);

      setSingleProduct(res.data);
    };

    getSingleProduct();
  }, [id]);
  return (
    <main className=" w-9/12 mx-auto min-h-screen">
      <section className="grid grid-cols-12 ">
        <section className="left col-span-5 border-2">
          {singleProduct != undefined &&
            singleProduct.imageURL.map((val, index) => (
              <img src={API_IMAGE_URL + val} alt="image" key={index} />
            ))}
        </section>
        <section className="right col-span-7 border-2">right</section>
      </section>
    </main>
  );
};

export default MoreAction;
