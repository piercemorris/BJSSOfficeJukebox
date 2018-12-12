const request = require("supertest");
const serverPromise = require("../../index");
const config = require("config");
let httpServer;

describe("api/songs/", () => {
  beforeAll(async () => {
    httpServer = await serverPromise;
  });
  afterAll(() => httpServer.close());

  describe("GET /", () => {
    it("should return all songs", async () => {
      const res = await request(`http://localhost:${config.get("port")}`).get(
        "/api/songs"
      );
      expect(await res.status).toBe(200);
    });
  });
});
