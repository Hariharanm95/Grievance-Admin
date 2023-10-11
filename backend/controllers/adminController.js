const User = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

// Login user for the Grievance Forum
const loginAdmin = async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        // Create a token for the Grievance Forum user
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Signup user for the Grievance Forum
const signupAdmin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password);

        // Create a token for the Grievance Forum user
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { loginAdmin, signupAdmin };
