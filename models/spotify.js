const mongoose = require("mongoose");
const Joi = require("joi");

const spotifySchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  }
});

const Spotify = mongoose.model("Spotify", spotifySchema);

function validateSpotify(spotify) {
  const schema = {
    token: Joi.string().required()
  };
  return Joi.validate(spotify, schema);
}

exports.spotifySchema = spotifySchema;
exports.Spotify = Spotify;
exports.validate = validateSpotify;
