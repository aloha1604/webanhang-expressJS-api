//delare expressjs module
const express = require('express')
const router = express.Router()

//declare controller
const controller = require('../controller/book.controller')


//router
router.get('/getAllBook', controller.getAllBook);
router.get('/test', controller.test);

//exports
module.exports = router;