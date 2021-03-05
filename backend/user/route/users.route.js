const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LOGS = require("../../shared/logs")

const checkAuth = require("../../shared/middlewares/check-auth");
const checkAdmin = require("../../shared/middlewares/check-admin");

const User = require("../model/user.schema");

const router = express.Router();

router.get("", (req, res, next) => {
  User.find().then((documents) => {
    res.status(200).json(documents);
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
      res.status(401).json({ message: LOGS.USER.DELETED }); //! DELETED?!
    }
  );
});

router.put("/history", (req, res, next) => {
  const recivedHistoryLength = Object.values(req.body.history);
  const history = req.body.history;
  User.findOne({ email: req.body.email }).then((user) => {
    const oldHistoryLength = Object.values(user.history);
    if (recivedHistoryLength.length === oldHistoryLength.length + 1) {
     User.findByIdAndUpdate({
     _id: req.body._id,
     },
     {
      $set:{history} 
     }
     )
    }
  });
});

router.get("/admins", (req, res, next) => {
  User.find({isAdmin: true}).then((documents) => {
    res.status(200).json(documents);
  });
});

router.post("/admins/signup",checkAdmin, (req, res, next) => {
  let user;
  const {username, email,password} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
      user = new User({
        username,
        email,
        password: hash,
        isAdmin: true,
      });
    
    user
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.delete("/admins/delete/:username",checkAdmin, (req, res, next) => {
  const username = req.params.username;
  User.deleteOne({username}).then(
    (result) => {
      res.status(200).json({ message: LOGS.USER.DELETED });
    },
    (err) => {
      res.status(401).json({ message: LOGS.USER.NOT_DELETED });
    }
  );
});

module.exports = router;
