const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const operationRouter = require('./routes/operationRoutes');
const errorController = require('./controllers/errorController');




const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`))



app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
})

// app.get('/', (req, res) => {
//     res
//         .status(200)
//         .json({message: 'Hello World!', app: "AutoCars"});
// })


// app.get('/api/v1/operations', getAllOperations);
// app.get('/api/v1/operations/:id', getOperation);
// app.post('/api/v1/operations', createOperation);
// app.patch('/api/v1/operations/:id', updateOperation);
// app.delete('/api/v1/operations/:id', deleteOperation);


app.use('/api/v1/operations', operationRouter);
app.use('/api/v1/users', userRouter);


app.all('*', (req, res, next) => {
	// const err = new Error(`Can't find ${req.originalUrl} on this server!`);
	// err.status = 'Fail';
	// err.statusCode = 404;

	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})


app.use(globalErrorHandler)



module.exports = app;