const mongoose = require("mongoose");

const websiteSchema = mongoose.Schema({
  name: { type: String, requird: true },
  categories: [{ name: { type: String } }],
  brands: [
    {
      name: { type: String },
      image: { type: String },
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
  aboutUs: { type: String },
  termsOfUse: { type: String },
});

module.exports = mongoose.model("Configs", websiteSchema);
