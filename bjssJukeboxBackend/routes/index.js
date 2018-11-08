var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const home = "home";
  res.send(home).status(200);
});

module.exports = router;
