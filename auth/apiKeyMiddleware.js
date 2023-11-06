const catchAsync = require("../error_handlers/catchAsync");
const AppError = require("../error_handlers/appError");
const User = require("../user/userModel");

exports.verify = catchAsync(async (req, res, next) => {
  try {
    if (!(req.headers.apikey && req.headers.secretkey)) {
      next(
        new AppError(
          "Please provide your api key or read the documentation for detail",
          400
        )
      );
    }

    const user = await User.findOne({
      apiKey: req.headers.apikey,
    }).select("+secretKey");

    if (user) {
      const correct = await user.findSecretKey(
        req.headers.secretkey,
        user.secretKey
      );
      if (correct) {
        req.user = user;
        next();
      } else {
        next(new AppError("your apiKey or secretKey is not correct !", 400));
      }
    } else {
      next(new AppError("your apiKey or secretKey is not correct !", 400));
    }
  } catch (err) {
    next(new AppError(err, 400));
  }
});
