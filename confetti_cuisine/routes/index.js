const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  courseRouters = require("./courseRoutes"),
  apiRoutes = require("./apiRoutes"),
  errorRoutes = require("./errorRoutes");

router.use("/users", userRoutes);
router.use("/subscriber", subscriberRoutes);
router.use("/courses", courseRouters);
router.use("/api", apiRoutes);
router.use("/", errorRoutes);

module.exports = router;
