
const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');

const modelSchema = new mongoose.Schema({
	modelName: {
		type: String,
		required: [true, 'Un modèle doit avoir un nom.'],
		unique: true,
		trim: true,
	},
	brand: {
		type: String,
		required: [true, 'Un modèle doit avoir une marque.'],
	},
})



// Query Middleware
modelSchema.pre(/^find/, function (next) {
	// this.find({ secretModel: { $ne: true } })

	this.start = Date.now();
	next();
})

modelSchema.post(/^find/, function (docs, next) {
	// console.log(`Query took ${Date.now() - this.start} milliseconds!`)
	next();
})



const Model = mongoose.model('Model', modelSchema);


module.exports = Model;