import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/layout/Layout";
import HomePage from "./pages/home-page";
import NewArrivals from "./pages/New Arrivals/NewArrivals";
import Sales from "./pages/sales-page/Sales";
// import About from "./pages/About-page/About";
import Shop from "./pages/shop-page/Shop";
import HeroProduct from "./single-product-page/HeroProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<HeroProduct />} />
          {/* <Route path="/about-us" element={<About />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
