const express = require("express");
const checkAdmin = require("../../shared/middlewares/check-admin");
const Order = require("../model/order.schema");
const LOGS = require("../../shared/logs");
const router = express.Router();

router.post("", (req, res, next) => {
  const { name, email, adress, city, state, zipCode } = req.body.billingDetails;
  const { shipping, payment, total, status, date } = req.body.orderDetails;
  const { orderNotes, products } = req.body;
  const d = new Date().getTime();
  const orderNumber = Math.round((d / 1000)-1615160000);
  order = new Order({
    name,
    email,
    adress,
    city,
    state,
    zipCode,
    shipping,
    payment,
    total,
    status,
    date,
    orderNotes,
    products,
    orderNumber
  });
  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: LOGS.ORDER.CREATED,
        order: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/update/:id/:status", (req, res, next) => {
  const _id = req.params.id;
  const status = req.params.status;
  const newStatus = new Order({ _id, status });
  Order.findByIdAndUpdate({ _id: _id }, newStatus).then(
    (result) => {
      res.status(200).json({ message: LOGS.ORDER.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.ORDER.FAILED });
    }
  );
});

router.get("", (req, res, next) => {
  Order.find().then((orders) => {
    res.status(200).json(orders);
  });
});

router.get("/:id", (req, res, next) => {
  const _id = req.params.id;
  Order.findOne({_id}).then((order) => {
    res.status(200).json(order);
  });
});

router.delete("/delete/:id", (req, res, next) => {
  const _id = req.params.id;
  Order.findOneAndDelete({ _id: _id }).then((result) => {
    res.status(200).json({ message: LOGS.ORDER.DELETED });
  },
  (err) => {
    res.status(401).json({ message: LOGS.ORDER.FAILED_DELETE });
  });
});

module.exports = router;
