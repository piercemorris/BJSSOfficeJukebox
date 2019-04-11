const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Song, validate } = require("../models/song");
const { User } = require("../models/user");
const priority = require("../services/priorityService");

/**
 * @api {get} /api/songs/ GET Songs
 * @apiName GetQueue
 * @apiGroup Queue
 * @apiDescription  Gets all songs in the queue, filters the first N songs by time, then the rest by priority.
 *                  Updates the song's priorty on each call.
 * 
 * @apiSuccess {Object[]} body list of all songs in the current queue
 */
router.get("/", async (req, res) => {
  const songs = await Song.find();
  let frozen, filtered, full;
  songs.forEach(async (song) => {
    await Song.findByIdAndUpdate({ _id: song._id },
      {
        priority: priority.increaseSongPriority(song.priority, song.dateAdded, Date.now())
      });
  });
  frozen = _.orderBy(songs, ['dateAdded']);
  full = _.orderBy(songs, ['dateAdded']);

  if (frozen.length > 3) { // order by priority after frozen songs exceeded
    filtered = _.orderBy(songs, ['dateAdded']);
    frozen = frozen.slice(0, 3);
    filtered = filtered.slice(3);
    filtered = _.orderBy(filtered, ['priority'], ['desc']);
    full = _.concat(frozen, filtered);
  }
  res.send(full).status(200);
});

/**
 * @api {get} /api/songs/ POST Song
 * @apiName PostQueue
 * @apiGroup Queue
 * @apiParam {String} requestedBy User ID of the user who requested the song
 * @apiParam {Object} song Object of the song received from Spotify
 * @apiParam {String} username Username of the user who requested the song
 * @apiDescription  Adds a new song to the current queue. Adds the current logged in user and assigns the user priority 
 *                  to the song priority
 *                  
 * @apiSuccess {Object} body The song that has successfully been added to the queue
 * @apiError (400) InvalidBody Validation error details
 * @apiError (404) UserNotFound The current logged in user was not found
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message, ":: Error validating song");
  const addTime = Date.now();

  const user =
    await User.findById(req.body.requestedBy);
  if (!user) return res.status(404).send("The user with the given id was not found");

  const userPriority = priority.increaseUserPriority(user.priority, user.lastAdd, addTime);

  //updates the user after new priority is calculated
  const userUpdate =
    await User.findByIdAndUpdate(req.body.requestedBy,
      {
        $inc: { songsAdded: 1 },
        lastAdd: addTime,
        priority: priority.decreaseUserPriority(userPriority)
      });
  if (!userUpdate) return res.status(404).send("The user with the given id could not be found :: add song");
  await userUpdate.save();

  //creates new song object
  let song = new Song({
    song: req.body.song,
    username: req.body.username,
    requestedBy: req.body.requestedBy,
    dateAdded: addTime,
    priority: userPriority,
  });

  //saves the song object in the database
  song = await song.save();
  res.send(song).status(200);
});

/**
 * @api {get} /api/songs/:id DELETE Song
 * @apiName DeleteQueue
 * @apiGroup Queue
 * @apiDescription  Deletes a song from the queue with the given ID in the URL body
 *                  
 * @apiSuccess {Object} body The song that has been successfully deleted
 * @apiError (404) BadRequest The song with the given ID wasn't found
 */
router.delete("/:id", async (req, res) => {
  const song = await Song.findByIdAndRemove(req.params.id);
  if (!song)
    return res.status(404).send("The song with the given id was not found");
  res.send(song).status(200);
});

module.exports = router;
