const Subscriber = require("./models/subscriber"),
  Course = require("./models/course"),
  mongoose = require("mongoose");

mongoose.Promise = global.Promise;

exports.createSubscriber = () => {
  Subscriber.create({
    name: "jon",
    email: "jon@example.com",
    zipCode: 10001
  }).then(data => console.log(data));
};

const createCourse = () => {
  let testSubscriber, testCourse;
  Course.create({
    title: "Tomato Land",
    description: "Locally farmed tomatoes only",
    zipCode: 12345,
    items: ["cherry", "heirloom"]
  }).then(course => {
    testCourse = course;
  });
  Subscriber.findOne({}).then(subscriber => {
    testSubscriber = subscriber;
  });
  setTimeout(() => {
    console.log(testSubscriber);
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
    Subscriber.populate(testSubscriber, "courses").then(subscriber =>
      console.log(subscriber)
    );
  }, 1000);
};

// createSubscriber();
// createCourse();
