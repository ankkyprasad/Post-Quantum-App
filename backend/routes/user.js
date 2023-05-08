const router = require("express").Router();

const {
  getAllUser,
  deleteUser,
  deleteAllUser,
  login,
  register,
  logout,
} = require("../controller/user.controller");

router.get("/", getAllUser);

router.delete("/:id", deleteUser);

router.delete("/", deleteAllUser);

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

module.exports = router;
