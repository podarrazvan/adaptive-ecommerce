const express = require("express");

const Coupon = new require("../models/coupon");

const router = express.Router();

router.put("/:id", (req, res, next) => {
  console.log(req.body);

  const coupon = new Coupon({
    _id: req.params.id,
    code: req.body.code,
    discount: req.body.discount,
  });

  Coupon.updateOne({ _id: req.params.id }, coupon).then((result) => {
    console.log(result);
    if (result.nModified > 0) {
      res.status(200).json({ message: "Coupon updated successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.post("", (req, res, next) => {
  console.log(req.body);

  const coupon = new Coupon({
    code: req.body.code,
    discount: req.body.discount,
  });

  coupon.save().then((createdCoupon) => {
    res.status(201).json({
      message: "Coupon created successfully",
      post: {
        ...createdCoupon,
        id: createdCoupon._id,
      },
    });
  });
});

router.get("/:code", (req, res, next) => {
  Coupon.findOne({code:req.params.code}).then((coupon) => {
    res.status(200).json({
      coupon: coupon
    });
  });
});

module.exports = router;
