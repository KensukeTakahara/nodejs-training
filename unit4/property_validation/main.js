const mongoose = require("mongoose"),
  port = 3000,
  express = require("express"),
  app = express(),
  usersController = require("./controllers/usersController");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {
  useNewUrlParser: true
});

app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.get("/users", usersController.index, usersController.indexView);

app.listen(port, () => {
  console.log(`Server running on port:${app.get("port")}`);
});
