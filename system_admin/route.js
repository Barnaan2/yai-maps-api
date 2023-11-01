const router = require('express').Router()
const Controller = require('./controller')
const Middleware = require('./middleware')
const authMiddleware = require('../auth/authMiddleware')


router.route('/users/').get(authMiddleware.protect,Middleware.isAdmin,Controller.getUsers)
router.route('/projects/').get(authMiddleware.protect,Middleware.isAdmin,Controller.getProjects)
router.route('/projects/:id').get(authMiddleware.protect,Middleware.isAdmin,Controller.getProject)

module.exports = router;