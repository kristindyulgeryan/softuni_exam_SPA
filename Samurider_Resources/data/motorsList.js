import { del, get, post, put } from "./api.js";

const endpoints = {
  catalog: `/data/motorcycles?sortBy=_createdOn%20desc`,
  motorById: `/data/motorcycles/`,
  motors: `/data/motorcycles`,
  searchList: (query) =>
    `/data/motorcycles?where=model%20LIKE%20%22${query}%22`,
};

export async function getAllMotors() {
  return get(endpoints.catalog);
}
export async function getMotorById(id) {
  return get(endpoints.motorById + id);
}
export async function createMotorList({
  model,
  imageUrl,
  year,
  mileage,
  contact,
  about,
}) {
  return post(endpoints.motors, {
    model,
    imageUrl,
    year,
    mileage,
    contact,
    about,
  });
}
export async function updateMotorList(id, motorData) {
  return put(endpoints.motorById + id, motorData);
}
export async function deleteMotorList(id) {
  return del(endpoints.motorById + id);
}
export async function searchByQuery(query) {
  return get(endpoints.searchList(query));
}
