const express = require("express");
const config = require("config");
const querystring = require("querystring");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

var stateKey = "spotify_auth_state";
var redirect_uri = "localhost:3000/api/spotify/callback";

var generateRandomString = function(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/login", (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: config.get("spotify-client-id"),
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

router.get("/callback", (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;

      /*
      var artist = {
        url: 'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg', // API call with Pitbull's ID.
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
      
      request.get(artist, function(error, response, body) {
        console.log(body);
      });
      
      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, function(error, response, body) {
        console.log(body);
      });
      */

      var artistQuery = "Michael Jackson";

      var artistSearch = {
        url:
          "https://api.spotify.com/v1/search?q=" +
          artistQuery +
          "&type=artist&limit=1",
        headers: { Authorization: "Bearer " + access_token },
        json: true
      };

      request.get(artistSearch, function(error, response, body) {
        var result = body.artists.items[0];
        console.log(
          "\nName: " +
            result.name +
            "\nPopularity: " +
            result.popularity +
            "\nID: " +
            result.id +
            "\n"
        );
      });
    } ///////////////////////////

  spotifyApi.searchTracks("Love").then(
    function(data) {
      console.log('Search by "Love"', data.body);
    },
    function(err) {
      console.error(err);
    }
  );
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
