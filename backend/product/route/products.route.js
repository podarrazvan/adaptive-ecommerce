const express = require("express");
const Product = require("../model/product.schema");

import {LOGS} from "../../shared/errors";

const router = express.Router();

router.post("", (req, res, next) => {
  const {
    title,
    caregory,
    brand,
    price,
    tags,
    description,
    thumbnail,
    images,
    quantity,
    views,
    initialQuantity,
    productNumber,
    minPrice,
    salesWeekTarget
  } = req.body;
  const product = new Product({
    title,
    caregory,
    brand,
    price,
    tags,
    description,
    thumbnail,
    images,
    quantity,
    views,
    initialQuantity,
    productNumber,
    autoMode: {
      minPrice,
      salesWeekTarget
    },
  });
  product.save().then((createdProduct) => {
    res.status(201).json({
      message: LOGS.PRODUCT.CREATED,
      post: {
        ...createdProduct,
        id: createdProduct._id,
      },
    });
  });
});

router.put("/:id", (req, res, next) => {
  const _id = req.params.id;
  const {
    title,
    caregory,
    brand,
    price,
    tags,
    description,
    thumbnail,
    images,
    quantity,
    views,
    initialQuantity,
    productNumber,
    minPrice,
    salesWeekTarget
  } = req.body;
  const product = new Product({
    _id,
    title,
    caregory,
    brand,
    price,
    tags,
    description,
    thumbnail,
    images,
    quantity,
    views,
    initialQuantity,
    productNumber,
    autoMode: {
      minPrice,
      salesWeekTarget
    },
    initialQuantity: req.body.initialQuantity,
    productNumber: req.body.productNumber,
  });

  Product.updateOne({ _id: req.params.id }, product).then(
    (result) => {
      res.status(200).json({ message: LOGS.PRODUCT.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PRODUCT.FAILED });
    }
  );
});

router.get("/category/:category", (req, res, next) => {
  Product.find({ category: req.params.category }).then((documents) => {
    res.status(200).json({
      products: documents,
    });
  });
});

router.get("/id/:id", (req, res, next) => {
  Product.find({ _id: req.params.id }).then((prod) => {
    res.status(200).json({
      product: prod,
    });
  });
});
router.get("/paginated", paginatedResults(Product), (req, res, next) => {
  res.json(res.paginatedResults);
});

router.get("", (req, res, next) => {
  Product.find().then((prod) => {
    res.status(200).json({
      products: prod,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(
    (result) => {
      res.status(200).json({ message: LOGS.PRODUCT.DELETED });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PRODUCT.DELETE_FAILED });
    }
  );
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  };
}

module.exports = router;
