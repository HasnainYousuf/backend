const express = require('express')
const driverControllers = require('../controllers/driverControllers')
const verifyAuth = require('../middlewares/verifyAuth')
const router = express.Router();


router.put('/updatestatus', verifyAuth.verifyOMToken, driverControllers.updateStatus);

router.put('/updategroup', verifyAuth.verifyOMToken, driverControllers.updateGroup);

router.put('/updatevehicle', verifyAuth.verifyOMToken, driverControllers.updateVehicle);



module.exports = router;