import axios from "axios";
import jwtDecode from "jwt-decode";
import { baseUrl } from "../config/default.json";

const apiUrl = baseUrl;
const apiEndpoint = apiUrl + "/api/users";
const tokenKey = "token";

export function register(user) {
  return axios.post(apiEndpoint, user);
}

export async function login(user) {
  const { data: jwt } = await axios.post(apiEndpoint + "/login", user);
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export async function getInfo(id) {
  return await axios.get(apiEndpoint + "/" + id);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  }
  catch (ex) {
    return null;
  }
}

export default {
  register,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getInfo
}