import { html } from "../../lib.js";

export const dashboardTemplate = (data) => html`<div class="fact">
  <img src=${data.imageUrl} alt="example1" />
  <h3 class="category">${data.category}</h3>
  <p class="description">${data.description}</p>
  <a class="details-btn" href="/dashboard/${data._id}">More Info</a>
</div>`;
