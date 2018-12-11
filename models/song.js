const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");

const songSchema = new mongoose.Schema({
  song: {
    type: Object,
    required: true
  } /*,
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }*/
});

const Song = mongoose.model("Song", songSchema);

function validateSong(song) {
  const schema = {
    song: Joi.object().required()
    //requestedBy: Joi.?
  };
  return Joi.validate(song, schema);
}

exports.songSchema = songSchema;
exports.Song = Song;
exports.validate = validateSong;
