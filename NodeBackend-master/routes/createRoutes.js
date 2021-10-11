const express = require('express')
const createControllers = require('../controllers/createControllers')
const verifyAuth = require('../middlewares/verifyAuth')
const router = express.Router();


router.post('/manager', verifyAuth.verifyOToken, createControllers.createManager);

router.post('/operator', verifyAuth.verifyOMToken, createControllers.createOperator);

router.post('/driver', verifyAuth.verifyOMToken, createControllers.createDriver);

router.put('/managerstatus', verifyAuth.verifyOToken, createControllers.updateManagerStatus);

router.put('/operatorstatus', verifyAuth.verifyOMToken, createControllers.updateOperatorStatus);
module.exports = router;