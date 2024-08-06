const express = require("express");
const path = require("path");
const DbConnection = require("./database/connect");
const customerRoutes = require("./routes/customers");
const CategoryRoutes = require("./routes/categories");
const SubCategoryRoutes = require("./routes/subcategories");
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth/ocs/customers", customerRoutes);
app.use("/api/ocs/categories", CategoryRoutes);
app.use("/api/ocs/subcategories", SubCategoryRoutes);
app.use("/api/ocs/products", productRoutes);
app.use("/api/ocs/reviews", reviewRoutes);

const port = 5001;

app.listen(port, console.log(`the app is listening at port ${port}`));
