import debug from "debug";
import * as usersAPI from "./users-api";

const log = debug("slothitude:utilities:users-service");

export function getToken() {
  // getItem returns null if there's no string
  const tokenObj = localStorage.getItem("token");
  if (!tokenObj) return null;
  // Parse the token object
  let token;
  try {
    token = JSON.parse(tokenObj).token;
  } catch (e) {
    console.error("Error parsing token object:", e);
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }

  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export const signUp = async (userData) => {
  log("userData: %o", userData);

  const tokenObj = await usersAPI.signUp(userData);
  log("tokenObj: %o", tokenObj);

  localStorage.setItem("token", JSON.stringify(tokenObj));
  return getUser();
};

export const logOut = () => {
  localStorage.removeItem("token");
};

export const login = async (email, password) => {
  log("%s,%s", email, password);
  const user = { email, password };

  const tokenObj = await usersAPI.login(user);
  log("tokenObj: %o", tokenObj);

  localStorage.setItem("token", JSON.stringify(tokenObj));
  return getUser();
};

export const checkToken = async () => {
  const dateStr = await usersAPI.checkToken();
  return new Date(dateStr);
};

export const getUsers = async () => {
  return await usersAPI.getUsers();
};
