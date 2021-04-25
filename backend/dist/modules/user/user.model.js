"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    username: { type: String, requird: true, unique: true },
    email: { type: String, requird: true, unique: true },
    password: { type: String, requird: true },
    favorites: [{ type: String }],
    history: [
        {
            product: { type: String },
        },
    ],
    categories: [{ type: String }],
    isAdmin: { type: Boolean },
    recoveryPasswordCode: { type: String },
});
//# sourceMappingURL=user.model.js.map