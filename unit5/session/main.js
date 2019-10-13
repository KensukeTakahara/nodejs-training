const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  router = express.Router(),
  port = 3000,
  methodOverride = require("method-override"),
  layouts = require("express-ejs-layouts"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  courseController = require("./controllers/courseController"),
  subscriberController = require("./controllers/subscribersController"),
  userController = require("./controllers/userController"),
  errorController = require("./controllers/errorController");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {
  useNewUrlParser: true
});

app.set("port", port);
app.set("view engine", "ejs");
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use("/", router);

router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcord",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

router.get("/courses", courseController.index, courseController.indexView);
router.get("/courses/new", courseController.new);
router.post(
  "/courses/create",
  courseController.create,
  courseController.redirectView
);
router.get("/courses/:id", courseController.show, courseController.showView);
router.get("/courses/:id/edit", courseController.edit);
router.put(
  "/courses/:id/update",
  courseController.update,
  courseController.redirectView
);
router.delete(
  "/courses/:id/delete",
  courseController.delete,
  courseController.redirectView
);

router.get(
  "/subscribers",
  subscriberController.index,
  subscriberController.indexView
);
router.get("/subscribers/new", subscriberController.new);
router.post(
  "/subscribers/create",
  subscriberController.create,
  subscriberController.redirectView
);
router.get(
  "/subscribers/:id",
  subscriberController.show,
  subscriberController.showView
);
router.get("/subscribers/:id/edit", subscriberController.edit);
router.put(
  "/subscribers/:id/update",
  subscriberController.update,
  subscriberController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscriberController.delete,
  subscriberController.redirectView
);

router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.post(
  "/users/create",
  userController.create,
  userController.redirectView
);
router.get("/users/:id", userController.show, userController.showView);
router.get("/users/:id/edit", userController.edit);
router.put(
  "/users/:id/update",
  userController.update,
  userController.redirectView
);
router.delete(
  "/users/:id/delete",
  userController.delete,
  userController.redirectView
);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running on port:${app.get("port")}`);
});
