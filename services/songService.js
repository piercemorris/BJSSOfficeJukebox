import axios from "axios";
import { baseUrlLive, baseUrl } from "../config/default.json";

const apiUrl = (process.env.NODE_ENV === "production" ? baseUrlLive : baseUrl);
const apiEndpoint = apiUrl + "/api/songs/";

const areSongs = (songs) => {
  if (songs === undefined || songs === null || songs.length === 0) {
    return false;
  }
  else {
    return true;
  }
}

const areSongsInQueue = (songs) => {
  if (songs.length === 1)
    return false;
  else {
    return true;
  }
}

export async function getSongs() {
  return await axios.get(apiEndpoint);
}

export async function addSong(song, user, username) {
  return await axios.post(apiEndpoint, { song, requestedBy: user, username });
}

export async function deleteSong(id) {
  return await axios.delete(apiEndpoint + id);
}

export default {
  areSongs,
  areSongsInQueue,
  getSongs,
  addSong,
  deleteSong
}