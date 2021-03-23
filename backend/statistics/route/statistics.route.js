const express = require("express");
const collection = new require("../model/statistics.schema");
const LOGS = require("../../shared/logs");
const checkAdmin = require("../../shared/middlewares/check-admin");

const router = express.Router();

router.post("", checkAdmin, (req, res, next) => {
  const statistics = new collection({
    search: [],
  });
  statistics.save().then((data) => {
    res.status(201).json({
      message: LOGS.CONFIGS.SET,
      post: {
        id: data._id,
      },
    });
  });
});

router.put("/search", (req, res, next) => {
  const searchedElement = req.body.searchedElement;
  let newSearch = {
    searchedElement,
    total: 1,
    currentDay: 1,
  };
  collection.find().then((documents) => {
    const _id = documents[0]._id;
    let search = documents[0].search;
    let found = false;
    for (let i = 0; i < search.length; i++) {
      if (search[i].searchedElement === newSearch.searchedElement) {
        newSearch.total = search[i].total + 1;
        newSearch.currentDay = search[i].currentDay + 1;
        found = true;
        search[i] = newSearch;
        break;
      }
    }
    if (!found) {
      search.push(newSearch);
    }
    collection.findByIdAndUpdate({ _id }, { search }).then(
      (result) => {
        res.status(200).json({ message: LOGS.CONFIGS.NAME.UPDATE });
      },
      (err) => {
        res.status(401).json({ message: LOGS.CONFIGS.NAME.FAILED });
      }
    );
  });
});

router.get("/most-searched", (req, res, next) => {
  const limit = 4;
  collection.find().then((searched) => {
    let sorted = [];
    let search = searched[0].search;
    while (sorted.length < limit) {
      let moreSearched = search[0];
      for (let element of search) {
        if (element.total > moreSearched.total) {
          moreSearched = element;
        }
      }
      const index = search.indexOf(moreSearched);
      sorted.push(moreSearched);
      search.splice(index,1);
    }
   res.status(200).json(sorted);
  });
});

router.get("", (req, res, next) => {
  collection.find().then((documents) => {
    res.status(200).json(documents[0]);
  });
});

module.exports = router;
