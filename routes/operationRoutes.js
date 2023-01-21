const express = require('express');
const operationController = require('../controllers/operationController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', operationController.checkID);



router
	.route('/')
	.get(operationController.getAllOperations) // if error on protect the next one isn't called
	.post(operationController.createOperation);


router
	.route('/:id')
	.get(operationController.getOperation)
	.patch(authController.protect, authController.restrictTo('admin'), operationController.updateOperation)
	.delete(authController.protect, authController.restrictTo('admin'), operationController.deleteOperation);


module.exports = router;