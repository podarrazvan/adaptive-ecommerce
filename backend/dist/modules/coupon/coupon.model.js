"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponSchema = void 0;
const mongoose = require("mongoose");
exports.CouponSchema = new mongoose.Schema({
    code: { type: String, requird: true, unique: true },
    discount: { type: Number, requird: true },
});
//# sourceMappingURL=coupon.model.js.map