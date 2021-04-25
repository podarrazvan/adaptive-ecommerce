"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsSchema = void 0;
const mongoose = require("mongoose");
exports.StatisticsSchema = new mongoose.Schema({
    search: [
        {
            searchedElement: { type: String },
            total: { type: Number },
            currentDay: { type: Number },
        },
    ],
});
//# sourceMappingURL=statistics.model.js.map