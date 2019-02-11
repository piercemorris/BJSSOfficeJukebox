const express = require("express");
const router = express.Router();
const { Song, validate } = require("../models/song");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const songs = await Song.find();


  res.send(songs).status(200);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //increments the songs added by the current user by one
  const user = User.findByIdAndUpdate(
    { _id: req.body.user },
    {
      $inc: { 'songsAdded': 1 }
    });
  if (!user) return res.status(404).send("The user with the given id could not be found::add song");

  //creates new song object
  let song = new Song({
    song: req.body.song,
    username: req.body.username,
    requestedBy: req.body.requestedBy
  });

  //saves the song object in the database
  song = await song.save();
  res.send(song).status(200);
});

router.delete("/:id", async (req, res) => {
  const song = await Song.findByIdAndRemove(req.params.id);
  if (!song)
    return res.status(404).send("The song with the given id was not found");
  res.send(song).status(200);
});

module.exports = router;
