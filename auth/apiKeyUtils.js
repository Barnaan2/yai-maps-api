const crypto = require("crypto");

//? GENERAL API KEY SETTINGS
const SIZE = 24;
const FORMAT = "base64";

/**
 *
 * @param {number} [SIZE] - The size of the API key
 * @param {String} [FORMAT] - The generated API key
 * @returns {String} - The generated API key
 */
exports.apiKeyGenerator = (SIZE, FORMAT) => {
  try {
    const buffer = crypto.randomBytes(SIZE);

    const apiKey = buffer.toString(FORMAT);
    return apiKey;
  } catch (err) {
    //!FIX ME:  error loging should be added here.
    pass;
  }
};
