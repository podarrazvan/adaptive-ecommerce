const express = require("express");
const Product = require("../model/product.schema");
const Discount = require("../../discount/model/discount.schema");
const checkAdmin = require("../../shared/middlewares/check-admin");

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
    productModels
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
    sold: 0,
    rating: {
      oneStar: 0,
      twoStars: 0,
      threeStars: 0,
      forStars: 0,
      fiveStars: 0,
      average: 0,
    },
    productModels,
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
    sold,
    productModels,
    oneStar,
    twoStars,
    threeStars,
    forStars,
    fiveStars,
    average,
    minPrice,
    salesWeekTarget,
  } = req.body;
  const product = new Product({
    //! new?!
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
    sold,
    productModels,
    rating: {
      oneStar,
      twoStars,
      threeStars,
      forStars,
      fiveStars,
      average,
    },
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

//TODO use something built in mongo
router.put("/sold/:status", checkAdmin, (req, res, next) => {
  const products = req.body;
  const status = req.params.status;
  for (let product of products) {
    const _id = product.product;
    Product.findOne({ _id }).then((oldProduct) => {
      if (status === "processed") {
        const quantity = +oldProduct.quantity - +product.quantity;
        const sold = +oldProduct.sold + +product.quantity;
        Product.findByIdAndUpdate({ _id }, { quantity, sold }).then();
      } else if (status === "canceled") {
        const quantity = +oldProduct.quantity + +product.quantity;
        const sold = +oldProduct.sold - +product.quantity;
        Product.findByIdAndUpdate({ _id }, { quantity, sold }).then();
      }
    });
  }

  //! not ok!
  res.status(200).json();
  //!
  //TODO send a response!
});
//

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

router.get("/paginated/category", (req, res, next) => {
  const category = req.query.name;
  //TODO paginatedResults(category);
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < Product.countDocuments().exec()) {
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
    Product.find({ category })
      .limit(limit)
      .skip(startIndex)
      .then((documents) => {
        res.status(200).json(documents);
      });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
});

router.get("/paginated", paginatedResults(Product), (req, res, next) => {
  res.json(res.paginatedResults);
});
//TODO duplicate code, reuse paginatedResults()!
router.get("/paginated/brand", (req, res, next) => {
  const brand = req.query.name;
  //TODO paginatedResults(brand);
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < Product.countDocuments().exec()) {
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
    Product.find({ brand })
      .limit(limit)
      .skip(startIndex)
      .then((documents) => {
        res.status(200).json(documents);
      });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
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
      products: prod.splice(0, 2),
      mainAd: prod[0],
      mainProduct: prod[1],
    });
  });
});

router.get("/you-may-like", (req, res, next) => {
  const size = parseInt(req.query.size);
  Product.aggregate([{ $sample: { size } }]).then((prod) => {
    res.status(200).json(prod);
  });
});

router.get("/featured-products", (req, res, next) => {
  const size = parseInt(req.query.size);
  Product.aggregate([{ $sample: { size } }]).then((prod) => {
    res.status(200).json(prod);
  });
});

router.get("/special-for-you", (req, res, next) => {
  //TODO add checkAuth
  const limit = 6;
  const forUser = "60142c44c463fe314b645bbc"; //! Replace this with user's id!
  Discount.find({ forUser }).then((discounts) => {
    let activePromotions = [];
    const expirationDate = new Date();
    for (let promotion of discounts) {
      if (promotion.expirationDate > expirationDate) {
        activePromotions.push(promotion);
      } else {
        Discount.findByIdAndDelete({ _id: promotion._id }).then(() => {});
      }
    }
    if (activePromotions.length >= limit) {
      res.status(200).json(activePromotions);
    } else {
      Product.find({ $and: [{ "autoMode.minPrice": { $ne: null } }] })
        .sort({ sold: 1 })
        .limit(limit)
        .then((products) => {
          expirationDate.setDate(new Date().getDate() + 1);
          let promotions = [];
          for (let product of products) {
            const maxDiscount = product.autoMode.minPrice;
            const productPrice = product.price;
            const minDiscount = productPrice - productPrice * 0.1; // DISCOUNT WILL BE AT LAST 10%
            const cut = Math.round(
              productPrice -
                (Math.random() * (minDiscount - maxDiscount) + maxDiscount)
            );
            const discount = new Discount({
              cut,
              expirationDate,
              productId: product._id,
              forUser,
            });
            discount.save().then((createdDiscount) => {
              const id = createdDiscount._id;
              promotions.push(id);
              if (promotions.length === limit) {
                res.status(200).json(promotions);
              }
            });
          }
        });
    }
  });
});
// //!

router.get("/best-sellers", (req, res, next) => {
  const extraProducts = 3;
  const limit = 7 + extraProducts;
  Product.find()
    .sort({ sold: -1 })
    .limit(limit)
    .then((products) => {
      res.status(200).json({
        main: products[0],
        middle: products.slice(1, 4),
        bottom: products.slice(4, 7),
        extra: products.slice(7, limit),
      });
    });
});

//! Should be selected according to the rating
//! after rating is implemented. See Trello [products] Top Rated Products
router.get("/top-rated", (req, res, next) => {
  const size = 3;
  Product.aggregate([{ $sample: { size } }]).then((prod) => {
    res.status(200).json(prod);
  });
});
//!

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
