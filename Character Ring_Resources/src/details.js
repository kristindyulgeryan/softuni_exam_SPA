import { html, page, render } from "./lib.js";
import { createSubmitHandler, register } from "./data/user.js";
import { updateNav } from "./util.js";
import { createCharacter, getCharacterById } from "./data/characters.js";

const detailsTemplate = (data, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${data.imageUrl} alt="example1" />
      <div>
        <p id="details-category">${data.category}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${data.description}</p>
            <p id="more-info">${data.moreInfo}</p>
          </div>
        </div>
        <h3>Is This Useful:<span id="likes">0</span></h3>

        <div id="action-buttons">
          <a href="/edit/${data._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
            >Delete</a
          >

          <a href="javascript:void(0)" id="like-btn">Like</a>
        </div>
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const data = await getCharacterById(id);
  render(detailsTemplate(data));
}
