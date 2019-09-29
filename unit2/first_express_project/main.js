const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

app.use(homeController.logRequestPaths);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", homeController.getParams);

app.post("/", homeController.postParams);

app.get("/items/:vegetable", homeController.sendReqParam);

app.get("/sign_up", homeController.userSignUpProcessor);

app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number:${port}`
  );
});
