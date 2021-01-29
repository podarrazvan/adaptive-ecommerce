const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const couponSchema = mongoose.Schema({
  code: { type: String, requird: true, unique: true },
  discount:{type: Number, requird: true}
});

couponSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Coupons", couponSchema);
