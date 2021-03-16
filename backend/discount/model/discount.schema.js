const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
  cut: { type: Number, requird: true },
  expirationDate:{type: Date, requird: true},
  productId: {type: String, requird: true},
  forUser: {type: String}
});

module.exports = mongoose.model("Discounts", discountSchema);
