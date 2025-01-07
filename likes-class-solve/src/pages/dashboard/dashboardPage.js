export class DashboardPage {
  constructor(templateFunction, renderHandler, solutionsService) {
    this.templateFunction = templateFunction;
    this.renderHandler = renderHandler;
    this.solutionsService = solutionsService;
    this.showView = this._showView.bind(this);
  }
  async _showView() {
    let solutions = await this.solutionsService.getAll();
    console.log(solutions);
    let template = this.templateFunction(solutions);
    this.renderHandler(template);
  }
}
