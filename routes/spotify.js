const express = require("express");
const config = require("config");
const SpotifyWebApi = require('spotify-web-api-node');
const { Song, validate } = require("../models/song");
const router = express.Router();

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-modify-playback-state"
];
const state = "code";
const url = process.env.FRONTEND_URL || config.get("baseUrl");
const clientId = process.env.CLIENT_ID || config.get("spotify-client-id");
const clientSecret = process.env.CLIENT_SECRET || config.get("spotify-client-secret");
const redirectUri = process.env.REDIRECT_URI || config.get("redirect-uri");

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

router.get("/login", (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const response = await spotifyApi.authorizationCodeGrant(code);

  console.log("token set at time ", new Date());
  spotifyApi.setAccessToken(response.body.access_token);
  spotifyApi.setRefreshToken(response.body.refresh_token);
  res.redirect(url);

  setInterval(async () => {
    console.log("token refreshed at time ", new Date());
    const response = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(response.body.access_token);
  }, 1740000);
});

router.get("/refresh", async (req, res) => {
  const response = await spotifyApi.refreshAccessToken();

  spotifyApi.setAccessToken(response.body.access_token);
});

router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const response = await spotifyApi.searchTracks(query);
    res.status(200).send(response.body.tracks.items);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.get("/resume/:uri", async (req, res) => {
  try {
    await spotifyApi.play({})
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.send(400).send(err);
      });
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.get("/pause", async (req, res) => {
  try {
    const response = spotifyApi.pause({});
    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.get("/volume/:newVolume", async (req, res) => {
  try {
    const volume = req.params.newVolume;
    const response = await spotifyApi.setVolume(volume, {});

    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.get("/time/:newTime", async (req, res) => {

  try {
    const newTime = req.params.newTime;
    const response = await spotifyApi.seek(newTime, {});

    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.get("/start/:uri", async (req, res) => {
  try {
    const response = await spotifyApi.play({ uris: [req.params.uri] });

    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.get("/features/:id", async (req, res) => {
  try {
    const response = await spotifyApi.getAudioFeaturesForTrack(req.params.id);

    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.get("/getCurrent", async (req, res) => {
  try {
    const response = await spotifyApi.getMyCurrentPlayingTrack({});
    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.get("/getMe", async (req, res) => {
  try {
    const { body } = await spotifyApi.getMe();
    const { body: data } = await spotifyApi.getMyDevices();

    const payload = {
      body,
      devices: data.devices
    };

    res.status(200).send(payload);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

router.post("/alexa", async (req, res) => {
  try {
    const query = req.body.query;
    const response = await spotifyApi.searchTracks(query);

    // if no search results
    if (response.body.tracks.total === 0)
      return res.status(404).send("No songs found");

    const track = response.body.tracks.items[0];
    const songObj = {
      song: track
    }

    // add to the queue with priority 1.0 under name Alexa
    let song = new Song({
      song: songObj,
      username: "Alexa",
      requestedBy: null,
      dateAdded: Date.now(),
      priority: 0.5,
    });

    // save the song
    song = await song.save();
    res.send(song).status(200);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

module.exports = router;
