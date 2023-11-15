const jwt = require("jsonwebtoken");
const AppError = require("../error_handlers/appError");

// SignIn token generator.
/**
 *
 * @param {String} id -Id of authenticating user.
 * @returns {String,String} - Token: for authentication and ExpritesIn: The time at which the token will be expired.
 */
exports.signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 *
 * @param {Object} currProject
 * @param {Object} userProject
 * @returns {Boolean}
 */
//Authorize users
exports.authorizeObj = (currProject, userProject) => {
  try {
    //checks if id of the project a user is trying to access is belong to the users.
    userProject = userProject.toString();
    currProject = currProject.toString();
    if (currProject == userProject) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
    //!FIXME logging should be added.
  }
};
