import { getAllItems } from "../data/dashboardApi.js";

import { html, render } from "../lib.js";
import { dashboardTemplate } from "./partials/dashboard.js";

const template = (itemList) => html` <h2>Fun Facts</h2>
  <section id="dashboard">
    ${itemList.length > 0
      ? itemList.map(dashboardTemplate)
      : html`<h2>No Fun Facts yet.</h2>`}
  </section>`;

export async function dashboardView() {
  const itemList = (await getAllItems()) || [];
  render(template(itemList));
}
