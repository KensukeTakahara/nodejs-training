const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

app.set("port", process.env.PORT || 3000);

app.use(
  express.urlencoded({
    extended: false
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Confetti Cuisine!");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpFrom);

app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("port")}`);
});
