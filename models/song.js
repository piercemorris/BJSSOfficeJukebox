const mongoose = require("mongoose");
const Joi = require("joi");

const songSchema = new mongoose.Schema({
  song: {
    type: Object,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateAdded: {
    type: Date,
    required: true
  },
  priority: {
    type: mongoose.Types.Decimal128,
    required: true
  }
});

const Song = mongoose.model("Song", songSchema);

function validateSong(song) {
  const schema = {
    song: Joi.object().required(),
    username: Joi.string().required(),
    requestedBy: Joi.objectId().required()
  };
  return Joi.validate(song, schema);
}

exports.songSchema = songSchema;
exports.Song = Song;
exports.validate = validateSong;
