import { html, page, render } from "../lib.js";

import { getItemById, updateItemList } from "../data/dashboardApi.js";
import { createSubmitHandler } from "../data/user.js";

const editTemplate = (data, onEdit) => html`<section id="edit">
  <div class="form">
    <h2>Edit Fact</h2>
    <form class="edit-form" @submit=${onEdit} data-id=${data._id}>
      <input
        type="text"
        name="category"
        id="category"
        placeholder="Category"
        .value=${data.category}
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        .value=${data.imageUrl}
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      >
${data.description}</textarea
      >
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
      >
${data.moreInfo}</textarea
      >
      <button type="submit">Post</button>
    </form>
  </div>
</section>`;

export async function editView(ctx) {
  const id = ctx.params.id;
  const data = await getItemById(id);
  console.log(data);
  if (!data) {
    return alert("Item not found!");
  }
  render(editTemplate(data, createSubmitHandler(onEdit)));

  async function onEdit(
    {
      category,
      "image-url": imageUrl,
      description,
      "additional-info": moreInfo,
    },
    form
  ) {
    if (!category || !imageUrl || !description || !moreInfo) {
      return alert("All fields are required");
    }

    await updateItemList(id, {
      category,
      imageUrl,
      description,
      moreInfo,
    });

    page.redirect("/dashboard/" + id);
  }
}
