// import { logout } from "./data/user.js";
// import { page } from "./lib.js";
// import { updateNav } from "./util.js";
// import { createView } from "./views/createView.js";
// import { dashboardView } from "./views/dashboardView.js";
// import { detailsView } from "./views/detailsView.js";
// import { editView } from "./views/editView.js";
// import { homeView } from "./views/homeView.js";
// import { loginView } from "./views/loginView.js";
// import { registerView } from "./views/registerView.js";
// import { searchView } from "./views/searchView.js";

import { logout } from "./data/user.js";
import { page } from "./lib.js";
import { updateNav } from "./util.js";
import { createView } from "./views/createView.js";
import { dashboardView } from "./views/dashboardView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";

// updateNav();
updateNav();
// page("/", homeView);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/dashboard", dashboardView);
page("/dashboard/:id", detailsView);
page("/create", createView);
page("/edit/:id", editView);

// page("/login", loginView);
// page("/register", registerView);
// page("/motorcycles", dashboardView);
// page("/create", createView);
// page("/motorcycles/:id", detailsView);
// page("/edit/:id", editView);
// page("/search", searchView);
// page.start();
page.start();

document.getElementById("logoutLink").addEventListener("click", () => {
  logout();
  updateNav();
  page.redirect("/");
});