const User = require("../models/User");

// ################################################################################################
// Registration of new user (signup)


exports.signup = async (req, res, next) => {
  //  getting username, email and password from req body
  const { username, email, password } = req.body;

  // storing data in database (creating new user)
  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    // sending confirmation
    // res.status(201).json({
    //   success: true,
    //   user,
    // });
    sendJWT(user, 201, res);
  } catch (err) {
    // res.status(500).json({
    //     success: false,
    //     error: err.message
    // })
    next(err);
  }
};

// #######################################################################################

// Login of user (signin)

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  // if email or password is not provided send error
  if (!email || !password) {
    // res.status(400).json({
    //     success: false,
    //     error: "Please provide email and password"
    // })
    return next(new Error("Please provide an email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    // user not found
    if (!user) {
      // res.status(401).json({
      //     success:false,
      //     error: "Invalid credentials"
      // });
      return next(new Error("Invalid credentials", 401));
    }

    // user found now check password
    const verified = await user.verifyPassword(password);

    // if user is not verified
    if (!verified) {
      // res.status(400).json({
      //     success: false,
      //     error: "Invalid credentials"
      // });
      return next(new Error("Invalid credentials", 401));
    }

    // res.status(200).json({
    //   success: true,
    // });
    sendJWT(user, 200, res);
  } catch (err) {
    // res.status(500).json({
    //     success: false,
    //     error: err.message
    // });

    next(err);
  }
};

// ###################################################################################

// sending back jsonwebtoken when user is registered and also when user login
const sendJWT = (user, statusCode, res) => {
  const token = user.getSignedJWT();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
