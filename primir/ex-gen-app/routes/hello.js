var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  const name = req.query.name;
  const mail = req.query.mail;
  var data = {
    title: "Hello",
    content: `あなたの名前は${name}です。<br />メールアドレスは${mail}です。`
  };
  res.render("hello", data);
});

module.exports = router;
