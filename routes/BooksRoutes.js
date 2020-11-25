const express = require('express')
const router = express.Router()

const BookController = require('../controllers/BooksController')

const authenticate = require('../middleware/authenticate')
const upload = require('../middleware/upload')

router.get('/sell',authenticate,BookController.getSell)
router.post('/sell',authenticate,upload.single('book_img'),BookController.sell)
//router.post('/sell',authenticate,BookController.sell)
router.get('/books/index/',authenticate,BookController.index)
router.get('/search',authenticate,BookController.search)
router.get('/filterout',authenticate,BookController.filterout)
router.get('/book',authenticate,BookController.display_book)

module.exports = router
