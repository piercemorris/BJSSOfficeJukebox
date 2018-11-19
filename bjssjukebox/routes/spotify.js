var express = require('express'); // Express web server framework
var router = express.Router();
/*
Routes for handling spotify GET & POST requests
*/

/*
router.get("/login", (req, res) => {
  login function from spotify?
})
*/

router.get("/song", (req, res) => {
  //look at passing query through url?
  res.send("Spotify Get Request").status(200);
});

router.post("/song", (req, res) => {
  //post song to queue in database?
  res
    .json({
      name: "Kanye"
    })
    .status(200);
});

module.exports = router;
