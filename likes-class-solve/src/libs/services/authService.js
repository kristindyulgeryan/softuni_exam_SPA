export class AuthService {
  constructor(baseUrl) {
    this.url = `${baseUrl}/users`;
    this.accessToken = "accessToken";
    this.userIdToken = "userId";
  }

  setAccessToken(token) {
    localStorage.setItem(this.accessToken, token);
  }
  setUserId(token) {
    localStorage.setItem(this.userIdToken, token);
  }
  getAccessToken() {
    return localStorage.getItem(this.accessToken);
  }
  getUserId() {
    return localStorage.getItem(this.userIdToken);
  }
  clearAccessToken() {
    localStorage.removeItem(this.accessToken);
  }
  clearUserId() {
    localStorage.removeItem(this.userIdToken);
  }

  isLoggedIn() {
    return localStorage.getItem(this.accessToken) != undefined;
  }

  async login(user) {
    let settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    let response = await fetch(`${this.url}/login`, settings);
    if (!response.ok) {
      window.alert("Login failed");
      return;
    }

    let result = await response.json();
    this.setAccessToken(result.accessToken);
    this.setUserId(result._id);
    return result;
  }

  async register(user) {
    let settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    let response = await fetch(`${this.url}/register`, settings);
    if (!response.ok) {
      window.alert("Register failed");
      return;
    }

    let result = await response.json();
    this.setAccessToken(result.accessToken);
    this.setUserId(result._id);
    return result;
  }
  async logout() {
    let accessToken = this.getAccessToken();
    console.log(accessToken);
    let settings = {
      method: "GET",
      headers: { "X-Authorization": accessToken },
    };

    let response = await fetch(`${this.url}/logout`, settings);
    this.clearAccessToken();
    this.clearUserId();

    return true;
  }
}
