const request = require("supertest");
const serverPromise = require("../../index");
let httpServer;

describe("api/songs/", () => {
  beforeAll(async () => {
    httpServer = await serverPromise;
  });
  afterAll(() => httpServer.close());

  describe("GET /", () => {
    it("should return all songs", async () => {
      const res = await request(httpServer).get("/api/songs/");
      expect(await res.status).toBe(200);
    });
  });
});
