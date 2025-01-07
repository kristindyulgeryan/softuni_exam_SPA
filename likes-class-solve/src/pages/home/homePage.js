export class HomePage {
  constructor(templateFunction, renderHandler) {
    this.templateFunction = templateFunction;
    this.renderHandler = renderHandler;
    this.showView = this._showView.bind(this);
  }
  _showView() {
    let template = this.templateFunction();
    this.renderHandler(template);
  }
}
