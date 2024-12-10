import { deleteItemList, getItemById } from "../data/dashboardApi.js";
import { getLikesByItemId, likeItem } from "../data/likes.js";

import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  data,
  likes,
  hasUser,
  hasLiked,
  isOwner,
  onLike,
  onDelete
) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${data.imageUrl} alt="example1" />
    <p id="details-category">${data.category}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p id="description">${data.description}</p>
        <p id="more-info">${data.moreInfo}</p>
      </div>

      <h3>Likes:<span id="likes">${likes}</span></h3>

      ${hasUser
        ? html` <div id="action-buttons">
            ${isOwner
              ? html` <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                  <a
                    href="javascript:void(0)"
                    id="delete-btn"
                    @click=${onDelete}
                    >Delete</a
                  >`
              : null}
            ${hasLiked
              ? null
              : html`<a href="javascript:void(0)" id="like-btn" @click=${onLike}
                  >Like</a
                >`}
          </div>`
        : null}
    </div>
  </div>
</section>`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const [data, likesInfo] = await Promise.all([
    getItemById(id),
    getLikesByItemId(id),
  ]);
  console.log(likesInfo);
  const userData = getUserData();
  const isOwner = userData?._id == data._ownerId;
  const hasLiked = likesInfo.hasLiked || isOwner;
  render(
    detailsTemplate(
      data,
      likesInfo.likes,
      Boolean(userData),
      hasLiked,
      isOwner,
      onLike,
      onDelete
    )
  );

  async function onLike() {
    await likeItem(id);
    page.redirect("/dashboard/" + id);
  }
  async function onDelete() {
    const choice = confirm("Are you sure?");
    if (!choice) {
      return;
    }
    await deleteItemList(id);
    page.redirect("/dashboard");
  }
}
