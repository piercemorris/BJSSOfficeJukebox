var express = require("express");
var request = require("request");
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var router = express.Router();

/*
Routes for handling spotify GET & POST requests
*/
var client_id = 'a11348b400434a2ba1cbcf618dadf888'; // Spotify client id
var client_secret = 'c38b37d0392f4234bc44fe635c0b4596'; // Spotify client secret
var redirect_uri = 'http://localhost:3000/callback'; // redirect uri

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
