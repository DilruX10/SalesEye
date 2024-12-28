const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter customer name'],
        trim: true,
        maxLength: [50, 'customer name cannot exceed 50 characters'],
        validate: {
            validator: function(value) {
              return /^[a-zA-Z\s]*$/.test(value);
            },
            message: 'Invalid name format'
          }
    },
    adress: {
        type: String,
        required: [true, 'Please enter Address number'],
        unique: [true, 'Invalid'],
        trim: true
        
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter phone number'],
        unique: [true, 'Invalid'],
        validate: {
          validator: function(value) {
            return /^[0-9]{10}$/.test(value);
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
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
          },
          message: 'Invalid email'
        }
    },
    diliveryPerson: {
        type: String,
        required: [true, 'Please enter Diliveryperson'],
        trim: true
    },
    remark: {
        type: String,
        required: [true, 'Please enter remark'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('delivery', deliverySchema);