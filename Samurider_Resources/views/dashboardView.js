import { getAllMotors } from "../data/motorsList.js";
import { html, render } from "../lib.js";
import { dashboardTemplate } from "./partials/dashboard.js";

const template = (motorsList) => html` <h2>Available Motorcycles</h2>
  <section id="dashboard">
    ${motorsList.length > 0
      ? motorsList.map(dashboardTemplate)
      : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
  </section>`;

export async function dashboardView() {
  const motorsList = (await getAllMotors()) || [];
  render(template(motorsList));
}
