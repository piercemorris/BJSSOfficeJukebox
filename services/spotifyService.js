const axios = require("axios");
const { baseUrlLive, baseUrl } = require("../config/default.json");

const apiUrl = (process.env.NODE_ENV === "production" ? baseUrlLive : baseUrl);
const apiEndpoint = apiUrl + "/api/spotify/";

export async function search(query) {
  const { data } = await axios.get(apiEndpoint + "/search/" + query);
  return data;
}

export async function play(playing) {
  await axios.get(apiEndpoint + "/play/" + playing ? 1 : 0);
}

export async function playSong(uri) {
  await axios.get(apiEndpoint + "/start/" + uri);
}

export async function getCurrentlyPlaying() {
  const { data } = await axios.get(apiEndpoint + "/getCurrent");
  const songObject = {
    duration: data.body.item.duration_ms,
    progress: data.body.progress_ms
  };
  return songObject;
}

export async function getMeAndDevices() {
  const { data } = await axios.get(apiEndpoint + "/getMe");

  return data;
}

export default {
  play,
  playSong,
  getCurrentlyPlaying,
  getMeAndDevices,
  search
}