const router = require('express').Router()
const apiKeyMiddleware = require('../auth/apiKeyMiddleware')
const objectController = require('./objectController')
const projectMiddleware = require('../project/projectMiddleware')

router.route('/project/:id/distance/:latlng/:unit').get(apiKeyMiddleware.verify, projectMiddleware.checkProject,objectController.getDistances)
router.route('/project/:id/objects-within/:distance/center/:latlng/:unit').get(apiKeyMiddleware.verify, projectMiddleware.checkProject,objectController.getObjectsWithin)
// objects-within/433/center/-40,45/unit/mi
router 
.route('/project/:id')
.get(apiKeyMiddleware.verify, projectMiddleware.checkProject,objectController.getObjects)
.post(apiKeyMiddleware.verify, projectMiddleware.checkProject,objectController.createObject)

router
.route('/project/:id/:pk')
.get(apiKeyMiddleware.verify,projectMiddleware.checkProject,objectController.getObject)
.patch(apiKeyMiddleware.verify,projectMiddleware.checkProject,objectController.updateObject)
.delete(apiKeyMiddleware.verify,projectMiddleware.checkProject,objectController.deleteObject)

module.exports = router;