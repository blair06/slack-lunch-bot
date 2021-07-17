var express = require("express");
var router = express.Router();
const crawling = require("../lib/crawling");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const restaurants = crawling.getRestaurants("노원구 맛집");
  restaurants.then((response) => {
    res.send(response.title);
  });
});

module.exports = router;
