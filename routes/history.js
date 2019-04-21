const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { History, validate } = require("../models/history");

/**
 * @api {post} /api/history/ POST History
 * @apiName PostHistory
 * @apiGroup History
 * @apiParam {String} songID Song id for the song to get audio features
 * @apiParam {Number} acousticness acousticness for the song, more info on Spotify API
 * @apiParam {Number} danceability danceability for the song, more info on Spotify API
 * @apiParam {Number} energy energy for the song, more info on Spotify API
 * @apiParam {Number} instrumentalness instrumentalness for the song, more info on Spotify API
 * @apiParam {Number} loudness loudness for the song, more info on Spotify API
 * @apiParam {Number} speechiness speechiness for the song, more info on Spotify API
 * @apiParam {Number} valence valence for the song, more info on Spotify API
 * @apiParam {Number} tempo tempo for the song, more info on Spotify API
 * 
 * @apiSuccess {Object} Result of the history object added
 * @apiError (400) AlreadyAdded History for the song is already added
 * @apiError (400) BadRequest Error validating history
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message, ":: Error validating history");

  let history = History.findOne({ songID: req.body.songID });
  if(history) return res.status(400).send("History for song is already added");

  //creates new history object
  history = new History({
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
