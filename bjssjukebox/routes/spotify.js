const express = require("express");
const config = require("config");
const request = require('request');
const querystring = require("querystring");
const router = express.Router();

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';

router.get("/login", (req, res) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: config.get("spotify-client-id"),
        scope: 'user-read-private user-read-email',
        redirect_uri
      })
  );
});

router.get("/callback", (req, res) => {
  var code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        config.get("spotify-client-id") + ':' + config.get("spotify-client-secret") //change to process.env.CLIENT_ID etc...
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, (error, response, body) => {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

module.exports = router;
