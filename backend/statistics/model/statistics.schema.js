const mongoose = require("mongoose");

const statisticsSchema = mongoose.Schema({
  search: [
    {
      searchedElement: { type: String },
      total: { type: Number },
      currentDay: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Statistics", statisticsSchema);
