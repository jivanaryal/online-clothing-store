import ProductList from "./product-list";

const ProductWrapper = () => {
  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-2xl font-medium">Products</h2>
      <ProductList varient={"all-product"} />
    </div>
  );
};

export default ProductWrapper;
