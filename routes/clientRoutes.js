const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');

const router = express.Router();


router
	.route('/')
	.get(clientController.getAllClients)
	.post(authController.protect, authController.restrictTo('chief'), clientController.createClient);

router
	.route('/:id')
	.get(clientController.getClient)
	.patch(authController.protect, authController.restrictTo('chief'), clientController.updateClient)
	.delete(authController.protect, authController.restrictTo('chief'), clientController.deleteClient);


module.exports = router;