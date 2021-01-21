const mongoose = require('mongoose');

const websiteSchema = mongoose.Schema({
    name: {type: String, requird: true},
    categories: [{type: String, requird: true}],
    brands:[{
        name:{type: String, requird: true},
        image:{type: String, requird: true},
    }],
    shipping:[{
        name:{type: String},
        price:{type: Number}
    }],
    footer: {
        adress: {type: String},
        phone: {type: String},
        email: {type: String},
        program: {type: String},
    },
    facebook: {
        image:{type: String},
        url:{type: String}
    },
    twitter: {
        image:{type: String},
        url:{type: String}
    },
    youtube: {
        image:{type: String},
        url:{type: String}
    },
    instagram: {
        image:{type: String},
        url:{type: String}
    },
});

module.exports = mongoose.model('Website', websiteSchema);
