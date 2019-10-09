const mongoose = require("mongoose"),
  port = 3000,
  express = require("express"),
  app = express(),
  router = express.Router(),
  usersController = require("./controllers/usersController"),
  subscriberController = require("./controllers/subscribersController");

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
app.use("/", router);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.get(
  "/subscribers/:id",
  subscriberController.show,
  subscriberController.showView
);

app.listen(port, () => {
  console.log(`Server running on port:${app.get("port")}`);
});
