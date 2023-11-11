const router = require("express").Router();
const apiKeyMiddleware = require("../auth/apiKeyMiddleware");
const projectController = require("./projectController");
const projectMiddleware = require("./projectMiddleware");

router
  .route("/:id")
  .get(
    apiKeyMiddleware.verify,
    projectMiddleware.checkProject,
    projectController.getProject
  )
  .patch(
    apiKeyMiddleware.verify,
    projectMiddleware.checkProject,
    projectController.updateProject
  )
  .delete(
    apiKeyMiddleware.verify,
    projectMiddleware.checkProject,
    projectController.deleteProject
  );
//getting all the project of the customer

router
  .route("/")
  .get(apiKeyMiddleware.verify, projectController.getProjects)
  .post(apiKeyMiddleware.verify, projectController.createProject);

module.exports = router;
