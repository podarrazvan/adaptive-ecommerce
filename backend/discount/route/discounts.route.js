const express = require("express");

const Discount = new require("../model/discount.schema");

const LOGS = require("../../shared/logs");

const router = express.Router();

router.post("", (req, res, next) => {
  const { cut, expirationDate, productId } = req.body;
  const discount = new Discount({ cut, expirationDate, productId });

  discount.save().then((createdDiscount) => {
    res.status(201).json({
      message: LOGS.DISCOUNTS.CREATED,
      post: {
        ...createdDiscount,
        id: createdDiscount._id,
      },
    });
  });
});

router.get("", (req, res, next) => {
  Discount.find().then((discounts) => {
    const today = new Date();
    let activePromotions = [];
    for (let promotion of discounts) {
      if (promotion.expirationDate > today) {
        activePromotions.push(promotion);
      } else {
        //!delete discount
        Discount.findOneAndUpdate(
          {
            _id: promotion._id,
          },

          {
            discount: null,
          }
        );
      }
    }
    res.status(200).json(activePromotions);
  });
});

router.get("/by-product/:product", (req, res, next) => {
  const productId = req.params.product;
  Discount.findOne({ productId }).then((result) => {
    const promotion = result;
    const today = new Date();
    if (promotion != null) {
      if (promotion.expirationDate > today) {
        res.status(200).json(promotion);
      } else {
        //!delete discount
      }
    }
    res.status(200).json();
  });
});

router.get("/by-product/auth/:product", (req, res, next) => {//! use chceckAuth
  const productId = req.params.product;
  const forUser = "60142c44c463fe314b645bb"; //! Replace this with user's id!
  Discount.find({ $or: [{ productId }, { forUser }] }).then((promotion) => {
    const today = new Date();
      if (promotion.expirationDate > today) {
    res.status(200).json(promotion);
      } else {
        //!delete discount
        Discount.findOneAndUpdate(
          {
            _id: promotion._id,
          },

          {
            discount: null,
          }
        );
      }
  });
});

router.put("/:id", (req, res, next) => {
  const _id = req.params.id;
  const { cut, expirationDate, productId } = req.body;
  const discount = new Discount({ _id, cut, expirationDate, productId });

  Discount.updateOne({ _id: req.params.id }, discount).then(
    (result) => {
      res.status(200).json({ message: LOGS.DISCOUNTS.CREATED });
    },
    (err) => {
      res.status(401).json({ message: LOGS.DISCOUNTS.NOT_CREATED });
    }
  );
});

module.exports = router;
