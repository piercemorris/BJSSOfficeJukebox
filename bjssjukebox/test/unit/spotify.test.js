const request = require("supertest");

describe("TEST /api/spotify", () => {
  it("GET /song should expect a 200 status response", async () => {
    request("http://localhost:3000/")
      .get("/api/spotify/song")
      .expect(200);
  });

  it("POST /song should return a json object", async () => {
    request("http://localhost:3000/")
      .post("/api/spotify/song")
      .expect("Content-Type", /json/);
  });
});
