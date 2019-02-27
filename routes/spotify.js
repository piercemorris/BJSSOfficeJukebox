const express = require("express");
const config = require("config");
const request = require("request");
const querystring = require("querystring");
const router = express.Router();
const { Spotify, validate } = require("../models/spotify");

let redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:3000/api/spotify/callback";

router.get("/login", (req, res) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: config.get("spotify-client-id"),
      scope: "user-read-private user-read-email user-read-playback-state user-read-currently-playing user-modify-playback-state",
      redirect_uri
    })
  );
});

router.get("/callback", (req, res) => {
  var code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          config.get("spotify-client-id") +
          ":" +
          config.get("spotify-client-secret") //change to process.env.CLIENT_ID etc...
        ).toString("base64")
    },
    json: true
  };
  request.post(authOptions, async (error, response, body) => {
    var access_token = body.access_token;

    /* save spotify access token */
    const { error } = validate(access_token);
    if (error) return res.status(400).send(error.details[0].message, ":: invalid access token");

    let accessToken = new Spotify({
      token: accessToken,
      time: Date.now()
    })

    accessToken = await accessToken.save();

    let uri = process.env.FRONTEND_URI || "http://localhost:3000/";
    res.redirect(uri + "?access_token=" + access_token);
  });
});

router.get("/", (req, res) => {

});

module.exports = router;
