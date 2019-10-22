const router = require("express").Router(),
  courseController = require("../controllers/courseController");

router.get(
  "/courses",
  courseController.index,
  courseController.filterUserCourses,
  courseController.respondJson
);
router.get(
  "/courses/:id/join",
  courseController.join,
  courseController.respondJson
);
router.use(courseController.errorJson);

module.exports = router;
