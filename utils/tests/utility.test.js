const { endPoint } = require("../utility");
const PhoneNumberValidator = require("../phoneNumberValidator");

// Endpoint method util method test.
describe("endPoint function", () => {
  const url = "https://yaimaps.com/api/v1/projects";
  it("Should return the correct endpoint without query parameters", () => {
    const result = endPoint(url);
    expect(result).toBe(url);
  });

  // adding test case to check if extact the query parameter
  it("should handle URLs with query and return the correct url", () => {
    const urlWithQuery = "https://yaimaps.com/api/v1/projects?name=barnaan";
    const result = endPoint(urlWithQuery);
    expect(result).toBe(url);
  });
});

describe("Phone number validator test ", () => {
  const VALID_PHONE_NUMBERS = [
    "+251948952757",
    "+251748952757",
    "251948952757",
    "0948952757",
    "0748952757",
  ];
  const INVALID_PHONE_NUMBERS = [
    "948952757",
    "77DGFDFitsnotcorrect",
    "NOT A PHONE1EI",
    "noneafiflp",
    "incorrectother",
  ];

  it("Should return true for valid phone number and false for invalid phone number. ", () => {
    //? All valid phone number .
    const validatePhoneNumbers = (phoneNumbers, expectedValidity) => {
      phoneNumbers.forEach((number) => {
        const validity = new PhoneNumberValidator(number).verifyPhoneNumber();
        expect(validity).toBe(expectedValidity);
      });
    };
    validatePhoneNumbers(VALID_PHONE_NUMBERS, true);
    validatePhoneNumbers(INVALID_PHONE_NUMBERS, false);
  });
});
