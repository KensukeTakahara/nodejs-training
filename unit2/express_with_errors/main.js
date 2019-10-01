const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/name/:myName", homeController.respondWithName);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.use(layouts);

app.listen(port, () => {
  console.log(`run the server on port:${app.get("port")}`);
});
