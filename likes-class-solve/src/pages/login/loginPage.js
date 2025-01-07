export class LoginPage {
  constructor(templateFunction, renderHandler, navigate, authService) {
    this.templateFunction = templateFunction;
    this.renderHandler = renderHandler;
    this.navigate = navigate;
    this.authService = authService;
    this.showView = this._showView.bind(this);
    this.loginHandler = this._loginHandler.bind(this);
  }
  _showView() {
    let template = this.templateFunction(this.loginHandler);
    this.renderHandler(template);
  }
  async _loginHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");

    if (!email || !password) {
      window.alert("Fields are required");
      return;
    }

    let user = { email, password };
    let result = await this.authService.login(user);
    if (result) {
      this.navigate("/");
    }
  }
}
