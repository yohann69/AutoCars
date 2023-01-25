const { query } = require('express');
const Client = require('./../models/clientModel')
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllClients = catchAsync(async (req, res, next) => {
	// Execute query
	const features = new APIFeatures(Client.find(), req.query)
		.filter()
		.limitFields()
		.sort()
		.paginate();
	const clients = await features.query;

	// Send response
	res.status(200).json({
		status: 'success',
		results: clients.length,
		data: {
			clients
		}
	})
})

exports.getClient = catchAsync(async (req, res, next) => {  // For optional parameters add ? at the end (ex: /api/v1/clients/:id?)
	const client = await Client.findById(req.params.id);

	if (!client) {
		return next(new AppError('Aucune opération avec cet ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			client
		}
	})
})




exports.createClient = catchAsync(async (req, res, next) => {
	const newClient = await Client.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			client: newClient
		}
	})
});


exports.updateClient = catchAsync(async (req, res, next) => {
	const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if (!client) {
		return next(new AppError('Aucun client avec cet ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			client
		}
	})

})

exports.deleteClient = catchAsync(async (req, res, next) => {
	const client = await Client.findByIdAndDelete(req.params.id);

	if (!client) {
		return next(new AppError('Aucune opération avec cet ID', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null
	})
})



