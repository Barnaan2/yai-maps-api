const router = require('express').Router()
const authMiddleware = require('../auth/authMiddleware')
const projectController = require('./projectController')
const projectMiddleware = require('./projectMiddleware')


router
.route('/')
.get(authMiddleware.protect,projectController.getProjects)
.post(authMiddleware.protect,projectController.createProject)



router
.route('/:id')
.get(authMiddleware.protect, projectMiddleware.checkProject,projectController.getProject)
.patch(authMiddleware.protect, projectMiddleware.checkProject,projectController.updateProject)
.delete(authMiddleware.protect, projectMiddleware.checkProject,projectController.deleteProject)
//getting all the project of the customer



module.exports = router;