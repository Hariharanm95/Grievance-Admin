const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Static method for user registration in the Grievance Forum
adminSchema.statics.signup = async function (email, password) {

    // Validation
    if (!email || !password) {
        throw Error("Both email and password are required for registration.");
    }

    if (!validator.isEmail(email)) {
        throw Error("Invalid Email Address.");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Weak Password. Please use a stronger password.');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("User with this email already exists.");
    }

    // Salt - an extra layer of security - e.g., mypasswordj87w38ns9dn - add extra value
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await this.create({ email, password: hash });
    return admin;
}

// Static method for user login in the Grievance Forum
adminSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("Both email and password are required for login.");
    }

    const admin = await this.findOne({ email });

    if (!admin) {
        throw Error("Incorrect Email");
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
        throw Error('Incorrect Password');
    }

    return admin;
}

module.exports = mongoose.model('Admin', adminSchema);
