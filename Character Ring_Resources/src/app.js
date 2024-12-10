import { createView } from "./create.js";
import { logout } from "./data/user.js";
import { detailsView } from "./details.js";
import { page } from "./lib.js";
import { loginView } from "./login.js";
import { registerView } from "./register.js";
import { updateNav } from "./util.js";
import { catalogView } from "./views/catalogView.js";
import { homeView } from "./views/homeView.js";

updateNav();
page("/", homeView);
page("/catalog", catalogView);
page("/catalog/:id", detailsView);
page("/login", loginView);
page("/register", registerView);
page("/create", createView);

page.start();

document.getElementById("logoutLink").addEventListener("click", () => {
  logout();
  updateNav();
  page.redirect("/");
});
