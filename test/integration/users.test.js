const request = require("supertest");
const serverPromise = require("../../index");
const { User } = require("../../models/user");

let httpServer;
let endpoint;

describe("api/users/", () => {
  beforeAll(async () => {
    httpServer = await serverPromise;
  });
  afterAll(() => httpServer.close());

  afterEach(async () => {
    await User.remove({});
  });

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

    describe("POST /", () => {
      endpoint = "/api/users";

      it("should return 400 if the request is not valid", async () => {
        //todo
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
});