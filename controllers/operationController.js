const { query } = require('express');
const Operation = require('./../models/operationModel')
const APIFeatures = require('./../utils/apiFeatures');


exports.aliasCheapestOperation = (req, res, next) => {
    req.query.limit = '1';
    req.query.sort = 'price';

    next();
}



exports.getAllOperations = async (req, res) => {
    try {
        // Execute query
        const features = new APIFeatures(Operation.find(), req.query)
            .filter()
            .limitFields()
            .sort()
            .paginate();
        const operations = await features.query;

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
            message: err
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
            message: err
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
            message: err
        })
    }
}



exports.getOperationStats = async (req, res) => {

    try {
        const stats = await Operation.aggregate([
            {
                $group: {
                    _id: null, // Replace null with '$category' to group by category for example
                    averagePrice: { $avg: '$price' },
                    averageDuration: { $avg: '$duration' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                    maxDuration: { $max: '$duration' },
                    minDuration: { $min: '$duration' },
                }
            },
            // {
            //     $sort: {
            //         averagePrice: 1
            //     }
            // },
            // {
            //     $match: { _id: { $ne: 'EASY'}} // ne => not equal 
            // }
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


