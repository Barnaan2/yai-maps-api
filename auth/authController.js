const catchAsync = require("../error_handlers/catchAsync");
const User = require("../user/userModel");
const authUtils = require("./authUtils");
const AppError = require("../error_handlers/appError");
const apiKeyUtils = require("./apiKeyUtils");
const phoneNumberValidator = require("../utils/phoneNumberValidator");

//? Registartion controller .
exports.register = catchAsync(async (req, res, next) => {
  try {
    //? checking if both password and confirm password are provided and the same.
    if (req.body.password !== req.body.confirmPassword) {
      next(new AppError("Password must be the same!", 400));
    }

    //? Checking if phone number in method request available and check its validity
    if (!new phoneNumberValidator(req.phoneNumber).verifyPhoneNumber()) {
      next(
        new AppError(
          "The provided Phone number is invalid, supported formats are [+251712345678,+251912345678,251712345678,251912345678,0912345678, 0712345678 ]",
          400
        )
      );
    }

    //? Generating api key and secret key.
    const apiKey = apiKeyUtils.apiKeyGenerator(24);
    const secretKey = apiKeyUtils.apiKeyGenerator(12);

    //? Creating the user. with provided data and the generated api key and secret key.
    const newUser = await User.create({
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      // role:"SuperUser",
      apiKey: apiKey,
      secretKey: secretKey,
    });

    // generating the authentication token for newly created user.
    const token = authUtils.signToken(newUser._id);
    // returning the created user with auth token and role.
    res.status(201).json({
      status: "201_CREATED",
      data: {
        token,
        role: newUser.role,
        apiKey: newUser.apiKey,
      },
    });
  } catch (err) {
    //passing error to the global error handler with 400 status and the provided error.
    //! later on adding logging should be considered .
    next(new AppError(err, 400));
  }
});

//? Login controller
exports.login = catchAsync(async (req, res, next) => {
  try {
    //?checking weather phone number and password is provided.
    if (!(req.body.password && req.body.phoneNumber)) {
      next(
        new AppError(
          "Phone number{phoneNumber} and password{password} should be provided to login !",
          400
        )
      );
    }
    //? selecting the password of the user by provided phoneNumber
    const user = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    }).select("+password");

    const ERROR_MSG =
      "The phoneNumber doesn't exits or the password is not correct!";
    //? checking if the user exists with the provided phoneNumber.
    if (user) {
      const correct = await user.correctPassword(
        req.body.password,
        user.password
      );

      //? checking if the user password that is provided is correct and returning the auth token for user with its role.
      if (correct) {
        const token = authUtils.signToken(user._id);
        res.status(200).json({
          status: "Successful",
          data: {
            token,
            role: user.role,
          },
        });
      }
      //? Handling phoneNumber doesn't exists error.
      else {
        next(new AppError(ERROR_MSG, 400));
      }
    }
    //
    else {
      //? Handling phoneNumber incorrect password error.
      next(new AppError(ERROR_MSG, 400));
    }
  } catch (err) {
    //? Handling unexpected error.
    next(new AppError(err, 400));
  }
});

//? Change secretKey controller.
exports.changeSecretKey = catchAsync(async (req, res, next) => {
  try {
    // user passed through middleware.
    const pk = req.user.id;
    const data = {
      secretKey: req.body.secretKey,
    };
    // save the updated/changed secrect key.
    const updatedUser = await User.findOneAndUpdate(pk, data, {
      new: true,
      runValidators: false,
    });

    res.status(201).json({
      status: "201_UPDATED",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    // Handling unexpected errors.
    next(new AppError(err, 400));
  }
});
