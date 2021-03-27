const express = require("express");
const Coupon = new require("../model/coupon.schema");
const LOGS = require("../../shared/logs")
const checkAdmin = require("../../shared/middlewares/check-admin");
const router = express.Router();

router.post("",checkAdmin, (req, res, next) => {
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

router.get("",checkAdmin, (req, res, next) => {
  Coupon.find().then((coupons) => {
    res.status(200).json(coupons);
  });
});

router.put("",checkAdmin, (req, res, next) => {
  const {_id,code, discount} = req.body;
  Coupon.findByIdAndUpdate({ _id }, {code,discount}).then(
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
    res.status(200).json(coupon);
  });
});

router.delete("/:id", checkAdmin, (req, res, next) => {
  Coupon.deleteOne({ _id: req.params.id }).then((coupon) => {
    res.status(200).json(coupon);
  });
});


module.exports = router;
