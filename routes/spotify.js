const express = require("express");
const config = require("config");
const SpotifyWebApi = require('spotify-web-api-node');
const { Song, validate } = require("../models/song");
const router = express.Router();

// defining scopes for the Spotify API
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-modify-playback-state"
];
const state = "code";

// configure secrets and environment variables
const url = process.env.FRONTEND_URL || config.get("baseUrl");
const clientId = process.env.CLIENT_ID || config.get("spotify-client-id");
const clientSecret = process.env.CLIENT_SECRET || config.get("spotify-client-secret");
const redirectUri = process.env.REDIRECT_URI || config.get("redirect-uri");

// create new Spotify API object
const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

/**
 * @api {get} /api/spotify/login Authorise Spotify
 * @apiName SpotifyLogin
 * @apiGroup Spotify
 * @apiDescription Creates the authorisation URL for Spotify which allows you to retrieve a token
 *                  
 * @apiSuccess {undefined} null redirect to Spotify Authorisation Grant
 */
router.get("/login", (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

// Called through Spotify Authorisation Flow
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

/**
 * @api {get} /api/spotify/search/:query Search Track
 * @apiName SpotifyTrackSearch
 * @apiGroup Spotify
 * @apiParam {String} query Keyword to search for the songs using Spotify
 * @apiDescription Searches for a track given the query parameter. If no tracks are found, then an error is sent.
 *                  
 * @apiSuccess {Object[]} data The top songs (max 20) matching the query 
 * @apiError SpotifyError Spotify error message
 */
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const response = await spotifyApi.searchTracks(query);
    res.status(200).send(response.body.tracks.items);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

/**
 * @api {get} /api/spotify/resume/:uri Resume Track
 * @apiName SpotifyResumeTrack
 * @apiGroup Spotify
 * @apiParam {String} uri Resume a paused track given the Spotify URI
 * @apiDescription This endpoint resumes a track given its URI
 *                  
 * @apiSuccess {Object} returns the response object from the Spotify call
 * @apiError SpotifyError Spotify error message
 */
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

/**
 * @api {get} /api/spotify/pause Pause Track
 * @apiName SpotifyPauseTrack
 * @apiGroup Spotify
 * @apiDescription This endpoint simply pauses the track that is currently playing
 *                  
 * @apiSuccess {Object} returns the response object from the Spotify call
 * @apiError SpotifyError Spotify error message
 */
router.get("/pause", async (req, res) => {
  try {
    const response = spotifyApi.pause({});
    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

/**
 * @api {get} /api/spotify/volume/:newVolume Set Volume
 * @apiName SpotifySetVolume
 * @apiGroup Spotify
 * @apiParam {Number} newVolume New volume to set Spotify
 * @apiDescription This endpoint resumes a track given its URI
 *                  
 * @apiSuccess {Object} returns the response object from the Spotify call
 * @apiError SpotifyError Spotify error message
 */
router.get("/volume/:newVolume", async (req, res) => {
  try {
    const volume = req.params.newVolume;
    const response = await spotifyApi.setVolume(volume, {});

    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

/**
 * @api {get} /api/spotify/start/:uri Start Track
 * @apiName SpotifyStartTrack
 * @apiGroup Spotify
 * @apiParam {String} uri URI of the song to be played
 * @apiDescription This endpoint plays the track with the given
 *                  
 * @apiSuccess {Object} returns the response object from the Spotify call
 * @apiError SpotifyError Spotify error message
 */
router.get("/start/:uri", async (req, res) => {
  try {
    const response = await spotifyApi.play({ uris: [req.params.uri] });

    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

/**
 * @api {get} /api/spotify/features/:id Get Audio Features
 * @apiName SpotifyAudioFeatures
 * @apiGroup Spotify
 * @apiParam {String} id ID of the track to get audio features from
 * @apiDescription This endpoint gets the audio features of the tracks i.e. acousticness, energy etc.
 *                  
 * @apiSuccess {Object} returns the response object from the Spotify call
 * @apiError SpotifyError Spotify error message
 */
router.get("/features/:id", async (req, res) => {
  try {
    const response = await spotifyApi.getAudioFeaturesForTrack(req.params.id);

    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

/**
 * @api {get} /api/spotify/getCurrent Get Track
 * @apiName SpotifyGetTrack
 * @apiGroup Spotify
 * @apiDescription This endpoint gets the currently playing track on the authorised user
 *                  
 * @apiSuccess {Object} returns the response object from the Spotify call
 * @apiError SpotifyError Spotify error message
 */
router.get("/getCurrent", async (req, res) => {
  try {
    const response = await spotifyApi.getMyCurrentPlayingTrack({});
    res.status(200).send(response);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

/**
 * @api {get} /api/spotify/getMe Get Authorised User
 * @apiName SpotifyAuthorisedUser
 * @apiGroup Spotify
 * @apiDescription This endpoint plays the track with the given
 *                  
 * @apiSuccess {Object} returns the response object from the Spotify call
 * @apiError SpotifyError Spotify error message
 */
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

/**
 * @api {get} /api/spotify/alexa Search & Add Track Alexa
 * @apiName SpotifyAlexaTrack
 * @apiGroup Spotify
 * @apiParam {String} query Keyword to be used to search Spotify
 * @apiDescription This endpoint selects the top track from a search with they input query. Then this result is added to the queue
 *                  
 * @apiSuccess {Object} returns the response object from the Spotify call
 * @apiError SpotifyError Spotify error message
 */
router.post("/alexa", async (req, res) => {
  try {
    const query = req.body.query;
    const response = await spotifyApi.searchTracks(query);

    // if no search results
    if (response.body.tracks.total === 0)
      return res.status(404).send("No songs found");

    const track = response.body.tracks.items[0];
    const songInfo = { songName: track.name, songArtist: track.artists[0].name }
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
    res.send(songInfo).status(200);
  } catch (ex) { res.status(ex.statusCode).send(ex.message); }
});

module.exports = router;
