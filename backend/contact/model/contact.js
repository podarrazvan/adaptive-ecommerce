const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, requird: true },
  subject: { type: String, requird: true },
  message: { type: String, requird: true },
  date: { type: Date, requird: true },
  seen: { type: Boolean, requird: true },
});

module.exports = mongoose.model("Message", messageSchema);
