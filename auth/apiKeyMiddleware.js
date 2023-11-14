const catchAsync = require("../error_handlers/catchAsync");
const AppError = require("../error_handlers/appError");
const User = require("../user/userModel");

//? A middleware for verifying authenticity of users make request through api using api key and secret key.
//! Remember there is another middleware for handling authentication that are done through password and phone number
exports.verify = catchAsync(async (req, res, next) => {
  try {
    //? returning bad request if user don't provided api key or secret key.
    if (!(req.headers.apikey && req.headers.secretkey)) {
      next(
        new AppError(
          "Please provide your api key or read the documentation for detail",
          400
        )
      );
    }

    //? Fetching/Querying user with provided api key and secret key.
    const user = await User.findOne({
      apiKey: req.headers.apikey,
    }).select("+secretKey");

    //? Checking if user exists .
    if (user) {
      const correct = await user.findSecretKey(
        req.headers.secretkey,
        user.secretKey
      );

      const ERR_MSG = "Your apiKey or secretKey is not correct!";
      // Checking if if user's secret key is correct .
      if (correct) {
        req.user = user;
        next();
      }
      //? returning bad request through global error handler.
      else {
        next(new AppError(ERR_MSG, 400));
      }
    }
    //? return bad request.
    else {
      next(new AppError(ERR_MSG, 400));
    }
  } catch (err) {
    // returning error through global error handler.
    //! HERE THE BEST PRACTICE IS JUST LOGING THE ERROR . BECAUSE IT WILL MASK THE ABOVE ERROR RESPONSE.
    throw new AppError("Error happened while processing your request.", 400);
  }
});
