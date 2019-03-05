const express = require("express");
const config = require("config");
const SpotifyWebApi = require('spotify-web-api-node');
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
  const query = req.params.query;
  const response = await spotifyApi.searchTracks(query);
  res.status(200).send(response.body.tracks.items);
});

router.get("/play/:playing", async (req, res) => {
  let response;
  if (req.params.playing === "1") {
    response = spotifyApi.pause({});
  } else {
    response = spotifyApi.play({});
  }

  res.status(200).send(response);
});

router.get("/start/:uri", async (req, res) => {
  const response = await spotifyApi.play({ uris: [req.params.uri] });

  res.status(200).send(response);
});

router.get("/getCurrent", async (req, res) => {
  const response = await spotifyApi.getMyCurrentPlayingTrack({});
  res.status(200).send(response);
});

router.get("/getMe", async (req, res) => {
  const { body } = await spotifyApi.getMe();
  const { body: data } = await spotifyApi.getMyDevices();

  const payload = {
    body,
    devices: data.devices
  };

  res.status(200).send(payload);
});

module.exports = router;
