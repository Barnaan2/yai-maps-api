class PhoneNumberValidator {
  constructor(phoneNumber) {
    this.phoneNumber;
    this.isValid = false;

    try {
      //? This class supports three specific formats [+251912345678,251912345678,0912345678]
      if (
        phoneNumber.length == 13 ||
        phoneNumber.length == 12 ||
        phoneNumber.length == 10
      ) {
        // convert the phone number passed to Integer and check if its a valid number unless throw an error.

        //? If the length of items is 13 the first item should be [+],
        // so we should get rid of it before converting the items to a number.
        phoneNumber =
          phoneNumber.length == 13
            ? parseInt(phoneNumber.slice(1))
            : parseInt(phoneNumber);

        //? checking if the phone number is a number.
        if (isNaN(phoneNumber)) {
          //? i think instead of throwing an error i should stamp the number as invalid phoneNumber and return false
          this._isValidSetter(false);
        } else {
          //? set the phoneNumber variable
          this._phoneNumberSetter(phoneNumber);
        }
      }
    } catch (err) {
      this._isValidSetter(false);
      console.log(err);
    }
  }

  //? for setting the isValid property.
  _isValidSetter(isValid) {
    this.isValid = isValid;
  }

  //?for setting the phoneNumber property
  _phoneNumberSetter(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  verifyPhoneNumber() {
    //? check weather the current number has valid country code and starting index.
    //? Incase of Ethiopia the supported phone number formats are 07 and 09.
    if (this.phoneNumber) {
      this.phoneNumber = this.phoneNumber.toString();
      const trimedPhoneNumber =
        this.phoneNumber.length == 12
          ? this.phoneNumber.slice(3)
          : this.phoneNumber;
      this._isValidSetter(this._validatePhoneNumber(trimedPhoneNumber));
    }
    return this.isValid;
  }

  _validatePhoneNumber(number) {
    //?check weather the first item of the number is 7 or 9 ;
    if (number[0] == 9 || number[0] == 7) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = PhoneNumberValidator;
