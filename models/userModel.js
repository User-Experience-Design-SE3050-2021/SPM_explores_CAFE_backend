const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }, 
    dateOfBirth: {
        type: Date,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    }, 
    emergencyPhone: {
        type: String,
        required: true
    }, 
    hireDate: {
        type: Date,
        required: true
    }, 
    dutyType: {
        type: String,
        required: true
    }, 
    userName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Users', userSchema)