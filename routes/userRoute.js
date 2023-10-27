const router = require('express').Router()
const authCtrl = require('../controllers/authController')
const UserController = require('../controllers/userControllers')


router.route('').get(UserController.getUsers)
router.route('/register').post(authCtrl.register);
router.route('/login').post(authCtrl.login);

module.exports = router;