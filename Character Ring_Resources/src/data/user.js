import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
  login: `/users/login`,
  logout: `/users/logout`,
  register: `/users/register`,
};

export async function login(email, password) {
  const result = await post(endpoints.login, { email, password });

  setUserData({
    _id: result._id,
    email: result.email,
    accessToken: result.accessToken,
  });
}
export async function register(email, password) {
  const result = await post(endpoints.register, { email, password });

  setUserData({
    _id: result._id,
    email: result.email,
    accessToken: result.accessToken,
  });
}

export async function logout() {
  const promise = get(endpoints.logout);
  clearUserData();
  await promise;
}

export function createSubmitHandler(callback) {
  return function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    callback(data, event.target);
  };
}
