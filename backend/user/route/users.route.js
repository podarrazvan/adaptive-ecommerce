const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LOGS = require("../../shared/logs")

const checkAuth = require("../../shared/middlewares/check-auth");

const User = require("../model/user.schema");

const router = express.Router();

router.get("", (req, res, next) => {
  User.find().then((documents) => {
    res.status(200).json({
      users: documents,
    });
  });
});

router.post("/signup", (req, res, next) => {
  let user;
  const {username, email,password, favorites, categories, history} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    if ("admin" === username) {
      user = new User({
        username,
        email,
        password: hash,
        isAdmin: true,
      });
    } else {
      user = new User({
        username,
        email,
        password: hash,
        favorites,
        categories,
        history,
      });
    }
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: LOGS.USER.CREATED,
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
  const {email, password} = req.body;
  let getUser;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: LOGS.USER.AUTH_FAILED,
        });
      }
      getUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: LOGS.USER.AUTH_FAILED,
        });
      }
      const token = jwt.sign(
        { email: getUser.email, userId: getUser._id },
        "asdsadvhbhbrejbjhb223bhblbhljbhblbcsdlhbaaakksxa;na;sdknx##1akkkaxxaxalg",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: getUser._id,
        email: getUser.email,
        password: getUser.password,
        favorites: getUser.favorites,
        categories: getUser.categories,
        history: getUser.history,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: LOGS.USER.AUTH_FAILED,
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
  User.updateOne({ _id: req.body.id }, user).then(
      (result) => {
        res.status(200).json({ message: LOGS.USER.UPDATED });
      },
      (err) => {
        res.status(401).json({ message: LOGS.USER.DELETED });
      }
    );
});

module.exports = router;
