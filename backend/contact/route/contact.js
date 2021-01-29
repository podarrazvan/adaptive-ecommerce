const express = require("express");

const Message = new require("../model/contact");

const router = express.Router();


router.post("", (req, res, next) => {
  console.log(req.body);

  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    date: req.body.date,
    seen: req.body.seen
  });

  message.save().then(() => {
    res.status(201).json({
      message: "Message sent successfully",
    });
  });
});

router.put("/:id", (req, res, next) => {
  console.log(req.body);

  const message = new Message({
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    date: req.body.date,
    seen: req.body.seen
  });

  Message.updateOne({_id: req.params.id}, message).then(result => {
    if(result.nModified > 0) {
        res.status(200).json({message: "Message updated successful!"});
    } else {
        res.status(401).json({message: "Not authorized!"});
    }
});
});

router.get("", (req, res, next) => {
  Message.find().then((messages) => {
    res.status(200).json({
      messages: messages
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Message.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      if(result.n > 0) {
          res.status(200).json({message: "Deletion successful!"});
      } else {
          res.status(401).json({message: "Not authorized!"});
      }
  })
});

module.exports = router;
