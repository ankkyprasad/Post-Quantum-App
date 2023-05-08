const Task = require("../model/task.model");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.send({ data: tasks });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.getUniqueTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });

    if (!task)
      return res.status(404).json({
        status: "not found",
        message: "Task does not exist",
      });

    res.send({ data: task });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.createTask = async (req, res) => {
  const name = req.body.name;

  try {
    const newTask = new Task({ name: name, userId: req.user._id });
    console.log(newTask);
    await newTask.save();

    return res.status(201).json({
      status: "created",
      data: newTask,
    });
  } catch (err) {
    return res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { name, completed } = req.body;

  try {
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });
    if (!task)
      return res.status(404).json({
        status: "not found",
        message: "Task does not exist",
      });

    if (name) task.name = name;
    if (completed) task.completed = completed;

    await task.save();

    res.send({ data: task });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });
    if (!task)
      return res.status(404).json({
        status: "not found",
        message: "Task does not exist",
      });

    await Task.deleteOne({ _id: taskId, userId: req.user._id });
    res.status(200).send("Deleted successfully");
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};
