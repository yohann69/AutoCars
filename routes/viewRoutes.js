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
router.get('/creerOperation', authController.protect, authController.restrictTo('admin'), viewController.getCreateOperation);
router.get('/gererOperation', authController.protect, authController.restrictTo('admin'), viewController.getManageOperation);
router.get('/statistiques', authController.protect, authController.restrictTo('admin'), viewController.getStatistics);


// Chief
router.get('/accueilChef', authController.protect, authController.restrictTo('chief'), viewController.getAccueilChef);
router.get('/creerClient', authController.protect, authController.restrictTo('chief'), viewController.getCreateClient);
router.get('/gererClient', authController.protect, authController.restrictTo('chief'), viewController.getManageClient);
router.get('/gererVehicules', authController.protect, authController.restrictTo('chief'), viewController.getManageVehicules);



// Employee
router.get('/accueilEmployee', authController.protect, authController.restrictTo('employee'), viewController.getAccueilEmployee);




// router.get('/*', viewController.get404)




module.exports = router;