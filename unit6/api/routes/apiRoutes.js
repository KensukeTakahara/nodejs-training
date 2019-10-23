const router = require("express").Router(),
  courseController = require("../controllers/courseController"),
  userController = require("../controllers/userController");

router.post("/login", userController.apiAuthenticate);
router.use(userController.verifyJWT);
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
