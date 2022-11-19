const { query } = require('express');
const Operation = require('./../models/operationModel')
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.aliasCheapestOperation = (req, res, next) => {
	req.query.limit = '1';
	req.query.sort = 'price';

	next();
}



exports.getAllOperations = catchAsync(async (req, res, next) => {
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
})

exports.getOperation = catchAsync(async (req, res, next) => {  // For optional parameters add ? at the end (ex: /api/v1/operations/:id?)
	const operation = await Operation.findById(req.params.id);

	if (!operation) {
		return next(new AppError('Aucune opération avec cet ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			operation
		}
	})
})




exports.createOperation = catchAsync(async (req, res, next) => {
	const newOperation = await Operation.create(req.body);

	res.status(201).json({
		status: 'Success',
		data: {
			operation: newOperation
		}
	})
});

exports.updateOperation = catchAsync(async (req, res, next) => {
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

})

exports.deleteOperation = catchAsync(async (req, res, next) => {
	await Operation.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: null
	})
})



exports.getOperationStats = catchAsync(async (req, res, next) => {
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

})


