
const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');
// const Client = require('./clientModel');


const vehicleSchema = new mongoose.Schema({
	client: {
		type: mongoose.Schema.ObjectId,
		ref: 'Client',
		required: [true, 'Un véhicule doit appartenir à un client.']
	},
	numModel: {
		type: mongoose.Schema.ObjectId,
		ref: 'Model',
		required: [true, 'Un véhicule doit avoir un modèle.']
	},
	serialNumber: {
		type: String,
		validator: validator.isAlphanumeric,
		required: [true, 'Un véhicule doit avoir un numéro de série.'],
		unique: true,
	},
	matriculation: {
		type: String,
		validator: validator.isAlphanumeric,
		required: [true, 'Un véhicule doit avoir une immatriculation.'],
		unique: true,
		trim: true,
		length: [9, 'L\'immatriculation doit contenir 9 caractères (ex: AB-123-CD).']
	},
	drivingYear: {
		type: Number,
		required: [true, 'Un véhicule doit avoir une année de mise en circulation.'],
	},
})



// Query Middleware
vehicleSchema.pre(/^find/, function (next) {
	// this.find({ secretVehicle: { $ne: true } })

	this.start = Date.now();
	next();
})


vehicleSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'client',
		select: '-__v -passwordChangedAt -passwordResetToken -passwordResetExpires'
	})
	next();
})


vehicleSchema.post(/^find/, function (docs, next) {
	// console.log(`Query took ${Date.now() - this.start} milliseconds!`)
	next();
})



const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;