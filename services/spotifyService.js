const SpotifyWebApi = require('spotify-web-api-js');
const axios = require("axios");

const spotifyEndpoint = process.env.FRONTEND_URL || "http://localhost:3000";

const spotifyAccessToken = 'x-spotify-token';
const spotifyTrackType = "&type=track";
const spotifySearchEndpoint = "https://api.spotify.com/v1/search?q=";

const spotify = new SpotifyWebApi();

const setToken = (token) => {
  spotify.setAccessToken(token);
}

const startMusic = (uri) => {
  spotify.play({ "uris": [uri] });
}

const playMusic = () => {
  spotify.play({});
}

//Checks if music is currently playing or paused, then does the opposite
const playPauseMusic = () => {
  spotify.getMyCurrentPlaybackState({}, (err, data) => {
    data.is_playing ? spotify.pause({}) : spotify.play({})
  });
}

export async function search(query) {
  const { data } = await axios.get(spotifyEndpoint + "/api/spotify/search/" + query);
  return data;
}

//searches for tracks with query provided a valid access token is available
export async function searchSpotifyQuery(query, token) {
  const endpoint = spotifySearchEndpoint + query + spotifyTrackType;
  const response = await axios.get(endpoint, {
    headers: { Authorization: "Bearer " + token }
  });

  return response.data;
}

export function setSpotifyAccessToken(token) {
  localStorage.setItem(spotifyAccessToken, token);
}

export function getSpotifyAccessToken() {
  try {
    const currentToken = localStorage.getItem(spotifyAccessToken);
    if (currentToken === undefined || currentToken === "undefined") {
      localStorage.removeItem(spotifyAccessToken);
      return null;
    }
    else {
      return currentToken;
    }
  }
  catch (ex) {

  }
}

export default {
  Client: spotify,
  search,
  startMusic,
  playMusic,
  playPauseMusic,
  searchSpotifyQuery,
  getSpotifyAccessToken,
  setSpotifyAccessToken,
  setToken
}