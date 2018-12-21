const request = require("supertest");
const serverPromise = require("../../index");
const { Song } = require("../../models/song");

let httpServer;

describe("api/songs/", () => {
  beforeAll(async () => {
    httpServer = await serverPromise;
  });
  afterAll(() => httpServer.close());

  afterEach(async () => {
    await Song.remove({});
  });
});