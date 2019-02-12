const axios = require("axios");

const spotifyAccessToken = 'x-spotify-token';
const spotifyTrackType = "&type=track";
const spotifySearchEndpoint = "https://api.spotify.com/v1/search?q=";


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
  searchSpotifyQuery,
  getSpotifyAccessToken,
  setSpotifyAccessToken
}