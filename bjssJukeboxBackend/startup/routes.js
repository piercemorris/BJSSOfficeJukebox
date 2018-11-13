const express = require("express");
const index = require("../routes/index");
const spotify = require("../routes/spotify");
const users = require("../routes/users");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/spotify/", spotify);
  app.use("/api/users/", users);
  app.use("/", index);
};
