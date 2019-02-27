const mongoose = require("mongoose");
const Joi = require("joi");

const spotifySchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  expiresIn: {
    type: Number,
    required: true
  }
});

const Spotify = mongoose.model("Spotify", spotifySchema);

exports.spotifySchema = spotifySchema;
exports.Spotify = Spotify;