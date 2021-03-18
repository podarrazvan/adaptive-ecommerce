const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LOGS = require("../../shared/logs");

const checkAuth = require("../../shared/middlewares/check-auth");
const checkAdmin = require("../../shared/middlewares/check-admin");

const User = new require("../model/user.schema");

const router = express.Router();

router.get("", paginatedResults(User),(req, res, next) => { //! add checkAdmin!
  res.json(res.paginatedResults);
});

router.post("/signup", (req, res, next) => {
  let user;
  const {
    username,
    email,
    password,
    favorites,
    categories,
    history,
  } = req.body;
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
  const { email, password } = req.body;
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
        id: getUser._id,
        email: getUser.email,
        password: getUser.password,
        favorites: getUser.favorites,
        categories: getUser.categories,
        history: getUser.history,
        isAdmin: getUser.isAdmin,
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

router.put("/history", (req, res, next) => { // TODO add checkAuth
  const history = req.body.history;
  const email = req.body.email;
  User.findOne({email}).then((user) => {
    const _id = user._id;
    const userHistory = new User({_id, history });
    User.findOneAndUpdate({ _id}, userHistory).then(
      (result) => {
        res.status(200).json({ message: LOGS.USER.UPDATED });
      },
      (err) => {
        res.status(401).json({ message: LOGS.USER.DELETED }); //! DELETED?!
      }
    );
  })
});

router.put("/favorites", (req, res, next) => { // TODO add checkAuth
  const favorites = req.body.favorites;
  const email = req.body.email;
  User.findOne({email}).then((user) => {
    const _id = user._id;
    const userFavorites = new User({_id, favorites });
    User.findOneAndUpdate({ _id}, userFavorites).then(
      (result) => {
        res.status(200).json({ message: LOGS.USER.UPDATED });
      },
      (err) => {
        res.status(401).json({ message: LOGS.USER.DELETED }); //! DELETED?!
      }
    );
  })
});

router.get("/check-code/:email/:recoveryPasswordCode", (req, res, next) => {
  const { email, recoveryPasswordCode } = req.params;
  User.findOne({ email, recoveryPasswordCode }).then((user) => {
    res.status(200).json(user);
  });
});

router.put("/update-password", (req, res, next) => {
  const { email, password, recoveryPasswordCode } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.findOneAndUpdate(
      { email, recoveryPasswordCode },
      { password: hash, $unset: { recoveryPasswordCode: "" } }
    ).then(
      (result) => {
        res.status(200).json({ message: LOGS.USER.UPDATE });
      },
      (err) => {
        res.status(401).json({ message: LOGS.USER.FAILED });
      }
    );
  });
});

router.get("/admins", (req, res, next) => {
  User.find({ isAdmin: true }).then((documents) => {
    res.status(200).json(documents);
  });
});

router.post("/admins/signup", checkAdmin, (req, res, next) => {
  let user;
  const { username, email, password } = req.body;
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

router.delete("/admins/delete/:username", checkAdmin, (req, res, next) => {
  const username = req.params.username;
  User.deleteOne({ username }).then(
    (result) => {
      res.status(200).json({ message: LOGS.USER.DELETED });
    },
    (err) => {
      res.status(401).json({ message: LOGS.USER.NOT_DELETED });
    }
  );
});

router.delete("/delete/:username", (req, res, next) => {//! add checkAdmin
  const username = req.params.username;
  User.deleteOne({ username }).then(
    (result) => {
      res.status(200).json({ message: LOGS.USER.DELETED });
    },
    (err) => {
      res.status(401).json({ message: LOGS.USER.NOT_DELETED });
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
