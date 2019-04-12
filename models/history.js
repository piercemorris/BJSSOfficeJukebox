const mongoose = require("mongoose");
const Joi = require("joi");

const historySchema = new mongoose.Schema({
  songID: {
    type: String,
    required: true
  },
  acousticness: {
    type: Number,
    required: true
  },
  danceability: {
    type: Number,
    required: true
  },
  energy: {
    type: Number,
    required: true
  },
  instrumentalness: {
    type: Number,
    required: true
  },
  liveness: {
    type: Number,
    required: true
  },
  loudness: {
    type: Number,
    required: true
  },
  speechiness: {
    type: Number,
    required: true
  },
  valence: {
    type: Number,
    required: true
  },
  tempo: {
    type: Number,
    required: true
  }
});

const History = mongoose.model("History", historySchema);

function validateHistory(history) {
  const schema = {
    songID: Joi.string(),
    acousticness: Joi.number(),
    danceability: Joi.number(),
    energy: Joi.number(),
    instrumentalness: Joi.number(),
    liveness: Joi.number(),
    loudness: Joi.number(),
    speechiness: Joi.number(),
    valence: Joi.number(),
    tempo: Joi.number(),
  };
  return Joi.validate(history, schema);
}

exports.historySchema = historySchema;
exports.History = History;
exports.validate = validateHistory;
