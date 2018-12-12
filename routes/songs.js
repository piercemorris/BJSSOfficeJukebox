const express = require("express");
const router = express.Router();
const { Song, validate } = require("../models/song");

router.get("/", async (req, res) => {
  const songs = await Song.find();

  res.send(songs).status(200);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let song = new Song({
    song: req.body.song
  });

  await song.save();
});

module.exports = router;
