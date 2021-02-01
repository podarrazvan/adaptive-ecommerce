const express = require("express");

const Message = new require("../model/contact.schema");

const LOGS = require("../../shared/logs");

const router = express.Router();

router.post("", (req, res, next) => {
  const { name, email, subject, message, date, seen } = req.body;
  const data = new Message({ name, email, subject, message, date, seen });
  data.save().then(() => {
    res.status(201).json({
      message: LOGS.MESSAGES.SENT,
    });
  });
});

router.get("", (req, res, next) => {
  Message.find().then((messages) => {
    res.status(200).json({
      messages: messages,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const _id = req.params.id;
  const { name, email, subject, message, date, seen } = req.body;
  const data = new Message({ _id, name, email, subject, message, date, seen });

  Message.updateOne({ _id }, data).then(
    (result) => {
      res.status(200).json({ message: LOGS.MESSAGES.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.MESSAGES.NOT_UPDATED });
    }
  );
});

router.delete("/:id", (req, res, next) => {
  Message.deleteOne({ _id: req.params.id }).then(
    (result) => {
      res.status(200).json({ message: LOGS.MESSAGES.DELETED });
    },
    (err) => {
      res.status(401).json({ message: LOGS.MESSAGES.NOT_DELETED });
    }
  );
});

module.exports = router;
