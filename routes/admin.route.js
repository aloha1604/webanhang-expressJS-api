//delare expressjs module
const express = require('express');
const router = express.Router();

//declare controller
const adminController = require('../controller/admin.controller')


//router-get
router.get('/', (res, req) => {
    req.send('loi 404');
})
router.get('/admin-get', adminController.getAdmin);
router.get('/test', adminController.test);
router.get('/admin-dangnhap', adminController.postAdminDangnhap);
//router-post



//exports
module.exports = router;