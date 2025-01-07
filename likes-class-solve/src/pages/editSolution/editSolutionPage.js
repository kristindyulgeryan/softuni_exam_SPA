export class EditSolutionPage {
  constructor(templateFunction, renderHandler, navigate, solutionsService) {
    this.templateFunction = templateFunction;
    this.renderHandler = renderHandler;
    this.navigate = navigate;
    this.solutionsService = solutionsService;
    this.showView = this._showView.bind(this);
    this.editSolutionHandler = this._editSolutionHandler.bind(this);
    this.id = undefined;
  }
  async _showView(ctx) {
    let id = ctx.params.id;
    this.id = id;
    let solution = await this.solutionsService.get(id);
    let template = this.templateFunction(solution, this.editSolutionHandler);
    this.renderHandler(template);
  }
  async _editSolutionHandler(e) {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let type = formdata.get("type");
    let imageUrl = formdata.get("image-url");
    let description = formdata.get("description");
    let learnMore = formdata.get("more-info");

    if (!type || !imageUrl || !description || !learnMore) {
      window.alert("Please fill in the fields");
      return;
    }
    let editSolution = { type, imageUrl, description, learnMore };
    let result = await this.solutionsService.editSolution(
      this.id,
      editSolution
    );

    if (result) {
      this.navigate(`/details/${this.id}`);
    }
  }
}
