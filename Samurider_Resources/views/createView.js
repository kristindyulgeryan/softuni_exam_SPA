import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../data/user.js";
import { createMotorList } from "../data/motorsList.js";

const createTemplate = (onCreate) => html` <section id="create">
  <h2>Add Motorcycle</h2>
  <div class="form">
    <h2>Add Motorcycle</h2>
    <form class="create-form" @submit=${onCreate}>
      <input type="text" name="model" id="model" placeholder="Model" />
      <input
        type="text"
        name="imageUrl"
        id="moto-image"
        placeholder="Moto Image"
      />
      <input type="number" name="year" id="year" placeholder="Year" />
      <input type="number" name="mileage" id="mileage" placeholder="mileage" />
      <input type="text" name="contact" id="contact" placeholder="contact" />
      <textarea
        id="about"
        name="about"
        placeholder="about"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">Add Motorcycle</button>
    </form>
  </div>
</section>`;

export function createView() {
  render(createTemplate(createSubmitHandler(onCreate)));
}
async function onCreate({ model, imageUrl, year, mileage, contact, about }) {
  if (!model || !imageUrl || !year || !mileage || !contact || !about) {
    return alert("All fields are required");
  }

  await createMotorList({ model, imageUrl, year, mileage, contact, about });
  page.redirect("/motorcycles");
}
