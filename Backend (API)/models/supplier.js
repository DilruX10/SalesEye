const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Supplier name'],
        trim: true,
        maxLength: [50, 'Supplier name cannot exceed 50 characters'],
        validate: {
            validator: function(value) {
              return /^[a-zA-Z\s]*$/.test(value);
            },
            message: 'Invalid name format'
          }
    },
    nic: {
        type: String,
        required: [true, 'Please enter nic number'],
        unique: [true, 'Invalid'],
        trim: true,
        maxLength: [12, 'Invalid nic number']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter phone number'],
        unique: [true, 'Invalid']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: [true, 'Invalid'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Supplier', supplierSchema);