const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/dashboard", isAuthenticated, async (req, res) => {
  res.json({
    status: "success",
    message: `Hi ${req.user.name}`,
  });
});

module.exports = router;
