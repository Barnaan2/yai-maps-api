const router = require('express').Router()
const authMiddleware = require('../auth/authMiddleware')
const objectController = require('./objectController')
const projectMiddleware = require('../project/projectMiddleware')

//! THE ONLY DIFFERENCE WITH THE OBJECT ROUTE AND THIS ONE IS THAT THIS ROUTE DOES NOT REQUIRE APIKEY.
//! ITS AN ENDPOINT FOR THE CUSTOMER FOR MANIPULATING DATA THROUGH THE GUI.
router 
.route('project/:id')
.get(authMiddleware.protect, projectMiddleware.checkProject,objectController.getObjects)
.post(authMiddleware.protect, projectMiddleware.checkProject,objectController.createObject)

router
.route('/project/:id/:pk')
.get(authMiddleware.protect,projectMiddleware.checkProject,objectController.getObject)
.patch(authMiddleware.protect,projectMiddleware.checkProject,objectController.updateObject)
.delete(authMiddleware.protect,projectMiddleware.checkProject,objectController.updateObject)

module.exports = router;