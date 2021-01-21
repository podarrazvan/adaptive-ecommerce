const express = require("express");
const WebsiteDetails = new require("../models/website-details");

const router = express.Router();

router.put("/:id", (req, res, next) => {
  console.log(req.body);
    const website = new WebsiteDetails({
        _id:req.params.id,
        name: req.body.info.name,
        categories: req.body.info.categories,
        brands: req.body.info.brands,
        shipping: req.body.shipping,
        footer: {
          adress: req.body.info.adress,
          phone: req.body.info.phone,
          program: req.body.info.program,
          email: req.body.info.email,
        },
        facebook: {
          image: req.body.info.facebookImage,
          url: req.body.info.facebookUrl,
        },
        twitter: {
          image: req.body.info.twitterImage,
          url: req.body.info.twitterUrl,
        },
        youtube: {
          image: req.body.info.youtubeImage,
          url: req.body.info.youtubeUrl,
        },
        instagram: {
          image: req.body.info.instagramImage,
          url: req.body.info.instagramUrl,
        },
    });
  WebsiteDetails.updateOne({_id:req.params.id}, website).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.post("", (req, res, next) => {
    const website = new WebsiteDetails({
        name: req.body.info.name,
        categories: req.body.info.categories,
        brands: req.body.brands,
        shipping: req.body.shipping,
        footer: {
          adress: req.body.info.adress,
          phone: req.body.info.phone,
          program: req.body.info.program,
          email: req.body.info.email,
        },
        facebook: {
          image: req.body.info.facebookImage,
          url: req.body.info.facebookUrl,
        },
        twitter: {
          image: req.body.info.twitterImage,
          url: req.body.info.twitterUrl,
        },
        youtube: {
          image: req.body.info.youtubeImage,
          url: req.body.info.youtubeUrl,
        },
        instagram: {
          image: req.body.info.instagramImage,
          url: req.body.info.instagramUrl,
        },
    });
    console.log(req.body);
    website.save().then(data => {
        res.status(201).json({
            message: "Data added successfully",
            post: {
                id: data._id
            }
        });
    });
});

router.get("", (req, res, next) => {
  WebsiteDetails.find().then((documents) => {
    res.status(200).json({
      message: "Details fetched successfully",
      info: documents,
    });
  });
});

module.exports = router;
