"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigsSchema = void 0;
const mongoose = require("mongoose");
const contact_interface_1 = require("../../shared/interfaces/contact.interface");
exports.ConfigsSchema = new mongoose.Schema({
    name: { type: String, requird: true },
    categories: [{ name: { type: String } }],
    brands: [
        {
            name: { type: String },
            image: { type: String },
            description: { type: String },
        },
    ],
    shipping: [
        {
            name: { type: String },
            price: { type: Number },
        },
    ],
    contact: {
        adress: { type: String },
        phone: { type: String },
        email: { type: String },
        program: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        twitter: { type: String },
    },
    schedule: {
        sundayStart: { type: String },
        sundayEnd: { type: String },
        mondayStart: { type: String },
        mondayEnd: { type: String },
        tuesdayStart: { type: String },
        tuesdayEnd: { type: String },
        wednesdayStart: { type: String },
        wednesdayEnd: { type: String },
        thursdaysStart: { type: String },
        thursdaysEnd: { type: String },
        fridayStart: { type: String },
        fridayEnd: { type: String },
        saturdayStart: { type: String },
        saturdayEnd: { type: String },
    },
    aboutUs: { type: String },
    termsOfUse: { type: String },
    shippingInfo: { type: String },
    paymentInfo: { type: String },
    returnsExchange: { type: String },
    faq: { type: String },
    customerService: { type: String },
    buyerProtection: { type: String },
    help: { type: String },
});
//# sourceMappingURL=configs.model.js.map