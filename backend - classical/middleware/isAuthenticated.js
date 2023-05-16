const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const signature =
    req.headers.authorization.split(" ")[1] ||
    req.body.signature ||
    req.cookies.signature;

  try {
    const algorithm = process.env.ALGORITHM || "HS256";
    const decoded = jwt.verify(signature, process.env.PUBLIC_KEY, {
      algorithm,
    });

    const userId = decoded._id;
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
