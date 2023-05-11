const router = require("express").Router();

const {
  getAllUser,
  deleteUser,
  deleteAllUser,
  login,
  register,
  logout,
} = require("../controller/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", getAllUser);

router.delete("/:id", deleteUser);

router.delete("/", deleteAllUser);

router.post("/login", login);

router.post("/register", register);

router.post("/logout", isAuthenticated, logout);

module.exports = router;
