const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  port = 3000,
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

app.get("/subscribers", subscriberController.getAllSubscribers);
app.get("/contact", subscriberController.getSubscriptionPage);
app.post("/subscribe", subscriberController.saveSubscriber);

app.listen(port, () => {
  console.log(`Server running on port:${app.get("port")}`);
});
