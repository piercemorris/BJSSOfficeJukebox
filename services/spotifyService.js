const SpotifyWebApi = require('spotify-web-api-js');
const axios = require("axios");

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

const pauseMusic = () => {
  spotify.pause({});
}

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
  startMusic,
  playMusic,
  pauseMusic,
  searchSpotifyQuery,
  getSpotifyAccessToken,
  setSpotifyAccessToken,
  setToken
}