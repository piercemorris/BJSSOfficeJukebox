const mongoose = require("mongoose");
const Joi = require("joi");

const statSchema = new mongoose.Schema({
  _id:{
    type: String,
  },
  songName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  image:{
    type:String,
    required:true
  },
  timesAdded: {
    type: Number,
    required: true
  }
});

const Stat = mongoose.model("StatTry2", statSchema);

function validateStat(stat) {
  const schema = {
    _id: Joi.string().required(),
    songName: Joi.string().required(),
    artistName: Joi.string().required(),
    genre: Joi.string().required(),
    image: Joi.string().required(),
  };
  return Joi.validate(stat, schema);
}

exports.statSchema = statSchema;
exports.Stat = Stat;
exports.validate = validateStat;
