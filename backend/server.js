const express = require("express");
const DbConnection = require("./database/connect");
const customerRoutes = require("./routes/customers");

const app = express();
app.use(express.json());

app.use("/api/auth/customers", customerRoutes);

const port = 5001;

app.listen(port, console.log(`the app is listening at port ${port}`));
