import debug from "debug";
import * as usersAPI from "./users-api";

const log = debug("slothitude:utilities:users-service");

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    log("No token found in localStorage.");
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(atob(token.split(".")[1]));
    log("Decoded payload: %o", payload);
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export const signUp = async (userData) => {
  log("userData: %o", userData);

  const response = await usersAPI.signUp(userData);
  log("server response: %o", response);

  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);
    return getUser();
  } else {
    console.error("No token in server response.");
    log("Complete server response: %o", response);
    return null;
  }
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const login = async (email, password) => {
  log("%s,%s", email, password);
  const user = { email, password };

  const response = await usersAPI.login(user);
  log("server response: %o", response);

  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);
    return getUser();
  } else {
    console.error("No token in server response.");
    log("Complete server response: %o", response);
    return null;
  }
};

export const checkToken = async () => {
  const dateStr = await usersAPI.checkToken();
  return new Date(dateStr);
};

export const getUsers = async () => {
  return await usersAPI.getUsers();
};
