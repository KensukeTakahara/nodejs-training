const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  courseRoutes = require("./courseRoutes"),
  apiRoutes = require("./apiRoutes"),
  // homeRoutes = require("./homeRoutes"),
  errorRoutes = require("./errorRoutes");

router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/api", apiRoutes);
// router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
