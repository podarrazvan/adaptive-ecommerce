const express = require("express");

const Configs = new require('../../config/model/configs.schema');

const LOGS = require("../../shared/logs")

const router = express.Router();

router.put("/about-us/:id",(req, res, next) => {
    const aboutUs = req.body.content;

    Configs.findByIdAndUpdate({_id: req.params.id},{aboutUs:aboutUs}).then(
      (result) => {
        res.status(200).json({ message: LOGS.TERMS_OF_USE.UPDATE });
      },
      (err) => {
        res.status(401).json({ message: LOGS.TERMS_OF_USE.FAILED });
      }
    );
    });

router.put("/terms-of-use/:id",(req, res, next) => {
    const termsOfUse = req.body.content

    Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
      (result) => {
        res.status(200).json({ message: LOGS.ABOUT_US.UPDATE });
      },
      (err) => {
        res.status(401).json({ message: LOGS.ABOUT_US.FAILED });
      }
    );
});

module.exports = router;
