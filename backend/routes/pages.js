const express = require("express");
const AboutUs = new require('../models/about-us');
const TermsOfUse = new require('../models/terms-of-use');

const router = express.Router();

router.post("/about-us",(req, res, next) => {
    console.log(req.body);
  
    const aboutUs = new AboutUs ({
        content: req.body.info
    });
    aboutUs.save().then(createdPage => {
        res.status(201).json({
            message: "About us created successfully",
            post: {
                ...createdPage,
                id: createdPage._id
            }
        });
    });
    
});

router.put("/about-us/:id",(req, res, next) => {
    console.log(req.body);
    const aboutUS = new AboutUs ({
        _id:req.params.id,
        content: req.body.content
    });

    AboutUs.updateOne({_id: req.params.id},aboutUS).then(result => {
        console.log(result);
        if(result.nModified > 0) {
            res.status(200).json({message: "About us update successful!"});
        } else {
            res.status(401).json({message: "Not authorized!"});
        }
    });
});

router.get("/about-us", (req, res, next) => {
    AboutUs.find().then(inf => {
        res.status(200).json({
            info: inf
        });
    })
});

///

router.post("/terms-of-use",(req, res, next) => {
    console.log(req.body);
  
    const termsOfUSe = new TermsOfUse ({
        content: req.body.content
    });
    termsOfUSe.save().then(createdPage => {
        res.status(201).json({
            message: "Terms of use successfully",
            post: {
                ...createdPage,
                id: createdPage._id
            }
        });
    });
    
});

router.put("/terms-of-use/:id",(req, res, next) => {
    console.log(req.body.content);
    const termsOfUse = new TermsOfUse ({
        _id:req.params.id,
        content: req.body.content
    });

    TermsOfUse.updateOne({_id: req.params.id},termsOfUse).then(result => {
        if(result.nModified > 0) {
            res.status(200).json({message: "Terms of use updated successful!"});
        } else {
            res.status(401).json({message: "Not authorized!"});
        }
    });
});

router.get("/terms-of-use", (req, res, next) => {
    TermsOfUse.find().then(inf => {
        res.status(200).json({
            info: inf
        });
    })
});

module.exports = router;
