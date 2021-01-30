const express = require("express");

const Coupon = new require("../model/coupon.schema");

import { LOGS } from '../../shared/errors';

const router = express.Router();

router.post("", (req, res, next) => {
  const {code, discount} = req.body;
  const coupon = new Coupon({code,discount});
  coupon.save().then((createdCoupon) => {
    res.status(201).json({
      message: LOGS.COUPONS.CREATED,
      post: {
        ...createdCoupon,
        id: createdCoupon._id,
      },
    });
  });
});

router.get("", (req, res, next) => {
  Coupon.find().then((coupon) => {
    res.status(200).json({
      coupon: coupon
    });
  });
});

router.put("/:id", (req, res, next) => {
  const _id = req.params.id;
  const {code, discount} = req.body;
  const coupon = new Coupon({_id,code,discount});

  Coupon.updateOne({ _id }, coupon).then(
    (result) => {
      res.status(200).json({ message: LOGS.COUPONS.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.COUPONS.FAILED });
    }
  );
});

router.get("/:code", (req, res, next) => {
  Coupon.findOne({code:req.params.code}).then((coupon) => {
    res.status(200).json({
      coupon: coupon
    });
  });
});


module.exports = router;
