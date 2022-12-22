const express = require('express');
const viewController = require('../controllers/viewController');


const router = express.Router();

router.get('/', viewController.getAccueil);
router.get('/accueilChef', viewController.getAccueilChef);

router.get('/connexion', viewController.getLoginForm);









module.exports = router;