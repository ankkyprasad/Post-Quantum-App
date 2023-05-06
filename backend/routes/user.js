const router = require("express").Router();

const {
  getAllUser,
  deleteUser,
  deleteAllUser,
  login,
  register,
} = require("../controller/user.controller");

router.get("/", getAllUser);

router.delete("/:id", deleteUser);

router.delete("/", deleteAllUser);

router.post("/login", login);

router.post("/register", register);

module.exports = router;
