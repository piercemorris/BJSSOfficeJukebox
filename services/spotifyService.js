const axios = require("axios");
const { baseUrlLive, baseUrl } = require("../config/default.json");

const apiUrl = (process.env.NODE_ENV === "production" ? baseUrlLive : baseUrl);
const apiEndpoint = apiUrl + "/api/spotify/";

export async function search(query) {
  const { data } = await axios.get(apiEndpoint + "/search/" + query);
  return data;
}

export async function resume(uri) {
  return await axios.get(apiEndpoint + "/resume/" + uri);
}

export async function pause() {
  return await axios.get(apiEndpoint + "/pause/");
}

export async function playSong(uri) {
  await axios.get(apiEndpoint + "/start/" + uri);
}

export async function updatePlayVolume(volume) {
  await axios.get(apiEndpoint + "/Volume/" + volume);
}

export async function updatePlaybackPoistion(newTime) {
  await axios.get(apiEndpoint + "/time/" + newTime);
}

export async function getCurrentlyPlayingVerbose() {
  const { data } = await axios.get(apiEndpoint + "/getCurrent");
  return data;
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
  resume,
  pause,
  playSong,
  updatePlayVolume,
  updatePlaybackPoistion,
  getCurrentlyPlaying,
  getCurrentlyPlayingVerbose,
  getMeAndDevices,
  search
}