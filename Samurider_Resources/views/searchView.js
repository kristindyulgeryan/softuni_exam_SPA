import { searchByQuery } from "../data/motorsList.js";
import { createSubmitHandler } from "../data/user.js";
import { html, render } from "../lib.js";
const searchTemplate = (onSearch, results) => html`<section id="search">
  <div class="form">
    <h4>Search</h4>
    <form class="search-form" @submit=${onSearch}>
      <input type="text" name="search" id="search-input" />
      <button class="button-list">Search</button>
    </form>
  </div>
  <h4 id="result-heading">Results:</h4>
  ${results ? searchResultTemplate(results) : null}
</section>`;

const searchResultTemplate = (results) => html` <div class="search-result">
  ${results.length > 0
    ? results.map(
        (result) => html`<div class="motorcycle">
          <img src=${result.imageUrl} alt="example1" />
          <h3 class="model">${result.model}</h3>
          <a class="details-btn" href="/motorcycles/${result._id}">More Info</a>
        </div>`
      )
    : html`<h2 class="no-avaliable">No result.</h2>`}
</div>`;

export function searchView() {
  render(searchTemplate(createSubmitHandler(onSearch), []));

  async function onSearch(data, form) {
    const { search } = data;
    const result = await searchByQuery(search);
    const handler = createSubmitHandler(onSearch);
    searchView(onSearch, result);
    render(searchTemplate(handler, result));
  }
}
