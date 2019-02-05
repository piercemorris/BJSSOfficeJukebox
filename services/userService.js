import axios from "axios";
import jwtDecode from "jwt-decode";
import { baseUrl } from "../config/default.json";

const apiUrl = baseUrl;
const apiEndpoint = apiUrl + "/api/users";

export function register(user) {
  return axios.post(apiEndpoint, user);
}

export async function login(user) {
  const { data: jwt } = await axios.post(apiEndpoint + "/login", user);
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem('token');
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
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
  getCurrentUser
}