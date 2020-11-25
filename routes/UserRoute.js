const express = require('express')
const router =express.Router()
const authenticate = require('../middleware/authenticate')
const UserController = require('../controllers/UserController')

router.post('/signup',UserController.signup)
router.get('/index',UserController.index)
router.get('/dashboard',authenticate,UserController.dashboard)
router.post('/sendmail',authenticate,UserController.sendmail)

module.exports = router;