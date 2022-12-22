const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();


router.use(authController.isLoggedIn)

router.get('/', viewController.getAccueil);
router.get('/accueilChef', authController.protect, viewController.getAccueilChef);

router.get('/connexion', viewController.getLoginForm);









module.exports = router;