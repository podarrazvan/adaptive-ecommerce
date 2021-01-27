const express = require("express");

const Discount = new require("../models/discount");

const router = express.Router();

router.put("/:id", (req, res, next) => {
  console.log(req.body);

  const discount = new Discount({
    _id: req.params.id,
    price: req.body.price,
    expirationDate: req.body.expirationDate,
    productId: req.body.productId,
  });

  Discount.updateOne({ _id: req.params.id }, discount).then((result) => {
    console.log(result);
    if (result.nModified > 0) {
      res.status(200).json({ message: "Discount updated successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.post("", (req, res, next) => {
  console.log(req.body);

  const discount = new Discount({
    price: req.body.price,
    expirationDate: req.body.expirationDate,
    productId: req.body.productId,
  });

  discount.save().then((createdDiscount) => {
    res.status(201).json({
      message: "Discount created successfully",
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
          Product.findOneAndUpdate(
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

module.exports = router;
