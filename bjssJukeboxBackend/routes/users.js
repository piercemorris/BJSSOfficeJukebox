const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");

// GET
router.get("/", async (req, res) => {
  const user = await User.find().select("-password -isAdmin");

  res.send(user);
});

// GET logged in user
router.get("/me", async (req, res) => {
  res.send(await User.findById(req.user._id).select("-password -isAdmin"));
});

// POST new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User is already registered");

  user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: false
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id", "username"]));
});

// PUT update user
router.put("/me", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username } = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = await User.findByIdAndUpdate(req.user._id, {
    username,
    password
  });

  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.send(user);
});

// DELETE
router.delete("/me", async (req, res) => {
  const user = await User.findByIdAndRemove(req.user._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.send(user);
});

module.exports = router;
