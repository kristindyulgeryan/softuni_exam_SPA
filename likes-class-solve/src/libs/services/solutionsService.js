import { detailsTemplate } from "../../pages/details/detailsTemplate.js";

export class SolutionsService {
  constructor(baseUrl) {
    this.url = `${baseUrl}/data/solutions`;
    this.accessToken = "accessToken";
  }
  getAccessToken() {
    return localStorage.getItem(this.accessToken);
  }
  async getAll() {
    let settings = {
      method: "GET",
    };
    let response = await fetch(
      `${this.url}?sortBy=_createdOn%20desc`,
      settings
    );
    let result = await response.json();
    return result;
  }
  async get(id) {
    let settings = {
      method: "GET",
    };
    let response = await fetch(`${this.url}/${id}`, settings);

    let result = await response.json();
    return result;
  }

  async addSolution(solution) {
    let accessToken = this.getAccessToken();
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(solution),
    };
    let response = await fetch(`${this.url}`, settings);
    if (!response.ok) {
      window.alert("Add solution failed");
      return;
    }

    let result = await response.json();
    return result;
  }
  async editSolution(id, solution) {
    let accessToken = this.getAccessToken();
    let settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(solution),
    };
    let response = await fetch(`${this.url}/${id}`, settings);
    if (!response.ok) {
      window.alert("Edit solution failed");
      return;
    }

    let result = await response.json();
    return result;
  }
  async delete(id) {
    let accessToken = this.getAccessToken();
    let settings = {
      method: "Delete",
      headers: {
        "X-Authorization": accessToken,
      },
    };
    let response = await fetch(`${this.url}/${id}`, settings);
    if (!response.ok) {
      window.alert("Delete solution failed");
      return;
    }

    let result = await response.json();
    return result;
  }
}
