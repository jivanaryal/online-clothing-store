import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewProducts from "./pages/products/ViewProducts";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<ViewProducts />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
