//Server/App.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const productsRouter = require("./Routers/ProductsRouter");
const customersRouter = require("./Routers/CustomersRouter");
const purchasesRouter = require("./Routers/PurchasesRouter");
const reviewsRouter = require("./Routers/ReviewsRouter");
const UserRouters = require("./Routers/UsersRouter");

require("./Config/ConfigDB");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/Products", productsRouter);
app.use("/Customers", customersRouter);
app.use("/Purchases", purchasesRouter);
app.use("/Reviews", reviewsRouter);
app.use("/Users", UserRouters);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
