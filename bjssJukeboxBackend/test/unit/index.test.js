const request = require("supertest");
const app = require("../../index");

describe("GET /", () => {
  it("should expect a 200 status response", () => {
    request(app)
      .get("/")
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});
