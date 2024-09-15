import Newproduct from "../homepage-accessories/Newproduct";
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
      <ImageGrid />
      <Newproduct />
      <ProductList varient={"all-product"} />
    </div>
  );
};

export default Index;
