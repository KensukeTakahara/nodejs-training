const Subscriber = require("../models/subscriber");

exports.getAllSubscriber = (req, res, next) => {
  Subscriber.find({})
    .exec()
    .then(subscribers => {
      res.render("subscribers", { subscribers });
    })
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("Promise Complete.");
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber
    .save()
    .then(result => {
      res.render("tanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};