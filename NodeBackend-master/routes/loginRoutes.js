const express = require('express')
const loginControllers = require('../controllers/loginControllers')
const router = express.Router();


router.post('/owner', loginControllers.LoginOwner);

router.post('/manager', loginControllers.LoginManager);

router.post('/operator', loginControllers.LoginOperator);

router.post('/driver', loginControllers.LoginDriver);

module.exports = router;