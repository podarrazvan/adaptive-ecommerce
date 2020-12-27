const express = require("express");
const bcrypt = require("bcrypt");
// const multer = require("multer");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Admin = require("../models/admin");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  let user;
  bcrypt.hash(req.body.password, 10).then((hash) => {
  if("admin" === req.body.username) {
    user = new Admin({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
  } else {
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

  }
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});


module.exports = router;
