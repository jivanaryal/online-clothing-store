import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewProducts from "./pages/products/ViewProducts";
import ViewCategories from "./pages/categories/ViewCategories";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import AddCategories from "./pages/categories/AddCategories";
import EditCategory from "./pages/categories/EditCatgory";
import ViewSubCategories from "./pages/subcategories/ViewSubCategories";
import AddSubCategories from "./pages/subcategories/AddSubCategories";
import EditSubCategories from "./pages/subcategories/EditSubCategories";
import MoreAction from "./pages/products/MoreAction";
// import AddProductDiscount from "./pages/discounts/AddProductDiscount";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<ViewProducts />} />
            <Route path="/products/add-product" element={<AddProduct />} />
            <Route path="/products/action/:id" element={<MoreAction />} />

            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route
              path="/subcategories/edit/:id"
              element={<EditSubCategories />}
            />
            <Route path="/categories" element={<ViewCategories />} />
            <Route path="/subcategories" element={<ViewSubCategories />} />
            <Route path="/add-category" element={<AddCategories />} />
            <Route path="/add-subcategory" element={<AddSubCategories />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
