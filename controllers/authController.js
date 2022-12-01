const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
}

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create(req.body);

	///////////////////Better way/////////////////////
	// const newUser = await User.create({			//
	// 	fname: req.body.fname,						//
	// 	lname: req.body.lname,						//
	// 	role: req.body.role,						//
	// 	username: req.body.username,				//
	// 	password: req.body.password,				//
	// 	passwordConfirm: req.body.passwordConfirm,	//
	// })											//
	//////////////////////////////////////////////////


	const token = signToken(newUser._id);


	res.status(201).json({
		status: 'success',
		token,
		data: {
			user: newUser
		}
	});
});



exports.login = catchAsync(async (req, res, next) => {
	const { username, password } = req.body;

	// 1) Check if username and password exist
	if (!username || !password) {
		return next(new AppError('Please provide username and password!', 400));
	}

	// 2) Check if user exists && password is correct
	const user = await User.findOne({ username /*=== username = username */ }).select('+password');


	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect username or password', 401));
	}


	// 3) If everything ok, send token to client
	const token = signToken(user._id);

	res.status(200).json({
		status: 'success',
		token
	});
});




exports.protect = catchAsync(async (req, res, next) => {
	// 1) Check if the token exists
	let token;
	// console.log(req.headers.authorization.split(' ')[1]);

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('Vous n\'êtes pas connectés. Veuillez vous authentifier pour accéder au service.', 401))
	}

	// 2) Validate token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError('L\'utilisateur possédant ce token n\'existe plus.', 401))
	}

	// 4) Check if user changed password after the token was issued
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(new AppError('L\'utilisateur a récemment changé son mot de passe. Veuillez vous reconnecter.', 401))
	}


	req.user = currentUser;

	next();
})



exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError('Vous n\'avez pas la permission d\'effectuer cette action.', 403));
		}

		next();
	}
}


exports.forgotPassword = catchAsync(async (req, res, next) => {
	//1) Get user based on posted email
	const user = await User.findOne({ email: req.body.username });
	if (!user) {
		return next(new AppError('There is no user with email address.', 404));
	}

	

	//2) Generate the random reset token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	//3) Send it to user's email

})

exports.resetPassword = (req, res, next) => {
}