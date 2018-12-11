const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const spotify = require("../routes/spotify");
const users = require("../routes/users");
const songs = require("../routes/songs");

module.exports = function(app) {
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static("/public"));
  app.use("/api/spotify/", spotify);
  app.use("/api/users/", users);
  app.use("/api/songs/", songs);
};
