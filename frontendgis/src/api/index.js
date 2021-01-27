import axios from "axios";

const URL = "http://localhost:5000/api";

export function getAllPoint() {
  return axios.get(URL + "/point");
}
export function getAllLine() {
  return axios.get(URL + "/line");
}
export function getAllPolygon() {
  return axios.get(URL + "/polygon");
}
