const { User, validate } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("user.generateAuthToken", () => {
  it("should return a valid json web token", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      email: "test@example.com",
      username: "testusername",
      password: "12345",
      isAdmin: false
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject({ username: "testusername", isAdmin: false });
  });
});
