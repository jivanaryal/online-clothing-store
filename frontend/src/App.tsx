import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/layout/Layout";
import HomePage from "./pages/home-page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
