const express = require("express");

const Configs = new require('../../config/model/configs.schema');

const LOGS = require("../../shared/logs")

const router = express.Router();

router.put("/about-us/:id",(req, res, next) => {
    const aboutUs = req.body.content;

    Configs.findByIdAndUpdate({_id: req.params.id},{aboutUs:aboutUs}).then(
      (result) => {
        res.status(200).json({ message: LOGS.PAGE.UPDATE });
      },
      (err) => {
        res.status(401).json({ message: LOGS.PAGE.FAILED });
      }
    );
    });

router.put("/terms-of-use/:id",(req, res, next) => {
    const termsOfUse = req.body.content

    Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
      (result) => {
        res.status(200).json({ message: LOGS.PAGE.UPDATE });
      },
      (err) => {
        res.status(401).json({ message: LOGS.PAGE.FAILED });
      }
    );
});

router.put("/shipping-info/:id",(req, res, next) => {
  const shippingInfo = req.body.content

  Configs.findByIdAndUpdate({_id: req.params.id},{shippingInfo}).then(
    (result) => {
      res.status(200).json({ message: LOGS.PAGE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PAGE.FAILED });
    }
  );
});

router.put("/payment-info/:id",(req, res, next) => {
  const termsOfUse = req.body.content

  Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
    (result) => {
      res.status(200).json({ message: LOGS.PAGE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PAGE.FAILED });
    }
  );
});

router.put("/returns-exchange/:id",(req, res, next) => {
  const termsOfUse = req.body.content

  Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
    (result) => {
      res.status(200).json({ message: LOGS.PAGE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PAGE.FAILED });
    }
  );
});


router.put("/faq/:id",(req, res, next) => {
  const termsOfUse = req.body.content

  Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
    (result) => {
      res.status(200).json({ message: LOGS.PAGE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PAGE.FAILED });
    }
  );
});


router.put("/customer/:id",(req, res, next) => {
  const termsOfUse = req.body.content

  Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
    (result) => {
      res.status(200).json({ message: LOGS.PAGE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PAGE.FAILED });
    }
  );
});


router.put("/buyer-protection/:id",(req, res, next) => {
  const termsOfUse = req.body.content

  Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
    (result) => {
      res.status(200).json({ message: LOGS.PAGE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PAGE.FAILED });
    }
  );
});


router.put("/help/:id",(req, res, next) => {
  const termsOfUse = req.body.content

  Configs.findByIdAndUpdate({_id: req.params.id},{termsOfUse}).then(
    (result) => {
      res.status(200).json({ message: LOGS.PAGE.UPDATE });
    },
    (err) => {
      res.status(401).json({ message: LOGS.PAGE.FAILED });
    }
  );
});

module.exports = router;
