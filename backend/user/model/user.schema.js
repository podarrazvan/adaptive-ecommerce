const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: {type: String, requird: true, unique: true},
    email: {type: String, requird: true, unique: true},
    password: {type: String, requird: true},
    favorites: [{type: String}], //product's id
    history: [{
        id: {type: String}, //product's id
        time: {type: Number} //time spent on a product in seconds
    }],
    categories: [{type: String}], //top most viewed categories
    isAdmin: {type: Boolean},
    recoveryPasswordCode: {type: String},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
