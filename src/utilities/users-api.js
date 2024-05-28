// neater version, the below is messy original version
// import debug from "debug";
import sendRequest from "./send-request";

const BASE_URL = "/api/users";

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

// import debug from "debug";

// This is the base path of the Express route we'll define
// const BASE_URL = "/api/users";
// const log = debug("mern:utilities:users-api");

// export async function signUp(userData) {
//   log("userData: %o", userData);
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });

//   if (res.ok) {
//     return res.json();
//   } else {
//     log("error: Invalid Sign Up");
//     throw new Error("Invalid Sign Up");
//   }
// }

// export async function login(userData) {
//   log("userData: %o", userData);
//   const res = await fetch(`${BASE_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });

//   if (res.ok) {
//     return res.json();
//   } else {
//     log("error: Invalid Login");
//     throw new Error("Invalid Login");
//   }
// }
