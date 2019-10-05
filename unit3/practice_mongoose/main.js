const mongoose = require("mongoose"),
  // Subscriber = require("./models/subscriber"),
  subscriberController = require("./controllers/subscribersController"),
  port = 3000,
  express = require("express"),
  app = express();

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// var subscriber1 = new Subscriber({
//   name: "Jon Wexler",
//   email: "jon@jonwexler.com"
// });

// subscriber1.save((error, savedDocument) => {
//   if (error) console.log(error);
//   console.log(savedDocument);
// });

// Subscriber.create(
//   {
//     name: "John Doe",
//     email: "john@example.com"
//   },
//   (error, savedDocument) => {
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );

// var myQuery = Subscriber.findOne({
//   name: "Jon Wexler"
// }).where("email", /wexler/);

// myQuery.exec((error, data) => {
//   if (data) console.log(data.name);
// });

app.get("/contact", subscriberController.getSubscriptionPage);

app.get(
  "/subscribers",
  subscriberController.getAllSubscriber,
  (req, res, next) => {
    console.log(req.data);
    res.send(req.data);
  }
);

app.post("/subscribe", subscriberController.saveSubscriber);

app.listen(port, () => {
  console.log(`Server running on port:${app.get("port")}`);
});
