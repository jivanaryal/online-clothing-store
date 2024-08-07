import ProductList from "./product-list";

const ProductWrapper = () => {
  return (
    <div className="container">
      <h2 className="text-2xl font-medium">Products</h2>
      <ProductList varient={"all-product"} />
    </div>
  );
};

export default ProductWrapper;
