const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  port = 3000,
  methodOverride = require("method-override"),
  layouts = require("express-ejs-layouts"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash"),
  User = require("./models/user"),
  router = require("./routes");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {
  useNewUrlParser: true
});

app.use(express.static("public"));
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

app.use(cookieParser("secretCuisine123"));
app.use(
  expressSession({
    secret: "secretCuisine123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

const server = app.listen(app.get("port"), () => {
    console.log(`Server running on port:${app.get("port")}`);
  }),
  io = require("socket.io")(server);

require("./controllers/chatController")(io);
