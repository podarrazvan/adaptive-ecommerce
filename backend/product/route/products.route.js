const express = require("express");
const Product = require("../model/product.schema");

const LOGS = require("../../shared/logs");

const router = express.Router();

router.post("", (req, res, next) => {
  const {
    title,
    category,
    brand,
    price,
    tags,
    description,
    thumbnail,
    images,
    mainImg,
    quantity,
    views,
    initialQuantity,
    productNumber,
    minPrice,
    salesWeekTarget,
  } = req.body;
  const product = new Product({
    title,
    category,
    brand,
    price,
    tags,
    description,
    thumbnail,
    images,
    mainImg,
    quantity,
    views,
    initialQuantity,
    productNumber,
    autoMode: {
      minPrice,
      salesWeekTarget,
    },
  });
  product.save().then((createdProduct) => {
    res.status(201).json({
      message: LOGS.PRODUCT.CREATED,
      product: {
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
    category,
    brand,
    price,
    tags,
    description,
    thumbnail,
    images,
    mainImg,
    quantity,
    views,
    initialQuantity,
    productNumber,
    minPrice,
    salesWeekTarget,
  } = req.body;
  const product = new Product({
    _id,
    title,
    category,
    brand,
    price,
    tags,
    description,
    thumbnail,
    images,
    mainImg,
    quantity,
    views,
    initialQuantity,
    productNumber,
    autoMode: {
      minPrice,
      salesWeekTarget,
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
    res.status(200).json(documents);
  });
});

router.get("/id/:id", (req, res, next) => {
  Product.findOne({ _id: req.params.id }).then((prod) => {
    res.status(200).json(prod);
  });
});

router.get("/paginated", paginatedResults(Product), (req, res, next) => {
  res.json(res.paginatedResults);
});

router.get("/last", (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const category = req.query.category;
  Product.find({ category })
    .sort({ _id: -1 })
    .limit(limit)
    .then((prod) => {
      res.status(200).json(prod);
    });
});

//! Should be displayed according to the user's preferences
router.get("/main-products", (req, res, next) => {
  const size = parseInt(req.query.size);
  Product.aggregate([{ $sample: { size } }]).then((prod) => {
    res.status(200).json({
      products: prod.splice(0,2),
      mainAd: prod[0],
      mainProduct: prod[1] 
    });
  });
});

router.get("/you-may-like", (req, res, next) => {
  const size = parseInt(req.query.size);
  Product.aggregate([{ $sample: { size } }]).then((prod) => {
    res.status(200).json(prod);
  });
});
//!

router.get("/best-sellers", (req, res, next) => {
  const limit = 7
  Product.find()
    .sort({ sold: -1 })
    .limit(limit)
    .then((products) => {
      res.status(200).json({
        main: products[0],
        middle: products.slice(1,4),
        bottom: products.slice(4,7)
      });
    });
});

router.get("", (req, res, next) => {
  Product.find().then((products) => {
    res.status(200).json(products);
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
