import axios from "axios";
import { baseUrl } from "../config/default.json";

const apiUrl = baseUrl;
const apiEndpoint = apiUrl + "/api/users";

export function register(user) {
  return axios.post(apiEndpoint, user);
}