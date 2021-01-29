const express = require("express");
const Product = require("../model/product");

const router = express.Router();

router.post("", (req, res, next) => {

  const product = new Product({
    title: req.body.title,
    category: req.body.category,
    brand: req.body.brand,
    price: req.body.price,
    tags: req.body.tags,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
    quantity: req.body.quantity,
    views: req.body.views,
    autoMode: {
      minPrice: req.body.minPrice,
      salesWeekTarget: req.body.salesWeekTarget,
    },
    initialQuantity: req.body.initialQuantity,
    productNumber: req.body.productNumber,
  });
  product.save().then((createdProduct) => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdProduct,
        id: createdProduct._id,
      },
    });
  });
});

router.put("/:id", (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    title: req.body.title,
    category: req.body.category,
    brand: req.body.brand,
    price: req.body.price,
    tags: req.body.tags,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
    quantity: req.body.quantity,
    views: req.body.views,
    autoMode: {
      minPrice: req.body.minPrice,
      salesWeekTarget: req.body.salesWeekTarget,
    },
    initialQuantity: req.body.initialQuantity,
    productNumber: req.body.productNumber,
  });

  Product.updateOne({ _id: req.params.id }, product).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.get("/category/:category", (req, res, next) => {
  Product.find({ category: req.params.category }).then((documents) => {
    res.status(200).json({
      message: "Products fetched successfully",
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
      message: "Products fetched successfully",
      products: prod,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
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
