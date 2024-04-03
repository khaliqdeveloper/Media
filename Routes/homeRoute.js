const router = require("express").Router();

router.get("/", function (req, res) {
  res.send("home Page");
});

module.exports = router;
