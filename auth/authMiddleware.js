const jwt = require("jsonwebtoken");
const User = require("../user/userModel");
const catchAsync = require("../error_handlers/catchAsync");
const AppError = require("../error_handlers/appError");
const { promisify } = require("util");

// Protect middleware -> For access control.
exports.protect = catchAsync(async (req, res, next) => {
  try {
    let token;
    // Checking the Authorization in headers .
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Getting the provided token.
      token = req.headers.authorization.split(" ")[1];
    } else {
      // Handling header doesn't contain AuthorizationToken.
      next(new AppError("Not Authorized", 401));
    }
    //? Verifying the token is generated by this api.

    const { id, iat } = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    // Finding the user related to the current token.
    const user = await User.findById(id);
    if (!user) {
      // not authorized if user doesn't exist!
      next(new AppError("Not Authorized", 401));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new AppError(err, 400));
  }
});
