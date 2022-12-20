const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Operation = require('./../../models/operationModel')
const Model = require('./../../models/vehicleModelModel')
const Client = require('./../../models/clientModel')
const Vehicle = require('./../../models/vehicleModel')


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_mongodb.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);


mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => console.log('DB connection successful!'));



const Operations = JSON.parse(fs.readFileSync(`${__dirname}/operations.json`, 'UTF-8'));
const Models = JSON.parse(fs.readFileSync(`${__dirname}/model.json`, 'UTF-8'));
const Clients = JSON.parse(fs.readFileSync(`${__dirname}/client.json`, 'UTF-8'));
const Vehicles = JSON.parse(fs.readFileSync(`${__dirname}/vehicle.json`, 'UTF-8'));

const importDatabase = async () => {
	try {
		await Operation.create(Operations);
		console.log("Operation created");
		await Model.create(Models);
		console.log("Model created");
		await Client.create(Clients);
		console.log("Client created");
		await Vehicle.create(Vehicles);
		console.log("Vehicle created");
	} catch (e) {
		console.error(e)
	}
	process.exit();
}



const deleteData = async () => {
	try {
		await Operation.deleteMany();
		console.log("Operation deleted");
		await Model.deleteMany();
		console.log("Model deleted");
		await Client.deleteMany();
		console.log("Client deleted");
		await Vehicle.deleteMany();
		console.log("Vehicle deleted");
	} catch (e) {
		console.error(e);
	}
	process.exit();
}


if (process.argv[2] === '--import') {
	importDatabase();
} else if (process.argv[2] === '--delete') {
	deleteData();
}