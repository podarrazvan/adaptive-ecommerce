const express = require("express");

const Configs = new require('../../config/model/website-configs');

const router = express.Router();

router.put("/about-us/:id",(req, res, next) => {
    console.log('about us')
    console.log(req.body.content);
    const aboutUs = req.body.content;

    Configs.findByIdAndUpdate({_id: req.params.id},{aboutUs:aboutUs}).then(
        (result) => {
          res.status(200).json({ message: "Update successful!" });
        },
        (err) => {
          res.status(401).json({ message: "Bad request!" });
        }
      );
    });

router.get("/about-us", (req, res, next) => {
    Configs.find().then(inf => {
        res.status(200).json({
            info: inf
        });
    })
});

router.put("/terms-of-use/:id",(req, res, next) => {
    const termsOfUse = req.body.content

    Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
        (result) => {
          res.status(200).json({ message: "Update successful!" });
        },
        (err) => {
          res.status(401).json({ message: "Bad request!" });
        }
      );
});

router.get("/terms-of-use", (req, res, next) => {
    Configs.find().then(inf => {
        res.status(200).json({
            info: inf
        });
    })
});

module.exports = router;
