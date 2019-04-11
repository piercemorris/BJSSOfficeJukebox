const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const minUsernameLength = 3;
const maxUsernameLength = 15;
const minPasswordLength = 7;
const maxPasswordLength = 30;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isDevice: {
    type: Boolean,
    required: true
  },
  songsAdded: {
    type: Number,
    required: true
  },
  lastAdd: {
    type: Number,
    required: true
  },
  priority: {
    type: Number,
    required: true
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isDevice: this.isDevice
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string()
      .min(minUsernameLength)
      .max(maxUsernameLength)
      .required(),
    password: Joi.string()
      .min(minPasswordLength)
      .max(maxPasswordLength)
      .required(),
    isDevice: Joi.bool()
  };
  return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
