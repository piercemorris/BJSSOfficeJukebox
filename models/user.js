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
  isAdmin: {
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
    type: mongoose.Types.Decimal128,
    required: true
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isAdmin: this.isAdmin
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
      .required()
  };
  return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
