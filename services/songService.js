import axios from "axios";
import { baseUrl } from "../config/default.json";

const apiUrl = baseUrl;
const apiEndpoint = apiUrl + "/api/songs";

export function getSongs() {
  //
}

export async function addSong(song, user, username) {
  return await axios.post(apiEndpoint, { song, requestedBy: user, username });
}

export default {
  getSongs,
  addSong
}