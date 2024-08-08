import ProductList from "@/pages/home-page/products/product-list";

const SimilarProducts = () => {
  return (
    <div>
      SimilarProduct
      <section className="mt-10">
        <h3 className="font-medium text-2xl mb-5">You may also like</h3>
        <ProductList varient="similar-product" />
      </section>
    </div>
  );
};

export default SimilarProducts;
