const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach(el => {
		if (allowedFields.includes(el)) {
			newObj[el] = obj[el];
		}
	});
	return newObj;
}

exports.getAllUsers = catchAsync(async (req, res) => {
	const users = await User.find()

	res.status(200).json({
		status: 'success',
		results: users.length,
		data: {
			users
		}
	})
})


exports.updateMe = catchAsync(async (req, res, next) => {
	// 1) Create error if user POSTs password data
	if (req.body.password || req.body.passwordConfirm) {
		return next(new AppError('Cette url n\'est pas pour la mise à jour du mot de passe. Veuillez utiliser /updateMyPassword', 400))
	}

	// 2) Update user document
	const filteredBody = filterObj(req.body, 'fname', 'lname', 'email');
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true
	})

	

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser
		}
	})

})


exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false })

	res.status(204).json({
		status: 'success',
		data: null
	})
});


exports.updateUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	})
}

exports.deleteUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	})
}

exports.getUser = catchAsync(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new AppError('Aucune opération avec cet ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			user
		}
	})
})

exports.createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	})
}
