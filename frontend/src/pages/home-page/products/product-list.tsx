import { Tproduct } from "@/types/product";
import SingleProduct from "./single-product";
import ProductData from "@/data/products.json";
type props = {
  varient: string;
};

type productType = {
  product: Tproduct;
};
const ProductList = ({ varient }: props) => {
  return (
    <div className="">
      <div className="grid grid-cols-5 gap-6">
        {(ProductData as Tproduct[]).map((product, i) => {
          return (
            <div key={i}>
              <SingleProduct product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
