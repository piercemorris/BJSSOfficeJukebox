const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const spotify = require("../routes/spotify");
const users = require("../routes/users");
const songs = require("../routes/songs");

module.exports = function (app) {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(compression());
  app.use(express.static("/public"));
  app.use("/api/spotify/", spotify);
  app.use("/api/users/", users);
  app.use("/api/songs/", songs);
};
