const apiKey = require("../apiKeyMiddleware");
const apiKeyUtils = require("../apiKeyUtils");
// TEST SUITE
describe("Verify middleware test ", () => {
  it("should do nothing for a while", () => {
    const checking = true;
    expect(checking).toBe(true);
  });
});

//Test suite
//  documentation https://jestjs.io/docs/expect
