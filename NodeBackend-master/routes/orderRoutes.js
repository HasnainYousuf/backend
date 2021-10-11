const express = require('express')
const orderControllers = require('../controllers/orderControllers')
const verifyAuth = require('../middlewares/verifyAuth')
const router = express.Router();




router.post('/createorder', verifyAuth.verifyOMToken, orderControllers.createOrder);

router.put('/assignreciever', verifyAuth.verifyOMToken, orderControllers.assignReciever);

router.put('/assigndriver', verifyAuth.verifyOMToken, orderControllers.assignDriver);

router.put('/update', verifyAuth.verifyOMToken, orderControllers.updateStatusByOM);

router.put('/updatebyd', verifyAuth.verifyDToken, orderControllers.updateStatusByDriver);


module.exports = router;