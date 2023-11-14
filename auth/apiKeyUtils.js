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
    // here error loging will be added .
    pass;
  }
};

// /**

//  * @param {String} [phoneNumber] -Phone number to be validated
//  * @return {Boolean} - true if valid and false if not valid.
//  */
// exports.verifyPhoneNumber = (phoneNumber) => {
//   return true;
// };

// const SUPPORTED_COUNTRIES = [{ ETH: "251" }];

/**
 * !DISCLAIMER: THIS CLASS IS EXPLICITLY DESIGNED TO SUPPORT ONLY ETHIOPIAN PHONE NUMBERS.
 * @param {String} [phoneNumber] -Phone number to be validated
 * @return {Boolean} - true if valid and false if not valid.
 */
