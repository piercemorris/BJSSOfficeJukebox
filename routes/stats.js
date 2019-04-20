const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Stat, validate } = require("../models/stat");



//gets all songs in the Song collection
router.get("/", async (req, res) => {
  const stats = await Stat.find();
  res.send(stats).status(200);
});




//adds a song to the Song collection & updates user
router.post("/", async (req, res) => {
  

  const incrementSong =
  await Stat.findByIdAndUpdate(req.body._id,
   {
     $inc: { timesAdded: 1 },
   });
   if(incrementSong!=null){
     await incrementSong.save();
     res.send(incrementSong).status(200);
     return;
   }  
   //creates new song object
  let stat = new Stat({
    _id:req.body._id,
    songName: req.body.songName,
    artistName: req.body.artistName,
    genre: req.body.genre,
    image:req.body.image,
    timesAdded: 1,
  });

  //saves the song object in the database
  stat = await stat.save();
  res.send(stat).status(200);
});

module.exports = router;
