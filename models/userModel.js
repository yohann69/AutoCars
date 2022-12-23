const crypto = require('crypto');
const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    lname: {
        type: String,
        required: [true, "Veuillez spécifier un nom"],
        trim: true,
        maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
        minlength: [1, 'Le nom doit contenir au moins 1 caractères'],
        validate: [validate.isAlpha, 'Le nom ne peut contenir que des lettres']
    },
    fname: {
        type: String,
        required: [true, "Veuillez spécifier un prénom"],
        trim: true,
        maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères'],
        minlength: [1, 'Le prénom doit contenir au moins 1 caractères'],
        validate: [validate.isAlpha, 'Le prénom ne peut contenir que des lettres']
    },
    role: {
        type: String,
        default: 'employee',
        enum: {
            values: ['admin', 'chief', 'employee'],
            message: 'Le rôle doit être soit admin, chief ou employee'
        }
    },
    username: {
        type: String,
        required: [true, "Veuillez spécifier un nom d'utilisateur"],
        unique: true,
        trim: true,
        maxlength: [50, 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères'],
        minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'],
        validate: [validate.isAlphanumeric, 'Le nom d\'utilisateur ne peut contenir que des lettres et chiffres']
    },
    password: {
        type: String,
        required: [true, "Veuillez spécifier un mot de passe"],
        trim: false,
        maxlength: [50, 'Le mot de passe ne peut pas dépasser 50 caractères'],
        minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Veuillez confirmer le mot de passe"],
        trim: false,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Les mots de passe ne correspondent pas'
        }
    },
    email: {
        type: String,
        required: [true, "Veuillez spécifier une adresse email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validate.isEmail, 'Veuillez spécifier une adresse email valide']
    },
    passwordChangedAt: Date,
    photo: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    }
});


userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    // Hash the password with cost of 20
    this.password = await bcrypt.hash(this.password, 13);

    this.passwordConfirm = undefined;

    next();
});


userSchema.pre('save', function (next) {
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimestamp;
    }

    // False = Not changed
    return false;
}




userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};


const User = mongoose.model('User', userSchema);

module.exports = User;