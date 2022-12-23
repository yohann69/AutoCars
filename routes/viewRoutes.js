const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();


// Public
router.get('/connexion', viewController.getLoginForm);

// Global
router.get('/', viewController.getPresentation);

router.get('/monCompte', authController.protect, viewController.getAccount);

// Admin
router.get('/accueilAdmin', authController.protect, authController.restrictTo('admin'), viewController.getAccueilAdmin);
router.get('/creerUtilisateur', authController.protect, authController.restrictTo('admin'), viewController.getCreateUser);


// Chief
router.get('/accueilChef', authController.protect, authController.restrictTo('chief'), viewController.getAccueilChef);
router.get('/creerClient', authController.protect, authController.restrictTo('chief'), viewController.getCreateClient);



// Employee
router.get('/accueilEmployee', authController.protect, authController.restrictTo('employee'), viewController.getAccueilEmployee);




// router.get('/*', viewController.get404)




module.exports = router;