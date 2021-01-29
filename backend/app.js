const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require('./user/route/users');
const productRoutes = require('./product/route/products');
const imagesRoutes = require('./shared/routes/upload-image');
const websiteDetailsRoutes = require('./config/route/website-configs');
const pagesRoutes = require('./shared/routes/pages');
const coponsRoutes = require('./coupon/route/coupons');
const contactRoutes = require('./contact/route/contact');
const discountRoutes = require('./discount/route/discounts');

const app = express();

//
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
app.use(cookieParser());
//

module.exports = app;

mongoose.connect("mongodb+srv://admin:admin@backend-test.6tqwn.mongodb.net/ecommerce", { useUnifiedTopology: true }, { useNewUrlParser: true }).then(()=>{
    console.log("Connected!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/shared/images")))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );
    res.setHeader(
     "Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PUT"
    );
    next();
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/website", websiteDetailsRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/coupons", coponsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/discount", discountRoutes);