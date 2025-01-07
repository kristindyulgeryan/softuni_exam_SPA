export class LikesService {
  constructor(baseUrl) {
    this.url = `${baseUrl}/data/likes`;
    this.accessToken = "accessToken";
  }

  getAccessToken() {
    return localStorage.getItem(this.accessToken);
  }

  async getAllForSolution(id) {
    let setting = {
      method: "GET",
    };
    let response = await fetch(
      `${this.url}?where=solutionId%3D%22${id}%22&distinct=_ownerId&count`,
      setting
    );
    if (!response.ok) {
      window.alert("Faild to fetch like");
      return;
    }
    let result = await response.json();
    return result;
  }

  async getAllForSolutionAndUser(solutionId, userId) {
    let setting = {
      method: "GET",
    };
    let response = await fetch(
      `${this.url}?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
      setting
    );
    if (!response.ok) {
      window.alert("Faild to fetch like");
      return;
    }
    let result = await response.json();
    return result;
  }

  async addLike(like) {
    let accessToken = this.getAccessToken();
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(like),
    };
    let response = await fetch(`${this.url}`, settings);
    if (!response.ok) {
      window.alert("Faild to create like");
      return;
    }
    let result = await response.json();
    return result;
  }
}
