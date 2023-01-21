
const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');

const clientSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: [true, 'Un client doit avoir un prénom.'],
		trim: true,
	},
	lname: {
		type: String,
		required: [true, 'Un client doit avoir un nom.'],
		trim: true,
	},
	phone: {
		type: String,
		required: [true, 'Un client doit avoir un numéro de téléphone.'],
		trim: true,
		unique: true,
		maxLength: 10,
		minLength: 10,
		validate: [validator.isNumeric, 'Veuillez entrer un numéro de téléphone valide.'],
	},
	email: {
		type: String,
		required: [true, 'Un client doit avoir un courriel.'],
		trim: true,
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Veuillez entrer un courriel valide.'],
	},
	address: {
		type: String,
		required: [true, 'Un client doit avoir une adresse.'],
		trim: true,
	},
	city: {
		type: String,
		required: [true, 'Un client doit avoir une ville.'],
		trim: true,
		validator: [validator.isAlpha, 'Veuillez entrer une ville valide.'],
	},
	postalCode: {
		type: String,
		required: [true, 'Un client doit avoir un code postal.'],
		trim: true,
	},
	vehicles: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Vehicle',
	}]
})



// Query Middleware
clientSchema.pre(/^find/, function (next) {
	// this.find({ secretClient: { $ne: true } })

	this.start = Date.now();
	next();
})

clientSchema.post(/^find/, function (docs, next) {
	// console.log(`Query took ${Date.now() - this.start} milliseconds!`)
	next();
})



const Client = mongoose.model('Client', clientSchema);


module.exports = Client;