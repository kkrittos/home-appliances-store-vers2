const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleWare')

router.post('/registration', userController.registartion)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router