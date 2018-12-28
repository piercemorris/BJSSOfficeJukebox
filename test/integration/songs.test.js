const request = require("supertest");
const serverPromise = require("../../index");
const server = require("../../index");
const config = require("config");
let httpServer;

describe("api/songs/", () => {
  beforeAll(async () => {
    httpServer = await serverPromise;
  });

  describe("GET /", () => {
    it("should return all songs", async () => {
      const res = await request("http://127.0.0.1:3000").get("/api/songs");
      expect(await res.status).toBe(200);
    });
  });

  afterAll(() => httpServer.close());
});
