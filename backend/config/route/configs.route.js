const express = require("express");
const collection = new require("../model/configs.schema");
const LOGS = require("../../shared/logs");
const checkAdmin = require("../../shared/middlewares/check-admin");

const router = express.Router();

router.post("",checkAdmin, (req, res, next) => {
  const website = new collection({
    name: req.body.name,
    categories: req.body.categories,
    brands: req.body.brands,
    shipping: req.body.shipping,
    footer: {
      adress: req.body.adress,
      phone: req.body.phone,
      program: req.body.program,
      email: req.body.email,
    },
    facebook: {
      image: req.body.facebookImage,
      url: req.body.facebookUrl,
    },
    twitter: {
      image: req.body.twitterImage,
      url: req.body.twitterUrl,
    },
    youtube: {
      image: req.body.youtubeImage,
      url: req.body.youtubeUrl,
    },
    instagram: {
      image: req.body.instagramImage,
      url: req.body.instagramUrl,
    },
    aboutUs: req.body.aboutUs,
    termsOfUse: req.body.termsOfUse,
  });
  website.save().then((data) => {
    res.status(201).json({
      message: LOGS.CONFIGS.SET,
      post: {
        id: data._id,
      },
    });
  });
});

router.get("", (req, res, next) => {
  collection.find().then((documents) => {
    res.status(200).json(documents[0]);
  });
});

router.put("/:id/websiteName",checkAdmin, (req, res, next) => {
  const name = req.body.data;
  const _id = req.params.id;
  collection.findByIdAndUpdate({ _id }, { name }).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.NAME.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.NAME.FAILED });
    }
  );
});

router.put("/:id/websiteCategories",checkAdmin, (req, res, next) => {
  const categories = req.body.data;
  const _id = req.params.id;
  collection.findByIdAndUpdate({ _id }, { categories }).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.CATEGORIES.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.CATEGORIES.FAILED });
    }
  );
});

router.put("/:id/websiteBrands",checkAdmin, (req, res, next) => {
  const brands = req.body.data;
  const _id = req.params.id;

  collection.findByIdAndUpdate({ _id }, { brands }).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.BRANDS.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.BRANDS.FAILED });
    }
  );
});

router.put("/:id/websiteShipping",checkAdmin, (req, res, next) => {
  const shipping = req.body.data;
  const _id = req.params.id;
  collection.findByIdAndUpdate({ _id: _id }, { shipping }).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.SHIPPING.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.SHIPPING.FAILED });
    }
  );
});

router.put("/:id/websiteFooter",checkAdmin, (req, res, next) => {
  const footer = req.body.data;
  const _id = req.params.id;
  const websiteFooter = new collection({ _id, footer });
  collection.findByIdAndUpdate({ _id }, websiteFooter).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.FOOTER.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.FOOTER.FAILED });
    }
  );
});

router.put("/:id/websiteFacebook",checkAdmin, (req, res, next) => {
  const facebook = req.body.data;
  const _id = req.params.id;
  const websiteFacebook = new collection({ _id, facebook });
  collection.findByIdAndUpdate({ _id: _id }, websiteFacebook).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.FACEBOOK.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.FACEBOOK.FAILED });
    }
  );
});

router.put("/:id/websiteYoutube",checkAdmin, (req, res, next) => {
  const youtube = req.body.data;
  const _id = req.params.id;
  const websiteYoutube = new collection({ _id, youtube });
  collection.findByIdAndUpdate({ _id: _id }, websiteYoutube).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.YOUTUBE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.YOUTUBE.FAILED });
    }
  );
});

router.put("/:id/websiteTwitter",checkAdmin, (req, res, next) => {
  const twitter = req.body.data;
  const _id = req.params.id;
  const websiteTwitter = new collection({ _id, twitter });
  collection.findByIdAndUpdate({ _id: _id }, websiteTwitter).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.TWITTER.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.TWITTER.FAILED });
    }
  );
});

router.put("/:id/websiteInstagram",checkAdmin, (req, res, next) => {
  const instagram = req.body.data;
  const _id = req.params.id;
  const websiteInstagram = new collection({ _id, instagram });
  collection.updateOne({ _id: _id }, websiteInstagram).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.INSTAGRAM.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.INSTAGRAM.FAILED });
    }
  );
});

router.put("/:id/websiteScheduleForm",checkAdmin, (req, res, next) => {
  const schedule = req.body.data;
  const _id = req.params.id;
  const websiteSchedule = new collection({ _id, schedule });
  collection.findByIdAndUpdate({ _id }, websiteSchedule).then(
    (result) => {
      res.status(200).json({ message: LOGS.CONFIGS.SCHEDULE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.CONFIGS.SCHEDULE.FAILED });
    }
  );
});

module.exports = router;
