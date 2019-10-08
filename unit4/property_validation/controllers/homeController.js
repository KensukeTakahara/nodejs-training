var courses = [
  { title: "Event Driven Cakes", cost: 50 },
  { title: "Asynchronous Artichoke", cost: 25 },
  { title: "Object Oriented Juice", cost: 10 }
];

module.exports = {
  showCourses: (req, res) => {
    res.render("courses", {
      offeredCoursed: courses
    });
  }
};
