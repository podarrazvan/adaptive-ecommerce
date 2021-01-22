const express = require("express");
const WebsiteDetails = new require("../models/website-details");

const router = express.Router();


router.put("/:id/websiteName", (req, res, next) => {
  const name = req.body.info;
  const _id = req.params.id;
  const websiteName = new WebsiteDetails({_id,name});
  WebsiteDetails.updateOne({_id: _id}, websiteName).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id/websiteCategories", (req, res, next) => {
  const categories = req.body.info;
  const _id = req.params.id;
  const websiteCategories = new WebsiteDetails({_id,categories});
  WebsiteDetails.updateOne({_id: _id}, websiteCategories).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id/websiteBrands", (req, res, next) => {
  const brands = req.body.info;
  const _id = req.params.id;
  const websiteBrands = new WebsiteDetails({_id,brands});
  WebsiteDetails.updateOne({_id: _id}, websiteBrands).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id/websiteShipping", (req, res, next) => {
  const shipping = req.body.info;
  const _id = req.params.id;
  const websiteShipping = new WebsiteDetails({_id,shipping});
  WebsiteDetails.updateOne({_id: _id}, websiteShipping).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id/websiteFooter", (req, res, next) => {
  const footer = req.body.info;
  const _id = req.params.id;
  const websiteFooter = new WebsiteDetails({_id,footer});
  WebsiteDetails.updateOne({_id: _id}, websiteFooter).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id/websiteFacebook", (req, res, next) => {
  const facebook = req.body.info;
  const _id = req.params.id;
  const websiteFacebook = new WebsiteDetails({_id,facebook});
  WebsiteDetails.updateOne({_id: _id}, websiteFacebook).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id/websiteYoutube", (req, res, next) => {
  const youtube = req.body.info;
  const _id = req.params.id;
  const websiteYoutube = new WebsiteDetails({_id,youtube});
  WebsiteDetails.updateOne({_id: _id}, websiteYoutube).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id/websiteTwitter", (req, res, next) => {
  const twitter = req.body.info;
  const _id = req.params.id;
  const websiteTwitter = new WebsiteDetails({_id,twitter});
  WebsiteDetails.updateOne({_id: _id}, websiteTwitter).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id/websiteInstagram", (req, res, next) => {
  const instagram = req.body.info;
  const _id = req.params.id;
  const websiteInstagram = new WebsiteDetails({_id,instagram});
  WebsiteDetails.updateOne({_id: _id}, websiteInstagram).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});


// router.put("/:id", (req, res, next) => {
//   const {name, categories, brands, shipping, adress, phone, program ,email} = req.body.info;
//   const _id = req.params.id;

//     const website = new WebsiteDetails({
//         _id,
//         name,
//         categories,
//         brands: brands,
//         shipping: shipping,
//         footer: {
//           adress: adress,
//           phone: phone,
//           program: program,
//           email: email,
//         },
//         facebook: {
//           image: req.body.info.facebookImage,
//           url: req.body.info.facebookUrl,
//         },
//         twitter: {
//           image: req.body.info.twitterImage,
//           url: req.body.info.twitterUrl,
//         },
//         youtube: {
//           image: req.body.info.youtubeImage,
//           url: req.body.info.youtubeUrl,
//         },
//         instagram: {
//           image: req.body.info.instagramImage,
//           url: req.body.info.instagramUrl,
//         },
//     });
//   WebsiteDetails.updateOne({_id:req.params.id}, website).then((result) => {
//     if (result.nModified > 0) {
//       res.status(200).json({ message: "Update successful!" });
//     } else {
//       res.status(401).json({ message: "Not authorized!" });
//     }
//   });
// });

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
