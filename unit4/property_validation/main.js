const mongoose = require("mongoose"),
  port = 3000,
  express = require("express"),
  app = express(),
  router = express.Router(),
  methodOverride = require("method-override"),
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

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

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
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

app.listen(port, () => {
  console.log(`Server running on port:${app.get("port")}`);
});
