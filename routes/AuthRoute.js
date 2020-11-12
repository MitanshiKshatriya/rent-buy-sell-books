  
const express = require('express')

const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.get('/login',AuthController.getLogin)
router.get('/logout',AuthController.logout)
router.get('/register',AuthController.getRegister)

module.exports = router