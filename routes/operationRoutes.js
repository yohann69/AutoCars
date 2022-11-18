const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

// router.param('id', operationController.checkID);


router
    .route('/cheapest-operation')
    .get(operationController.aliasCheapestOperation, operationController.getAllOperations)



router
    .route('/stats')
    .get(operationController.getOperationStats);



router
    .route('/')
    .get(operationController.getAllOperations)
    .post(operationController.createOperation);


router
    .route('/:id')
    .get(operationController.getOperation)
    .patch(operationController.updateOperation)
    .delete(operationController.deleteOperation);


module.exports = router;