const express = require("express");
const Product = new require('../models/product')

const router = express.Router();


router.post("",(req, res, next) => {
  
    const product = new Product ({
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        tags:req.body.tags,
        description:req.body.description,
        thumbnail:req.body.thumbnail,
        images:req.body.img,
        quantity:req.body.quantity,
        views: req.body.views,
        minPrice:req.body.minPrice,
        salesWeekTarget:req.body.salesWeekTarget,
    });
    console.log(req.body);
    product.save().then(createdProduct => {
        res.status(201).json({
            message: "Post added successfully",
            post: {
                ...createdProduct,
                id: creadedProduct._id
            }
        });
    });
    
});

router.put("/:id",(req, res, next) => {
    const product = new Product ({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });

    Product.updateOne({_id: req.params.id, creator: req.userData.userId},post).then(result => {
        console.log(result);
        if(result.nModified > 0) {
            res.status(200).json({message: "Update successful!"});
        } else {
            res.status(401).json({message: "Not authorized!"});
        }
    });
});

router.get("category/:category", (req, res, next) => {
    Product.find({"category": req.params.category}).then(documents => {
        res.status(200).json({
            message: "Products fetched successfully",
            posts: documents
        });
    })
});

router.get("/id/:id", (req, res, next) => {
    Product.find({_id:req.params.id}).then(prod => {
        res.status(200).json({
            product: prod
        });
    })
});

router.delete("/:id", (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        if(result.n > 0) {
            res.status(200).json({message: "Deletion successful!"});
        } else {
            res.status(401).json({message: "Not authorized!"});
        }
    })
});

module.exports = router;
