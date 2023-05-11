const router = require("express").Router();

const {
  getAllTasks,
  getUniqueTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/task.controller");

const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, getAllTasks);

router.get("/:id", isAuthenticated, getUniqueTask);

router.post("/", isAuthenticated, createTask);

router.put("/:id", isAuthenticated, updateTask);

router.delete("/:id", isAuthenticated, deleteTask);

module.exports = router;
