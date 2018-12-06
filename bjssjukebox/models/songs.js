const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");

const songsSchema = new mongoose.Schema({
  song: {
    type: Object,
    required: true
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Songs = mongoose.model("Songs", songsSchema);

function validateSongs(song) {
  const schema = {
    name: Joi.string().required(),
    tags: Joi.string().required(),
    desc: Joi.string(),
    lang: Joi.string().required(),
    filesize: Joi.number(),
    downloads: Joi.number()
  };
  return Joi.validate(song, schema);
}

exports.songsSchema = songsSchema;
exports.Songs = Songs;
exports.validate = validateSongs;