var express = require("express");
var router = express.Router();
const crawling = require("../lib/crawling");

router.get("/", function (req, res, next) {
  const restaurants = crawling.getRestaurants("영등포구 맛집");
  restaurants.then((response) => {
    res.send(response.title);
  });
});

module.exports = router;
