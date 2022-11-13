const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Operation = require('./../../models/operationModel')


dotenv.config({ path: './config.env' });

const db = process.env.DATABASE_mongodb.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);


mongoose.connect(db, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
}).then(() => console.log("Connected to database"));



const Operations = JSON.parse(fs.readFileSync(`${__dirname}/operations.json`, 'UTF-8'));

const importDatabase = async () =>{
    try {
        await Operation.create(Operations);
        console.log("Operation created");
    } catch (e) {
        console.error(e)
    }
    process.exit();
}



const deleteData = async () => {
    try {
        await Operation.deleteMany();
        console.log("Operation deleted");
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