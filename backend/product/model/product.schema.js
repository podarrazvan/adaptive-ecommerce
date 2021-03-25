const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  title: { type: String, require: true },
  category: { type: String, require: true },
  price: { type: Number, require: true },
  tags: [{ type: String, require: true }],
  description: { type: String, require: true },
  thumbnail: { type: String, require: true },
  mainImg: { type: String },
  images: [{ type: String, require: true }],
  quantity: { type: Number, require: true },
  views: { type: Number, require: true },
  brand: { type: String, require: true },
  productModel: [{ type: String, require: true }],
  autoMode: {
    minPrice: { type: Number }, // min price for auto generated offers
    salesWeekTarget: { type: Number }, // how many should be sold each week in auto mode
  },
  initialQuantity: { type: Number, require: true },
  sold: { type: Number, require: true },
  rating: {
    oneStar:{type: Number},
    twoStars:{type: Number},
    threeStars:{type: Number},
    forStars:{type: Number},
    fiveStars:{type: Number},
    average:{type: Number}
  },
  productNumber: { type: Number, require: true }, //date in seconds since midnight, 1 Jan 1970
});

module.exports = mongoose.model("Product", userSchema);
