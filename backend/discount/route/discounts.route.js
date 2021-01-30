const express = require("express");

const Discount = new require("../model/discount.schema");

// import { LOGS } from "../../shared/errors";

const router = express.Router();

router.post("", (req, res, next) => {

  const {price, expirationDate, productId} = req.body;
  const discount = new Discount({price, expirationDate, productId});

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
    res.status(200).json(
     activePromotions,
    );
  });
});

router.put("/:id", (req, res, next) => {

  const _id = req.params.id;
  const {price, expirationDate, productId} = req.body;
  const discount = new Discount({_id, price, expirationDate, productId});

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
