const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter employee name'],
        trim: true,//remove white spaces from both ends of a string
        maxLength: [50, 'employee name cannot exceed 50 characters'],
        validate: {
            validator: function(value) {
              return /^[a-zA-Z\s]*$/.test(value);//can use only letters
            },
            message: 'Invalid name format'
          }
    },
    nic: {
        type: String,
        required: [true, 'Please enter nic number'],
        unique: [true, 'Invalid'],//value is unique and cant use more than 1 time
        trim: true,
        maxLength: [12, 'Invalid nic number']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter phone number'],
        unique: [true, 'Invalid'],
        validate: {
          validator: function(value) {
            return /^[0-9]{10}$/.test(value);//can use only numbers from 0-9 and only 10 digits
          },
          message: 'Invalid phone number'
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: [true, 'Invalid'],
        validate: {
          validator: function(value) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);//gmail type validation
          },
          message: 'Invalid email'
        }
    },
    position: {
        type: String,
        required: [true, 'Please enter position'],
        trim: true
    },
    salary: {
        type: Number,
        required: [true, 'Please enter salary'],
        min: 0//if no salary default is 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Employee', employeeSchema);