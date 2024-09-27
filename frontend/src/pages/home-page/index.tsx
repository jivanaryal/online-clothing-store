import Newproduct from "../homepage-accessories/Newproduct";
import Recommendation from "../homepage-accessories/Recommendation";
import ImageGrid from "../images/Grid";
import CarouselSection from "./carousel/Crousel-Section";
import HeroSection from "./hero-section/HeroSection";
import ProductList from "./products/product-list";
// import ProductList from "./products/product-list";

const Index = () => {
  return (
    <div>
      <CarouselSection />
      <HeroSection />
      {/* <ProductList /> */}
      <div className="mx-10">
      {/* <ImageGrid /> */}
      <Newproduct />
      <Recommendation />
        <ProductList varient={"all-product"} />
        </div>
    </div>
  );
};

export default Index;
