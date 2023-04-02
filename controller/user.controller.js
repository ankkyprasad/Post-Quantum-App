const User = require("../model/user.model");
const auth = require("../utils/auth");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.deleteAllUser = async (req, res) => {
  try {
    await User.deleteMany();
    return res.status(204).send();
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user || user.password !== password) {
      return res.status(400).json({
        status: "bad request",
        message: "invalid username or password",
      });
    }

    const token = "h " + user._id.toString();
    const signature = await auth.generateSignature(token);

    user.signature = signature;
    await user.save();

    return res.status(201).json({
      status: "created",
      signature,
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const found = await User.findOne({ email: email });
    if (found) {
      return res.status(422).json({
        status: "unprocessable entity",
        message: "Email already registered",
      });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.status(201).json({
      status: "created",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};
