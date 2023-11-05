const router = require("express").Router();
const authMiddleware = require("../auth/authMiddleware");
const objectController = require("./objectController");
const projectMiddleware = require("../project/projectMiddleware");

//! THE ONLY DIFFERENCE WITH THE OBJECT ROUTE AND THIS ONE IS THAT THIS ROUTE DOES NOT REQUIRE APIKEY.

router
  .route("/project/:id/")
  .get(
    authMiddleware.protect,
    projectMiddleware.checkProject,
    objectController.getObjects
  )
  .post(
    authMiddleware.protect,
    projectMiddleware.checkProject,
    objectController.createObject
  );

router
  .route("/project/:id/:pk/")
  .get(
    authMiddleware.protect,
    projectMiddleware.checkProject,
    objectController.getObject
  )
  .patch(
    authMiddleware.protect,
    projectMiddleware.checkProject,
    objectController.updateObject
  )
  .delete(
    authMiddleware.protect,
    projectMiddleware.checkProject,
    objectController.deleteObject
  );

//! ITS AN ENDPOINT FOR THE CUSTOMER FOR MANIPULATING DATA THROUGH THE GUI.
router
  .route("/project/:id/distance/:latlng/")
  .get(
    authMiddleware.protect,
    projectMiddleware.checkProject,
    objectController.getDistances
  );
router
  .route("/project/:id/objects-within/:distance/center/:latlng/:unit")
  .get(
    authMiddleware.protect,
    projectMiddleware.checkProject,
    objectController.getObjectsWithin
  );
// objects-within/433/center/-40,45/unit/mi
module.exports = router;
