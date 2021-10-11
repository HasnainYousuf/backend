const express = require('express')
const logoutControllers = require('../controllers/logoutControllers')
const verifyAuth = require('../middlewares/verifyAuth')
const router = express.Router();

router.post('/', verifyAuth.verifyOMPDToken, logoutControllers.Logout);



module.exports = router;