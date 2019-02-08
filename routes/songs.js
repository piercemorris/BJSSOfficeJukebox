const express = require("express");
const router = express.Router();
const { Song, validate } = require("../models/song");

router.get("/", async (req, res) => {
  const songs = await Song.find();

  res.send(songs).status(200);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Here something went wronge haha" + error.details[0].message);

  let song = new Song({
    song: req.body.song,
    username: req.body.username,
    requestedBy: req.body.requestedBy
  });

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
