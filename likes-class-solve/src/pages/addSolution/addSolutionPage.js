export class AddSolutionPage {
  constructor(templateFunction, renderHandler, navigate, solutionsService) {
    this.templateFunction = templateFunction;
    this.renderHandler = renderHandler;
    this.navigate = navigate;
    this.solutionsService = solutionsService;
    this.showView = this._showView.bind(this);
    this.addSolutionHandler = this._addSolutionHandler.bind(this);
  }
  async _showView() {
    let template = this.templateFunction(this.addSolutionHandler);
    this.renderHandler(template);
  }
  async _addSolutionHandler(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let type = formData.get("type");
    let imageUrl = formData.get("image-url");
    let description = formData.get("description");
    let learnMore = formData.get("more-info");

    if (!type || !imageUrl || !description || !learnMore) {
      window.alert("All feilads are required");
      return;
    }
    let solution = {
      type,
      imageUrl,
      description,
      learnMore,
    };

    let result = await this.solutionsService.addSolution(solution);
    if (result) {
      this.navigate("/solutions");
    }
  }
}
