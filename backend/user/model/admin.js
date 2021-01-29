const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, requird: true, unique: true },
  email: { type: String, requird: true, unique: true },
  password: { type: String, requird: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Admin", userSchema);
