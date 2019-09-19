const express = require("express");
const ejs = require("ejs");

const app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const data = {
  Taro: "taro@yamada",
  Hanako: "hanako@flower",
  Sachiko: "sachi@happy",
  Ichiro: "ichi@baseball"
};

app.get("/", (req, res) => {
  const msg = "This is Index Page!<br />※データを表示します。";
  res.render("index.ejs", {
    title: "Index",
    content: msg,
    data: data
  });
});

// app.post("/", (req, res) => {
//   const msg = `This is Posted Page!<br />あなたは「${req.body.message}」と送信しました。`;
//   res.render("index.ejs", {
//     title: "Posted",
//     content: msg
//   });
// });

app.listen(3000, () => {
  console.log("Start server port:3000");
});
