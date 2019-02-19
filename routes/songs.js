const express = require("express");
const router = express.Router();
const { Song, validate } = require("../models/song");
const { User } = require("../models/user");
const priority = require("../services/priorityService");

//gets all songs in the Song collection
router.get("/", async (req, res) => {
  const songs = await Song.find();

  res.send(songs).status(200);
});

//adds a song to the Song collection & updates user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message, ":: Error validating song");
  const addTime = Date.now();

  const user =
    await User.findById(req.body.requestedBy);
  if (!user) return res.status(404).send("The user with the given id was not found");

  const userPriority = priority.increaseUserPriority(user.priority, user.lastAdd, addTime);
  console.log(userPriority);

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

//deletes a song with a given ID
router.delete("/:id", async (req, res) => {
  const song = await Song.findByIdAndRemove(req.params.id);
  if (!song)
    return res.status(404).send("The song with the given id was not found");
  res.send(song).status(200);
});

module.exports = router;
