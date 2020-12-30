const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  content: { type: String, requird: true}
});

module.exports = mongoose.model("TermsOfUse", userSchema);
