const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  courseRoutes = require("./courseRoutes"),
  // homeRoutes = require("./homeRoutes"),
  errorRoutes = require("./errorRoutes");

router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
// router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
