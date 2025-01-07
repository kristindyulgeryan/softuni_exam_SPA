export class RegisterPage {
  constructor(templateFunction, renderHandler, navigate, authService) {
    this.templateFunction = templateFunction;
    this.renderHandler = renderHandler;
    this.navigate = navigate;
    this.authService = authService;
    this.showView = this._showView.bind(this);
    this.registerHandler = this._registerHandler.bind(this);
  }
  _showView() {
    let template = this.templateFunction(this.registerHandler);
    this.renderHandler(template);
  }
  async _registerHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("re-password");

    if (!email || !password || password !== rePass) {
      window.alert("Fields are required");
      return;
    }

    let user = { email, password };
    let result = await this.authService.register(user);
    if (result) {
      this.navigate("/");
    }
  }
}
