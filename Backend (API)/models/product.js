const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter product name"],
		trim: true, //remove white spaces from both ends of a string
		maxLength: [100, "Product name cannot exceed 100 characters"],
	},
	price: {
		type: Number,
		required: [true, "Please enter product price"],
		maxLength: [5, "Product name cannot exceed 5 characters"],
		default: 0.0, //if no price default is 0.0
	},
	description: {
		type: String,
		required: [true, "Please enter product description"],
	},
	ratings: {
		type: Number,
		default: 0, //if no ratings default is 0
	},
	images: [
		{
			public_id: {
				//unique identifier for the image stored in the cloud storage service.
				type: String,
				required: true,
			},
			url: {
				// URL of the cloud stored image.
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "Please select category for this product"],
		enum: {
			values: [
				"Tshirt",
				"Shirt",
				"Trouser",
				"Jacket",
				"Short",
				"Bag",
				"Accessories",
			],
			message: "Please select correct category for product",
		},
	},
	seller: {
		type: String,
		required: [true, "Please enter product seller"],
	},
	stock: {
		type: Number,
		required: [true, "Please enter product stock"],
		maxLength: [5, "Product name cannot exceed 5 characters"],
		default: 0, //if no stock default is 0--->out of stock
	},
	numOfReviews: {
		type: Number,
		default: 0, //if no reviews default is 0
	},
	color: {
		type: String,
		required: false,
	},
	brand: {
		type: String,
		required: false,
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: "User",
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
			sentiment: {
				type: Number,
				required: false,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now, //default is current time
	},
});

module.exports = mongoose.model("Product", productSchema);
