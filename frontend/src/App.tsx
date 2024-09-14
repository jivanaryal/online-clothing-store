import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/layout/Layout";
import HomePage from "./pages/home-page";
// import NewArrivals from "./pages/New Arrivals/NewArrivals";
import Sales from "./pages/sales-page/Sales";
import Shop from "./pages/shop-page/Shop";
import HeroProduct from "./single-product-page/HeroProduct";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import CartPage from "./pages/cart-page/CartPage";
import SubcategoryProducts from "./shared-components/all-products/SubCategoriesProduct";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/subcategory/:id" element={<SubcategoryProducts />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:id" element={<HeroProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route
            path="/sales"
            element={
              <PrivateRoute>
                <Sales />
              </PrivateRoute>
            }
          />
           <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
