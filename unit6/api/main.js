const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  router = express.Router(),
  port = 3000,
  methodOverride = require("method-override"),
  layouts = require("express-ejs-layouts"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  User = require("./models/user"),
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

router.use(cookieParser("secretCuisine123"));
router.use(
  expressSession({
    secret: "secretCuisine123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(connectFlash());
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
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
  userController.validate,
  userController.create,
  userController.redirectView
);
router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate);
router.get("/users/logout", userController.logout, userController.redirectView);
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
