import axios from "axios";
import { baseUrl } from "../config/default.json";

const apiUrl = baseUrl;
const apiEndpoint = apiUrl + "/api/songs/";

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
  getSongs,
  addSong,
  deleteSong
}