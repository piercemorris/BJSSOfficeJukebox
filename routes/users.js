const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");

// HTTP GET request to retrieve information about the currently logged in user
router.get("/:id", async (req, res) => { //auth for middleware
  const user = await User.findById(req.params.id).select(
    "-password -isAdmin"
  );
  if (!user) return res.send("No user found").status(404);
  res.send(user);
});

// HTTP POST request to create a new user account then log them in immediately
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User is already registered");

  user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: false,
    songsAdded: 0,
    lastAdd: 0,
    priority: 1.0
  });

  // Generate a hash function to encrypt the passwords that are going to be
  // stored in the database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // Generate a json web token for authenticating the user upon authorization
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(token).status(200);
});

// HTTP POST request to login a user if the credentials are correct
router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Incorrect username or password");

  // hashes the input password and compares to the stored password in the database
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(token); //.send(_.pick(user, ["_id", "username"]));
  } else return res.status(400).send("Incorrect username or password");
});

// HTTP PUT request to update the currently logged in user
router.put("/me", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Generates a salt and hashes new password
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

// HTTP DELETE request to delete a given user
router.delete("/me", auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.user._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.send(user);
});

module.exports = router;
