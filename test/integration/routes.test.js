const request = require("supertest");
const serverPromise = require("../../index");
const { User } = require("../../models/user");
const { Song } = require("../../models/song");

let httpServer;
let endpoint;

describe("routes", () => {
  beforeAll(async () => {
    httpServer = await serverPromise;
  });

  afterAll(async () => {
    await httpServer.close()
  });

  describe("api/users/", () => {

    describe("GET /me", () => {
      endpoint = "/api/users/me";

      it("should return 401 if the client is not logged in", async () => {
        const res = await request(`http://127.0.0.1:${httpServer.address().port}`).get(endpoint);
        expect(await res.status).toBe(401);
      });

      it("should return the user details if the client is authorised", async () => {
        const res = await request(`http://127.0.0.1:${httpServer.address().port}`).get(endpoint);
        expect(await res.status).toBe(200);
      });
    });

    describe("POST /", () => {
      endpoint = "/api/users";

      it("should return 400 if the request is not valid", async () => {
        const res = await request(`http://127.0.0.1:${httpServer.address().port}`)
          .post(endpoint)
          .send({ username: "p", password: "below" });

        expect(await res.status).toBe(400);
      });

      it("should return 400 if client tries registering with a username already in use", async () => {
        //todo
      });

      it("should store the user & details in the database", async () => {
        //todo
      });

      it("should return the user details if successfully created an account", async () => {
        //todo
      });
    });

    describe("POST /login", () => {
      endpoint = "/api/users/login";

      it("should return 400 if the request is not valid", async () => {
        //todo
      });

      it("should return 400 if the user wasn't found in the database", async () => {
        //todo
      });

      it("should return 400 if the passwords don't match", async () => {
        //todo
      });

      it("should return the user just logged in", async () => {
        //todo
      });
    });

    describe("PUT /me", () => {
      endpoint = "/api/users/me";

      it("should return 401 if the client is not logged in", async () => {
        const res = await request(`http://127.0.0.1:${httpServer.address().port}`).get(endpoint);
        expect(await res.status).toBe(401);
      });

      it("should return 400 if the request is not valid", async () => {
        //todo
      });

      it("should return 404 if the user wasn't found in the database", async () => {
        //todo
      });

      it("should update the user in the database", async () => {
        //todo
      });

      it("should return the user who has just been updated", async () => {
        //todo
      });
    });

    describe("DELETE /me", () => {
      endpoint = "/api/users/me";

      it("should return 401 if the client is not logged in", async () => {
        const res = await request(`http://127.0.0.1:${httpServer.address().port}`).get(endpoint);
        expect(await res.status).toBe(401);
      });

      it("should return 404 if the user wasn't found in the database", async () => {
        //todo
      });

      it("should successfully delete the user", async () => {
        //todo
      });
    });
  });

  describe("api/songs/", () => {
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
          `http://127.0.0.1:3000`
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
        const res = await request(`http://127.0.0.1:3000`)
          .post("/api/songs")
          .send("Invalid POST request");

        expect(res.status).toBe(400);
      });

      it("should post a new song to the database", async () => {
        const res = await request(`http://127.0.0.1:3000`)
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
  });
}); 