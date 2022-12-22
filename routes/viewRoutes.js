const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();


// Public
router.get('/connexion', viewController.getLoginForm);

// Global
router.get('/', authController.isLoggedIn, viewController.getAccueil);
router.get('/monCompte', authController.protect, viewController.getAccount);

// Admin

// Chief
router.get('/accueilAdmin', authController.protect,authController.restrictTo('admin'),  viewController.getAccueilAdmin);
router.get('/accueilChef', authController.protect, authController.restrictTo('chief'), viewController.getAccueilChef);
router.get('/accueilEmployee', authController.protect, authController.restrictTo('employee'), viewController.getAccueilEmployee);

// Employee









module.exports = router;