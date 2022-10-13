const User = require("../models/User");
const jwt = require("jsonwebtoken");

// middleware "protect" which will block private routes from unauthorized users
exports.protect = async (req, res, next) => {
  let token;

  // check if have authorization in our header and also is it a Bearer token or not
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // authorization example: Bearer adaASsdk3798172839789123 so token is at index 1
    token = req.headers.authorization.split(" ")[1];

  }

  if (!token) {
    return next(new Error("Not authorized sorry no token", 401));
  }

  // if get successful token, so now lets check if we have user with that token and still token is valid or not
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // getting user from decoded token
    const user = await User.findById(decoded.id);

    // if user with that id not found
    if (!user) {
      return next(new Error("No user found with this id", 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new Error("Not authorized sorry from catch", 401));
  }
};
