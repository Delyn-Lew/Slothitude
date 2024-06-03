import sendRequest from "./send-request";

const BASE_URL = "/api/classes";

export function fetchClasses() {
  return sendRequest(BASE_URL);
}

export function fetchClassById(classId) {
  return sendRequest(`${BASE_URL}/${classId}`);
}

export function createClass(classData) {
  return sendRequest(BASE_URL, "POST", classData);
}

export function updateClass(classId, classData) {
  return sendRequest(`${BASE_URL}/${classId}`, "PUT", classData);
}

export function deleteClass(classId) {
  return sendRequest(`${BASE_URL}/${classId}`, "DELETE");
}
