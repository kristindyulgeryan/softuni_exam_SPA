import { del, get, post, put } from "./api.js";

const endpoints = {
  catalog: `/data/facts?sortBy=_createdOn%20desc`,
  itemById: `/data/facts/`,
  items: `/data/facts`,
};

export async function getAllItems() {
  return get(endpoints.catalog);
}
export async function getItemById(id) {
  return get(endpoints.itemById + id);
}
export async function createItemList({
  category,
  imageUrl,
  description,
  moreInfo,
}) {
  return post(endpoints.items, {
    category,
    imageUrl,
    description,
    moreInfo,
  });
}
export async function updateItemList(id, itemData) {
  return put(endpoints.itemById + id, itemData);
}
export async function deleteItemList(id) {
  return del(endpoints.itemById + id);
}
export async function searchByQuery(query) {
  return get(endpoints.searchList(query));
}
