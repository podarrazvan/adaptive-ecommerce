const mongoose = require("mongoose");

const websiteSchema = mongoose.Schema({
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
  footer: {
    adress: { type: String },
    phone: { type: String },
    email: { type: String },
    program: { type: String },
  },
  facebook: {
    image: { type: String },
    url: { type: String },
  },
  twitter: {
    image: { type: String },
    url: { type: String },
  },
  youtube: {
    image: { type: String },
    url: { type: String },
  },
  instagram: {
    image: { type: String },
    url: { type: String },
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
  shippingInfo: {type: String},
  paymentInfo: {type: String},
  returnsExchange: {type: String},
  faq: {type: String},
  customerService: {type: String},
  buyerProtection: {type: String},
  help: {type: String},
});

module.exports = mongoose.model("Configs", websiteSchema);
