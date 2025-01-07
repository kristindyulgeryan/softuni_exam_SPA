import { html } from "../../../node_modules/lit-html/lit-html.js";

export const editSolutionTemplate = (solution, editSolutionHandler) =>
  html`
    <section id="edit">
      <div class="form">
        <img class="border" src="./images/border.png" alt="" />
        <h2>Edit Solution</h2>
        <form class="edit-form" @submit=${editSolutionHandler}>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Solution Type"
            .value=${solution.type}
          />
          <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
            .value=${solution.imageUrl}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            .value=${solution.description}
            rows="2"
            cols="10"
          ></textarea>
          <textarea
            id="more-info"
            name="more-info"
            placeholder="more Info"
            .value=${solution.learnMore}
            rows="2"
            cols="10"
          ></textarea>
          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  `;
