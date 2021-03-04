// require('dotenv').config({path:'./.env'});
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./user/route/users.route");
const productRoutes = require("./product/route/products.route");
const imagesRoutes = require("./shared/routes/upload-image.route");
const configsRoutes = require("./config/route/configs.route");
const pagesRoutes = require("./shared/routes/pages.route");
const coponsRoutes = require("./coupon/route/coupons.route");
const contactRoutes = require("./contact/route/contact.route");
const discountRoutes = require("./discount/route/discounts.route");
const orderRoutes = require("./order/route/order.route");

const app = express();

//
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
app.use(cookieParser());
//

module.exports = app;

const mongooseConfig = { // created by Sorin
  useUnifiedTopology: true,
  useNewUrlParser: true, 
  useCreateIndex: true,
};

mongoose
  .connect(
    "mongodb+srv://admin:admin@backend-test.6tqwn.mongodb.net/ecommerce",
    mongooseConfig
  )
  .then(() => {
    console.log("Connected!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/shared/images", express.static(path.join("shared/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "DELETE, POST, GET, OPTIONS, PUT"
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/website", configsRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/coupons", coponsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/discount", discountRoutes);
app.use("/api/order", orderRoutes);
