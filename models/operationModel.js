
const mongoose = require('mongoose');
const slugify = require('slugify')

const operationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Veuillez spécifier un nom"],
		unique: true,
		trim: true
	},
	slug: {type: String, required: false}, // Useless to me but you know...
	duration: {
		type: Number,
		required: [true, "Veuillez spécifier une durée"]
	},
	price: {
		type: Number,
		required: [true, "Veuillez spécifier un prix pour l'opération"]
		//select: false
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
})


operationSchema.virtual('durationWeeks').get(function (){
	return this.duration / 7;
})

// Document middleware that runs before .save() and .create()
operationSchema.pre('save', function(next){
	this.slug = slugify(this.name, {lower: true})
	next();
});
// // Document middleware that runs after .save() and .create()
// operationSchema.post('save', function(doc, next){
// 	console.log(doc)
// 	next();
// })

const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;