const express = require('express')
const router =express.Router()
const authenticate = require('../middleware/authenticate')
const UserController = require('../controllers/UserController')


router.get('/index',UserController.index)
router.get('/dashboard',authenticate,UserController.dashboard)
router.post('/sendmail',authenticate,UserController.sendmail)
router.post('/delete',authenticate,UserController.delete_book)
router.get('/edit',authenticate,UserController.get_edit_book)
router.post('/edit',authenticate,UserController.post_edit_book)
module.exports = router;