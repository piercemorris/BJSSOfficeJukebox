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
const url = process.env.FRONTEND_URL || config.get("base-url");
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

  spotifyApi.setAccessToken(response.body.access_token);
  spotifyApi.setRefreshToken(response.body.refresh_token);
  res.redirect(url);
});

router.get("/refresh", async (req, res) => {
  const response = await spotifyApi.refreshAccessToken();

  spotifyApi.setAccessToken(response.body.access_token);
});

router.get("/start", async (req, res) => {

});

router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  const response = await spotifyApi.searchTracks(query);
  res.status(200).send(response.body.tracks.items);
});

module.exports = router;
