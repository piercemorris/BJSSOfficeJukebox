const axios = require("axios");
const { spotifyEndpoint } = require("../config/default.json");

export async function search(query) {
  const { data } = await axios.get(spotifyEndpoint + "/search/" + query);
  return data;
}

export async function play(playing) {
  await axios.post(spotifyEndpoint + "/play", { playing });
}

export async function playSong(uri) {
  await axios.post(spotifyEndpoint + "/start", { uri });
}

export async function getCurrentlyPlaying() {
  const { data } = await axios.get(spotifyEndpoint + "/getCurrent");
  const songObject = {
    duration: data.body.item.duration_ms,
    progress: data.body.progress_ms
  };
  return songObject;
}

export default {
  play,
  playSong,
  getCurrentlyPlaying,
  search
}