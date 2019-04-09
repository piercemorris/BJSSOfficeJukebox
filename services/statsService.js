import axios from "axios";
import { baseUrlLive, baseUrl } from "../config/default.json";

const apiUrl = (process.env.NODE_ENV === "production" ? baseUrlLive : baseUrl);
const apiEndpoint = apiUrl + "/api/stats/";


export async function getStats() {
  return await axios.get(apiEndpoint);
}

export async function addStat(_id,songName, artistName, genre,image,timesAdded) {
  return await axios.post(apiEndpoint, { _id,songName, artistName, genre,image, timesAdded });
}




export default {
  getStats,
  addStat,
}