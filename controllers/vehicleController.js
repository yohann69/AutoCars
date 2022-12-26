const { query } = require('express');
const Vehicle = require('./../models/vehicleModel')
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllVehicles = catchAsync(async (req, res, next) => {
	// Execute query
	const features = new APIFeatures(Vehicle.find(), req.query)
		.filter()
		.limitFields()
		.sort()
		.paginate();
	const vehicles = await features.query;

	// Send response
	res.status(200).json({
		status: 'success',
		results: vehicles.length,
		data: {
			vehicles
		}
	})
})

exports.getVehicle = catchAsync(async (req, res, next) => {  // For optional parameters add ? at the end (ex: /api/v1/vehicles/:id?)
	const vehicle = await Vehicle.findById(req.params.id);

	if (!vehicle) {
		return next(new AppError('Aucune opération avec cet ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			vehicle
		}
	})
})




exports.createVehicle = catchAsync(async (req, res, next) => {
	const newVehicle = await Vehicle.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			vehicle: newVehicle
		}
	})
});


exports.updateVehicle = catchAsync(async (req, res, next) => {
	const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
		rew: true,
		runValidators: true
	});

	if (!vehicle) {
		return next(new AppError('Aucune opération avec cet ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			vehicle
		}
	})

})

exports.deleteVehicle = catchAsync(async (req, res, next) => {
	const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

	if (!vehicle) {
		return next(new AppError('Aucune opération avec cet ID', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null
	})
})



