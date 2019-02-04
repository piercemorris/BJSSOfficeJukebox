import axios from "axios";
import { baseUrl } from "../config/default.json";

const apiUrl = baseUrl;
const apiEndpoint = apiUrl + "/api/users";

export function register(user) {
  return axios.post(apiEndpoint, user);
}

export function login(user) {
  return axios.post(apiEndpoint + "/login", user);
}