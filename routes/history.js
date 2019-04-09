const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { History, validate } = require("../models/history");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message, ":: Error validating history");

  console.log("passed history validation");

  //creates new history object
  let history = new History({
    songID: req.body.songID,
    acousticness: req.body.acousticness,
    danceability: req.body.danceability,
    energy: req.body.energy,
    instrumentalness: req.body.instrumentalness,
    liveness: req.body.liveness,
    loudness: req.body.loudness,
    speechiness: req.body.speechiness,
    valence: req.body.valence,
    tempo: req.body.tempo
  });

  //saves the history object in the database
  history = await history.save();
  res.status(200).send(history);
});

module.exports = router;
