const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");

/**
 * @api {get} /api/user/:id GET User
 * @apiName GetUser
 * @apiGroup User
 * @apiParam {String} id Users unique ID
 * 
 * @apiSuccess {Object} body User information without sensitive data
 * @apiError (404) NoUserFound No user found with the given ID
 */
router.get("/:id", async (req, res) => { //auth for middleware
  const user = await User.findById(req.params.id).select(
    "-password"
  );
  if (!user) return res.send("No user found with the given ID").status(404);
  res.send(user);
});


/**
 * @api {post} /api/user/ POST User
 * @apiName PostUser
 * @apiGroup User
 * @apiParam {String} username User inputted username
 * @apiParam {String} password User inputted password
 * @apiParam {Boolean} isDevice Is the account a device account or not
 * 
 * @apiSuccess {String} JSON Web Token
 * @apiError (400) InvalidBody Validation error details
 * @apiError (400) BadRequest User is already registered
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User is already registered");

  user = new User({
    username: req.body.username,
    password: req.body.password,
    isDevice: req.body.isDevice,
    songsAdded: 0,
    lastAdd: 0,
    priority: 1.0
  });

  // Generate a hash function to encrypt the passwords that are going to be stored in the database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // Generate a json web token for authenticating the user upon authorization
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(token).status(200);
});

/**
 * @api {post} /api/user/login LOGIN User
 * @apiName LoginUser
 * @apiGroup User
 * @apiParam {String} username User inputted username
 * @apiParam {String} password User inputted password
 * 
 * @apiSuccess {String} JSON Web Token
 * @apiError (400) InvalidBody Validation error details
 * @apiError (400) BadRequest Incorrect username or password
 */
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

/**
 * @api {put} /api/user/me UPDATE User
 * @apiName PutUser
 * @apiGroup User
 * @apiParam {String} username Username of the current user
 * @apiParam {String} password New password for the user
 * 
 * @apiSuccess {Object} User insensitive information
 * @apiError (400) InvalidBody validation error details
 * @apiError (404) NotFound The user with the given ID was not found
 */
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

/**
 * @api {delete} /api/user/me DELETE User
 * @apiName DeleteUser
 * @apiGroup User
 * 
 * @apiSuccess {Object} User that was deleted
 * @apiError (404) NotFound The user with the given ID was not found
 */
router.delete("/me", auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.user._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.send(user);
});

module.exports = router;
