// Import grievance model
const Grievance = require('../models/grievanceModel');

const mongoose = require('mongoose');

// GET all Grievances
const getGrievances = async (req, res) => {
    const user_id = req.user._id;
    // { createdAt: -1 } => show the database in descending order, which means showing the latest grievances first
    const grievances = await Grievance.find({  }).sort({ createdAt: -1 });
    res.status(200).json(grievances);
}

// GET a single Grievance
const getGrievance = async (req, res) => {
    // It gives the ID in the address bar (grievances.js)
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Grievance" });
    }

    const grievance = await Grievance.findById(id);

    if (!grievance) {
        // If not found, stop this function using return
        return res.status(404).json({ error: "No such Grievance" });
    }

    res.status(200).json(grievance);
}

// POST (create) a new Grievance
const createGrievance = async (req, res) => {
    // All requests are passed to req using middleware in the server
    const { title, description, userType, department, category } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!description) {
        emptyFields.push('description');
    }
    if (!userType) {
        emptyFields.push('userType');
    }
    if (!department) {
        emptyFields.push('department');
    }
    if (!category) {
        emptyFields.push('category');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Please fill out ${emptyFields}`, emptyFields });
    }

    // There might be an error, so using try and catch
    // Add the document to the database
    try {
        const user_id = req.user._id;
        const grievance = await Grievance.create({ title, description, userType, department, category, user_id });
        res.status(200).json(grievance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE a Grievance
const deleteGrievance = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Grievance" });
    }

    const grievance = await Grievance.findOneAndDelete({ _id: id });

    if (!grievance) {
        // If not found, stop this function using return
        return res.status(404).json({ error: "No such Grievance" });
    }

    res.status(200).json(grievance);
}

// UPDATE a Grievance
const updateGrievance = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Grievance" });
    }

    const grievance = await Grievance.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!grievance) {
        // If not found, stop this function using return
        return res.status(404).json({ error: "No such Grievance" });
    }

    res.status(200).json(grievance);
}

module.exports = {
    getGrievance,
    getGrievances,
    createGrievance,
    deleteGrievance,
    updateGrievance
}
