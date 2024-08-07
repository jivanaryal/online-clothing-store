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
      <ProductList varient={""} />
    </div>
  );
};

export default Index;
