const Subscriber = require("../models/subscriber");

module.exports = {
  show: (req, res, next) => {
    let id = req.params.id;
    Subscriber.findById(id)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID:${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("subscriber");
  }
};
