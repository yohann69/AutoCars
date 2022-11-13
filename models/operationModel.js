
const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Veuillez spécifier un nom"],
		unique: true,
		trim: true
	},
	duration: {
		type: Number,
		required: [true, "Veuillez spécifier une durée"]
	},
	price: {
		type: Number,
		required: [true, "Veuillez spécifier un prix pour l'opération"]
	}
})

const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;