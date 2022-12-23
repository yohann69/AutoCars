
const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');

const operationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Veuillez spécifier un nom"],
		unique: true,
		trim: true,
		maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
		minlength: [3, 'Le nom doit contenir au moins 3 caractères'],
		// validate: [validator.isAlphanumeric, 'Le nom ne peut contenir que des lettres et chiffres']
	},
	// slug: { type: String, required: false }, // Useless to me but you know...
	duration: {
		type: Number,
		required: [true, "Veuillez spécifier une durée"],
		min: [10, 'La durée doit être supérieure à 10 minutes'],
	},
	price: {
		type: Number,
		required: [true, "Veuillez spécifier un prix pour l'opération"],
		min: [10, 'Le prix doit être supérieur à 10€'],
		//select: false
	}
	// type: {
	// 	type: String,
	// 	required: [true, "Veuillez spécifier un type d'opération"],
	// 	enum: {
	// 		values: ['Réparation', 'Remplacement', 'Amélioration', 'Autre'],
	// 		message: 'Le type doit être soit Réparation, Remplacement, Amélioration ou Autre'
	// 	}
	// },

	// secretOperation: {
	// 	type: Boolean,
	// 	default: false
	// }
}
	// , {
	// 	toJSON: { virtuals: true },
	// 	toObject: { virtuals: true }
	// }
)


// operationSchema.virtual('durationWeeks').get(function () {
// 	return this.duration / 7;
// })

// Document middleware that runs before .save() and .create()
// operationSchema.pre('save', function (next) {
// 	this.slug = slugify(this.name, { lower: true })
// 	next();
// });

// // Document middleware that runs after .save() and .create()
// operationSchema.post('save', function(doc, next){
// 	console.log(doc)
// 	next();
// })


// Query Middleware
operationSchema.pre(/^find/, function (next) {
	// this.find({ secretOperation: { $ne: true } })

	this.start = Date.now();
	next();
})

operationSchema.post(/^find/, function (docs, next) {
	// console.log(`Query took ${Date.now() - this.start} milliseconds!`)
	next();
})



const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;