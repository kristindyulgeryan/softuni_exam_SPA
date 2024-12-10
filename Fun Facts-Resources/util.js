export function setUserData(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function getUserData() {
  return JSON.parse(localStorage.getItem("user"));
}

export function clearUserData() {
  localStorage.removeItem("user");
}

export function updateNav() {
  const userData = getUserData();
  if (userData) {
    document.querySelector(".user").style.display = "block";
    document.querySelector(".guest").style.display = "none";
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "block";
  }
}
