const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  price: { type: Number, requird: true, unique: true },
  expirationDate:{type: Date, requird: true},
  productId: {type: String, requird: true}
});

module.exports = mongoose.model("Discounts", couponSchema);
