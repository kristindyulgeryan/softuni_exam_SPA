import page from "../node_modules/page/page.mjs";
import { createRenderHandler } from "./libs/renderer.js";
import { AuthService } from "./libs/services/authService.js";
import { LikesService } from "./libs/services/likesService.js";
import { SolutionsService } from "./libs/services/solutionsService.js";
import { NavElement } from "./nav/navElement.js";
import { navTemplate } from "./nav/navTemplate.js";
import { AddSolutionPage } from "./pages/addSolution/addSolutionPage.js";
import { addSolutionsTemplate } from "./pages/addSolution/addSolutionTemplate.js";
import { DashboardPage } from "./pages/dashboard/dashboardPage.js";
import { dahsboardTemplate } from "./pages/dashboard/dashboardTemplate.js";
import { DetailsPage } from "./pages/details/detailsPage.js";
import { detailsTemplate } from "./pages/details/detailsTemplate.js";
import { EditSolutionPage } from "./pages/editSolution/editSolutionPage.js";
import { editSolutionTemplate } from "./pages/editSolution/editSolutionTemplate.js";
import { HomePage } from "./pages/home/homePage.js";
import { homeTemplate } from "./pages/home/homeTemplate.js";
import { LoginPage } from "./pages/login/loginPage.js";
import { loginTemplate } from "./pages/login/loginTemplate.js";
import { RegisterPage } from "./pages/register/registerPage.js";
import { registerTemplate } from "./pages/register/registerTemplate.js";

let serverUrl = `http://localhost:3030`;
let mainElement = document.querySelector("#wrapper main");
let navDomElement = document.querySelector("#wrapper nav");

let mainrenderHandler = createRenderHandler(mainElement);
let navRenderHandler = createRenderHandler(navDomElement);

let authService = new AuthService(serverUrl);
let solutionsService = new SolutionsService(serverUrl);
let likesService = new LikesService(serverUrl);

let homePage = new HomePage(homeTemplate, mainrenderHandler);
let navElement = new NavElement(
  navTemplate,
  navRenderHandler,
  page.show,
  authService
);
let loginPage = new LoginPage(
  loginTemplate,
  mainrenderHandler,
  page.show,
  authService
);

let registerPage = new RegisterPage(
  registerTemplate,
  mainrenderHandler,
  page.show,
  authService
);

let dashboardPage = new DashboardPage(
  dahsboardTemplate,
  mainrenderHandler,
  solutionsService
);

let addSolutionPage = new AddSolutionPage(
  addSolutionsTemplate,
  mainrenderHandler,
  page.show,
  solutionsService
);
let detailsPage = new DetailsPage(
  detailsTemplate,
  mainrenderHandler,
  page.show,
  solutionsService,
  authService,
  likesService
);
let editSolutionPage = new EditSolutionPage(
  editSolutionTemplate,
  mainrenderHandler,
  page.show,
  solutionsService
);

page(navElement.showView);
page("index.html", "/");
page("/", homePage.showView);
page("/login", loginPage.showView);
page("/register", registerPage.showView);
page("/solutions", dashboardPage.showView);
page("/addSolution", addSolutionPage.showView);
page("/details/:id", detailsPage.showView);
page("/edit/:id", editSolutionPage.showView);
page.start();
