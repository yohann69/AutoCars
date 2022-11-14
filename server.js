const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app.js');


const db = process.env.DATABASE_mongodb.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);


mongoose.connect(db, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => console.log("Connected to database"));


const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
