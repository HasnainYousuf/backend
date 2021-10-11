const express = require('express')
const viewControllers = require('../controllers/viewControllers')
const verifyAuth = require('../middlewares/verifyAuth')
const router = express.Router();


router.get('/manager', verifyAuth.verifyOToken, viewControllers.viewManager);

router.get('/operator', verifyAuth.verifyOMToken, viewControllers.viewOperator);

router.get('/driver', verifyAuth.verifyOMPToken, viewControllers.viewDriver);

router.get('/order', verifyAuth.verifyOMPToken, viewControllers.viewOrder);

router.get('/orderbyd', verifyAuth.verifyDToken, viewControllers.viewDriverOrder);



module.exports = router;