const { query } = require('express');
const Operation = require('./../models/operationModel')


exports.getAllOperations = async (req, res) => {
    try {
        const queryObj = { ...req.query }; // ... = destruturing query object
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(field => delete queryObj[field]);

        // Prepare query
        let queryStr = JSON.stringify(queryObj);
        // Replace gte gt lte lt with the same word but with a $ in front
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        
        const query = Operation.find(JSON.parse(queryStr));


        // Execute query
        const operations = await query;

        // Send response
        res.status(200).json({
            status: 'success',
            results: operations.length,
            data: {
                operations
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}

exports.getOperation = async (req, res) => {  // For optional parameters add ? at the end (ex: /api/v1/operations/:id?)
    try {
        const operation = await Operation.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                operation
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }


}

exports.createOperation = async (req, res) => {
    try {
        const newOperation = await Operation.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: {
                operation: newOperation
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: 'Invalid data sent'
        })
    }
}

exports.updateOperation = async (req, res) => {
    try {

        const operation = await Operation.findByIdAndUpdate(req.params.id, req.body, {
            rew: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                operation
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: 'Invalid data sent'
        })
    }


}

exports.deleteOperation = async (req, res) => {
    try {
        await Operation.findByIdAndDelete(req.params.id);


        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: 'Invalid data sent'
        })
    }
}

