import { getUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
  like: `/data/likes`,
  likesByItemId: (id) =>
    `/data/likes?where=factId%3D%22${id}%22&distinct=_ownerId&count`,
  likesByUserId: (factId, userId) =>
    `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function likeItem(factId) {
  return post(endpoints.like, { factId });
}

export async function getLikesByItemId(factId) {
  const userData = getUserData();
  const requests = [get(endpoints.likesByItemId(factId))];
  if (userData) {
    requests.push(get(endpoints.likesByUserId(factId, userData._id)));
  }

  const [likes, hasLiked] = await Promise.all(requests);
  return {
    likes,
    hasLiked: Boolean(hasLiked),
  };
}
