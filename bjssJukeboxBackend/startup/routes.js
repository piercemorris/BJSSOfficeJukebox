const express = require("express");
const index = require("../routes/index");
const spotify = require("../routes/spotify");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/spotify/", spotify);
  app.use("/", index);
};
