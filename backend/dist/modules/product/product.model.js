"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose = require("mongoose");
const product_model_interface_1 = require("../../shared/interfaces/product-model.interface");
exports.ProductSchema = new mongoose.Schema({
    title: { type: String, require: true },
    category: { type: String, require: true },
    price: { type: Number, require: true },
    tags: [{ type: String, require: true }],
    shortDescription: { type: String, require: true },
    description: { type: String, require: true },
    thumbnail: { type: String, require: true },
    mainImg: { type: String },
    images: [{ type: String, require: true }],
    quantity: { type: Number, require: true },
    views: { type: Number, require: true },
    brand: { type: String, require: true },
    productModels: [
        {
            name: { type: String },
            price: { type: String },
        },
    ],
    autoMode: {
        minPrice: { type: Number },
        salesWeekTarget: { type: Number },
    },
    initialQuantity: { type: Number, require: true },
    sold: { type: Number, require: true },
    rating: {
        oneStar: { type: Number },
        twoStars: { type: Number },
        threeStars: { type: Number },
        forStars: { type: Number },
        fiveStars: { type: Number },
        average: { type: Number },
    },
    productNumber: { type: Number, require: true },
    public: { type: Boolean, require: true },
});
//# sourceMappingURL=product.model.js.map