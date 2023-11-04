const router = require('express').Router()
const Controller = require('./superUserController')
const Middleware = require('./middleware')
const authMiddleware = require('../auth/authMiddleware')


router.route('/add-admins/:id').post(authMiddleware.protect,Middleware.isSuperUser,Controller.addAdmin)
router.route('/remove-admins/:id').post(authMiddleware.protect,Middleware.isSuperUser,Controller.removeAdmin)


module.exports = router;