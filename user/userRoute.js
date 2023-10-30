const router = require('express').Router()
const authCtrl = require('../auth/authController')
const UserController = require('./userControllers')
const ApiKeyController = require('../auth/apiKeyController')
const authMiddleware = require('../auth/authMiddleware')
const apiKeyMiddleware = require('../auth/apiKeyMiddleware')

router.route('').get(UserController.getUsers)
router.route('/register').post(authCtrl.register);
router.route('/login').post(authCtrl.login);
router.route('/generate-api-key/').post(authMiddleware.protect,apiKeyMiddleware.verify,ApiKeyController.generateApiKey);



module.exports = router;