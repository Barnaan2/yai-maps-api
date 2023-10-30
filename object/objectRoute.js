const router = require('express').Router()
const apiKeyMiddleware = require('../auth/apiKeyMiddleware')
const objectController = require('./objectController')
const projectMiddleware = require('../project/projectMiddleware')

router 
.route('/project/:id')
.get(apiKeyMiddleware.verify, projectMiddleware.checkProject,objectController.getObjects)
.post(apiKeyMiddleware.verify, projectMiddleware.checkProject,objectController.createObject)

router
.route('/project/:id/:pk')
.get(apiKeyMiddleware.verify,projectMiddleware.checkProject,objectController.getObject)
.patch(apiKeyMiddleware.verify,projectMiddleware.checkProject,objectController.updateObject)
.delete(apiKeyMiddleware.verify,projectMiddleware.checkProject,objectController.updateObject)

module.exports = router;