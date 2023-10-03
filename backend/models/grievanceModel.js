const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grievanceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userType: {
        type :String ,
        required: true
    },
    department: {
        type :String ,
        required: true
    },
    category: {
        type :String ,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Grievance', grievanceSchema);
