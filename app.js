const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const operationRouter = require('./routes/operationRoutes');
const userRouter = require('./routes/userRoutes');
const vehicleRouter = require('./routes/vehicleRoutes');
const clientRouter = require('./routes/clientRoutes');
const viewRouter = require('./routes/viewRoutes');


const app = express(); // Create express app

app.set('view engine', 'pug'); // Set view engine
app.set('views', `${__dirname}/views`); // Set views folder

// Set security HTTP headers
app.use(helmet());

// Development login
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Limit requests
const limiter = rateLimit({
	max: 500, // Allow 500 requests from the same IP
	windowMs: 60 * 60 * 1000, // in 1 hour
	message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50kb' }));
app.use(express.bodyParser({ extended: true, limit: '50mb' }));
// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
	whitelist: [
		'fname',
		'lname',
		'role',
		'username',
		'password',
		'passwordConfirm',
		'passwordChangedAt',
		'passwordResetToken',
		'passwordResetExpires',
		'active',
		'duration',
		'price',
		'name'
	]
}));

// serving static files
app.use(express.static(`${__dirname}/public`))


app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	console.log(req.cookies);
	next();
})




// Routes

app.use('/', viewRouter);
app.use('/api/v1/operations', operationRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/vehicles', vehicleRouter);
app.use('/api/v1/clients', clientRouter);


app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})


app.use(globalErrorHandler)



module.exports = app;