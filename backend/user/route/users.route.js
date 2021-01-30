const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../../shared/middlewares/check-auth");

const User = require("../model/user.schema");

const router = express.Router();

router.get("", (req, res, next) => {
  User.find().then((documents) => {
    res.status(200).json({
      message: "Users fetched successfully",
      users: documents,
    });
  });
});

router.post("/signup", (req, res, next) => {
  let user;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    if ("admin" === req.body.username) {
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: true,
      });
    } else {
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        favorites: req.body.favorites,
        categories: req.body.categories,
        history: req.body.history,
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

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "asdsadvhbhbrejbjhb223bhblbhljbhblbcsdlhbaaakksxa;na;sdknx##1akkkaxxaxalg",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        email: fetchedUser.email,
        password: fetchedUser.password,
        favorites: fetchedUser.favorites,
        categories: fetchedUser.categories,
        history: fetchedUser.history,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});

router.put("/update", checkAuth, (req, res, next) => {
  const {
    _id,
    username,
    email,
    password,
    favorites,
    categories,
    history,
  } = req.body;
  const user = new User({
    _id,
    username,
    email,
    password,
    favorites,
    categories,
    history,
  });
  User.updateOne({ _id: req.body.id }, user).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
