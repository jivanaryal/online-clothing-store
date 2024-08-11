import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewProducts from "./pages/products/ViewProducts";
import ViewCategories from "./pages/categories/ViewCategories";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<ViewProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/categories" element={<ViewCategories />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
