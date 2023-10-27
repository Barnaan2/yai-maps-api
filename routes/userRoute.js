const router = require('express').Router()
const routes = require('../controllers/userControllers')




router.route('/').get(routes.getUsers)

module.exports = router;