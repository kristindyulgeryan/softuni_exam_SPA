import { html, page, render } from "../lib.js";
import { getMotorById, updateMotorList } from "../data/motorsList.js";
import { createSubmitHandler } from "../data/user.js";

const editTemplate = (data, onEdit) => html` <section id="edit">
  <h2>Edit Motorcycle</h2>
  <div class="form">
    <h2>Edit Motorcycle</h2>
    <form class="edit-form" @submit=${onEdit} data-id=${data._id}>
      <input
        type="text"
        name="model"
        id="model"
        placeholder="Model"
        .value=${data.model}
      />
      <input
        type="text"
        name="imageUrl"
        id="moto-image"
        placeholder="Moto Image"
        .value=${data.imageUrl || ""}
      />
      <input
        type="number"
        name="year"
        id="year"
        placeholder="Year"
        .value=${data.year || ""}
      />
      <input
        type="number"
        name="mileage"
        id="mileage"
        placeholder="mileage"
        .value=${data.mileage || ""}
      />
      <input
        type="text"
        name="contact"
        id="contact"
        placeholder="contact"
        .value=${data.contact || ""}
      />
      <textarea id="about" name="about" placeholder="about" rows="10" cols="50">
${data.about || ""}</textarea
      >
      <button type="submit">Add Motorcycle</button>
    </form>
  </div>
</section>`;

export async function editView(ctx) {
  const id = ctx.params.id;
  const data = await getMotorById(id);
  console.log(data);
  if (!data) {
    return alert("Motorcycle not found!");
  }
  render(editTemplate(data, createSubmitHandler(onEdit)));

  async function onEdit(
    { model, imageUrl, year, mileage, contact, about },
    form
  ) {
    const id = form.dataset.id;

    if (!model || !imageUrl || !year || !mileage || !contact || !about.trim()) {
      return alert("All fields are required");
    }

    await updateMotorList(id, {
      model,
      imageUrl,
      year,
      mileage,
      contact,
      about,
    });

    page.redirect("/motorcycles/" + id);
  }
}
