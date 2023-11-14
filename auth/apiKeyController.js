const AppError = require("../error_handlers/appError");
const catchAsync = require("../error_handlers/catchAsync");
const apiKeyUtils = require("./apiKeyUtils");

//? Generates api key. it will generate unique api keys which is used to identify each uses.
exports.generateApiKey = catchAsync(async (req, res, next) => {
  try {
    //? Using the apiKeyGenerator method from the utils . which generates 26 charcheter length .
    const apiKey = apiKeyUtils.apiKeyGenerator();
    let user = req.user;
    user.apiKey = apiKey;

    //? Returning the created api key.
    res.status(201).json({
      status: "201_CREATED",
      data: {
        user: req.user.apiKey,
      },
    });
  } catch (err) {
    //? Passing the error to global error handler.
    next(new AppError(err, 400));
  }
});
