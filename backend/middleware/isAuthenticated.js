const auth = require("../utils/auth");
const User = require("../model/user.model");

module.exports = async (req, res, next) => {
  const signature =
    req.headers.authorization.split(" ")[1] ||
    req.body.signature ||
    req.cookies.signature;

  try {
    const token = await auth.verifySignature(signature);
    if (token.message) {
      return res.status(401).json({
        status: "unauthorized",
      });
    }

    const userId = token.split(" ")[1];
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({
        status: "unauthorized",
      });
    }

    if (user.signature !== signature) {
      return res.status(401).json({
        status: "unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};
