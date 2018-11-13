const request = require("supertest");

describe("TEST /", () => {
  it("GET / should expect a 200 status response", async () => {
    request("http://localhost:3000/")
      .get("/")
      .expect(200);
  });
});
