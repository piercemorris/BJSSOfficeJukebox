const request = require("supertest");
const serverPromise = require("../../index");
const { Song } = require("../../models/song");

let httpServer;

describe("api/songs/", () => {
  beforeAll(async () => {
    httpServer = await serverPromise;
  });

  afterEach(async () => {
    await Song.remove({});
  });

  describe("GET /", () => {
    it("should return all songs", async () => {
      await Song.collection.insertMany([
        {
          song: {
            id: "3QHPHLAkYV5cQBUYs6rowx",
            name: "Gold Digger"
          }
        },
        {
          song: {
            id: "3U21A07gAloCc4P7J8rxcn",
            name: "All Mine"
          }
        }
      ]);

      const res = await request(
        `http://127.0.0.1:${httpServer.address().port}`
      ).get("/api/songs");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(
        res.body.some(item => item.song.id === "3QHPHLAkYV5cQBUYs6rowx")
      ).toBeTruthy();
      expect(
        res.body.some(item => item.song.id === "3U21A07gAloCc4P7J8rxcn")
      ).toBeTruthy();
    }, 30000);
  });

  describe("POST /", () => {
    it("should return 400 if data body is not valid", async () => {
      const res = await request(`http://127.0.0.1:${httpServer.address().port}`)
        .post("/api/songs")
        .send("Invalid POST request");

      expect(res.status).toBe(400);
    });

    it("should post a new song to the database", async () => {
      const res = await request(`http://127.0.0.1:${httpServer.address().port}`)
        .post("/api/songs")
        .send({
          song: {
            id: "3QHPHLAkYV5cQBUYs6rowx",
            name: "Gold Digger"
          }
        });

      expect(res.status).toBe(200);
      expect(res.body.song.id === "3QHPHLAkYV5cQBUYs6rowx").toBeTruthy();
    }, 5000);
  });

  afterAll(() => httpServer.close());
});
