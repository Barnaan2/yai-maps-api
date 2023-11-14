const AppError = require("../error_handlers/appError");

// @params page,pageSize,data,endPoint
class Paginator {
  constructor(data, page = 1, pageSize = 10, endPoint) {
    this.page = 1;
    this.pageSize = 1;
    this.data = data;
    this.endPoint = endPoint;
    this.startIndex;
    this.endIndex;

    try {
      // setting pageSize to the size passed by user if it is valid.
      if (parseInt(pageSize)) {
        const newPageSize = parseInt(pageSize);
        this.pageSize = newPageSize > 0 ? newPageSize : this.pageSize;
      }
      // setting page to the passed page if its valid.
      if (parseInt(page)) {
        const newPage = parseInt(page);
        this.page = newPage > 0 ? newPage : this.page;
      }

      if (data.length >= 0) {
        this.data = data;
      }

      // setting start and end index for the data that will be paginated and returned
      this.startIndex = (page - 1) * pageSize;
      this.endIndex = pageSize * page;
    } catch (err) {
      // throwing error using the custom app error .
      // the error will be a bad request response with specifically issued error message.
      throw new AppError(`Invalid input: ${err}`, 400);
    }
  }

  // the paginate method will return the paginated data when its called in an instance of paginator class.
  paginate() {
    return {
      next: this._next(),
      previous: this._previous(),
      count: this._data().length,
      data: this._data(),
    };
  }
  // it will return the paginated data according to the given start and endINDEX
  _data() {
    return this.data.slice(this.startIndex, this.endIndex);
  }

  // check weather the data has next page if it does it returns it unless it will return null
  _next() {
    if (this.data.length > this.endIndex) {
      return `${this.endPoint}?page=${this.page + 1}&pageSize=${this.pageSize}`;
    } else {
      return null;
    }
  }
  // check wether the data has the previous page if does it returns it unless it return null.
  _previous() {
    if (this.page > 1 && this.data.length > this.pageSize) {
      return `${this.endPoint}?page=${this.page - 1}&pageSize=${this.pageSize}`;
    } else {
      return null;
    }
  }
}

module.exports = Paginator;
