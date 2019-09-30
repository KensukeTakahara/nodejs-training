const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");

app.use(layouts);

app.get("/name/:myName", homeController.respondWithName);

app.listen(port, () => {
  console.log(`run the server on port:${app.get("port")}`);
});
