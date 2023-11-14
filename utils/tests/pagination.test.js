const AppError = require("../../error_handlers/appError");
const Paginator = require("../pagination");

// Paginator class's test suite.
describe("Paginator class tests ", () => {
  it("Should paginate when the correct values are passed to it.", () => {
    data = [
      {
        "item 1": "first item",
        "object 1": "second object",
      },
      {
        "item 1": "first item",
        "object 1": "second object",
      },
      {
        "item 1": "first item",
        "object 1": "second object",
      },
      {
        "item 1": "first item",
      },
      {
        "object 1": "second object",
      },

      { "object 1": "second object" },
    ];
    //check if it does the real pagination.
    const pageSize = 2;
    const page = 1;
    const url = "https://yaimaps.com/api/v1/projects";
    const paginated = new Paginator(data, page, pageSize, url).paginate();
    expect(paginated.previous).toBeNull();
    expect(paginated.data.length).toEqual(pageSize);
    expect(paginated.next).toBe(`${url}?page=${page + 1}&pageSize=${pageSize}`);
  });

  // it("Should throw AppError in Invalid inputs ", () => {
  //   const invalidInput = () =>
  //     new Paginator(
  //       "invalid data",
  //       -1,
  //       "invalidPageSize",
  //       "/api/resource"
  //     ).paginate();
  //   console.log(invalidInput);
  //   // const invalidInput = () => new Paginator("invalid data", "-1", -5, 6);
  //   expect(invalidInput).toThrow(AppError);
  // });
});
