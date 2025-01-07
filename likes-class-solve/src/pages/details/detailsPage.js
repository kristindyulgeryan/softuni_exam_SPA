export class DetailsPage {
  constructor(
    templateFunction,
    renderHandler,
    navigate,
    solutionsService,
    authService,
    likesService
  ) {
    this.templateFunction = templateFunction;
    this.renderHandler = renderHandler;
    this.navigate = navigate;
    this.solutionsService = solutionsService;
    this.authService = authService;
    this.likesService = likesService;
    this.showView = this._showView.bind(this);
    this.deleteHandler = this._deleteHandler.bind(this);
    this.likesHandler = this._likesHandler.bind(this);
  }
  async _showView(ctx) {
    let id = ctx.params.id;
    let solution = await this.solutionsService.get(id);
    let userId = this.authService.getUserId();
    let isCreator = solution._ownerId === userId;
    let likesCount = await this.likesService.getAllForSolution(id);
    let isLoggedIn = this.authService.isLoggedIn();
    let userLikes = await this.likesService.getAllForSolutionAndUser(
      solution._id,
      userId
    );
    let hasLikes = userLikes > 0;
    let template = this.templateFunction(
      solution,
      isCreator,
      this.deleteHandler,
      likesCount,
      isLoggedIn,
      hasLikes,
      this.likesHandler
    );
    this.renderHandler(template);
  }
  async _deleteHandler(id) {
    let choice = window.confirm("Are you sure you want to delete");
    if (choice) {
      let result = await this.solutionsService.delete(id);
      if (result) {
        this.navigate("/solutions");
      }
    }
  }

  async _likesHandler(solutionId) {
    let like = { solutionId };

    let result = await this.likesService.addLike(like);
    if (result) {
      this.navigate(`/details/${solutionId}`);
    }
  }
}
