"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountSchema = void 0;
const mongoose = require("mongoose");
exports.DiscountSchema = new mongoose.Schema({
    cut: { type: Number, requird: true },
    expirationDate: { type: Date, requird: true },
    productId: { type: String, requird: true },
    forUser: { type: String },
});
//# sourceMappingURL=discount.model.js.map