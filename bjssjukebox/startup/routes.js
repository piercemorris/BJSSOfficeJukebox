const express = require("express");
const spotify = require("../routes/spotify");
const users = require("../routes/users");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.static("/public"));
  app.use("/api/spotify/", spotify);
  app.use("/api/users/", users);
};
