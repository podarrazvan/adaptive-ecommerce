const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const imagesRoutes = require('./routes/upload-image');

const app = express();

//
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
app.use(cookieParser());
//

module.exports = app;

mongoose.connect("mongodb+srv://admin:admin@backend-test.6tqwn.mongodb.net/ecommerce").then(()=>{
    console.log("Connected!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept"
    );
    res.setHeader(
     "Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PUT"
    );
    next();
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/images", imagesRoutes);