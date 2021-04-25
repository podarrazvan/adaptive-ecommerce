"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSchema = void 0;
const mongoose = require("mongoose");
exports.EmailSchema = new mongoose.Schema({
    name: { type: String, requird: true },
    email: { type: String, requird: true },
    subject: { type: String, requird: true },
    message: { type: String, requird: true },
    date: { type: Date, requird: true },
    seen: { type: Boolean, requird: true },
});
//# sourceMappingURL=contact.model.js.map