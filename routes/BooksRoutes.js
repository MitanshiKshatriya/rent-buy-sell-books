const express = require('express')
const router = express.Router()

const BookController = require('../controllers/BooksController')

const authenticate = require('../middleware/authenticate')

router.get('/sell',authenticate,BookController.getSell)
router.post('/sell',authenticate,BookController.sell)

module.exports = router