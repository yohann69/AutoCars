const express = require('express');
const operationController = require('./../controllers/operationController');

const router = express.Router();


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