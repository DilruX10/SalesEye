const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create new product   =>   /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
	//handles the creation of a new product

	let images = []; //Initializes an empty images array.
	if (typeof req.body.images === "string") {
		//Checks if the images field in the request body is a string
		images.push(req.body.images); //pushes that image into the images array.
	} else {
		images = req.body.images; //assigned to the images variable.
	}

	let imagesLinks = []; //Initializes an empty array named imagesLinks.

	for (let i = 0; i < images.length; i++) {
		//Loops through each image in the images array.
		const result = await cloudinary.v2.uploader.upload(images[i], {
			//uploads it to the Cloudinary service
			folder: "products",
		});

		imagesLinks.push({
			public_id: result.public_id, //unique identifier assigned by Cloudinary to each uploaded image
			url: result.secure_url, //URL of the uploaded image
		});
	}

	req.body.images = imagesLinks; //Replaces the images field in the request body with the imagesLinks array
	req.body.user = req.user.id; //Adds the id of the authenticated user to the user field in the request body.

	const product = await Product.create(req.body); //Creates a new Product object with the details in the request body and stores it in the product variable.

	res.status(201).json({
		//Sends a response to the client
		success: true,
		product,
	});
});

// Get all products   =>   /api/v1/products?keyword=Tshirt
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
	const resPerPage = 6; //display number of products in one page
	const productsCount = await Product.countDocuments(); //counts the number of documents in the Product collection in the MongoDB database.

	const apiFeatures = new APIFeatures(Product.find(), req.query) //use spi feature-->query to find all products
		.search() //search for products
		.filter(); //filter products

	let products = await apiFeatures.query; //assigns the result of the query
	let filteredProductsCount = products.length; //determine the number of filtered products.

	apiFeatures.pagination(resPerPage); //paginations(# of products in one page)-->limit the number of products displayed per page
	products = await apiFeatures.query; //assigns the result of the query

	res.status(200).json({
		success: true,
		productsCount,
		resPerPage,
		filteredProductsCount,
		products,
	});
});

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
	//admin can get all products details

	const products = await Product.find();

	res.status(200).json({
		success: true,
		products,
	});
});

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id); //specify the id of the product to retrieve from the database

	if (!product) {
		//checks if the product variable is existing
		return next(new ErrorHandler("Product not found", 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id); //finds a single document in the Product collection with the matching _id field.

	if (!product) {
		//checks if the product variable is existing
		return next(new ErrorHandler("Product not found", 404));
	}

	let images = [];
	if (typeof req.body.images === "string") {
		// object is a string or an array.
		images.push(req.body.images); //If it is a string, it pushes it to the images array
	} else {
		images = req.body.images; //assigns the req.body.images array to the images variable.
	}

	if (images !== undefined) {
		//checks if the images variable is not undefined

		// Deleting images associated with the product
		for (let i = 0; i < product.images.length; i++) {
			const result = await cloudinary.v2.uploader.destroy(
				product.images[i].public_id
			);
		} // deletes them from the Cloudinary server

		let imagesLinks = [];

		for (let i = 0; i < images.length; i++) {
			const result = await cloudinary.v2.uploader.upload(images[i], {
				folder: "products",
			}); //uploads images to the Cloudinary server

			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url,
			}); //creates an array of image links with the public_id and secure_url of each uploaded image.
		}

		req.body.images = imagesLinks;
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		//updates the product in the database by calling the id
		new: true, //return the updated document rather than the original document.
		runValidators: true, //run the validation rules defined on the Product model for the updated fields.
		useFindAndModify: false, //tells Mongoose to use MongoDB's findOneAndUpdate() method instead of the deprecated findAndModify() method.
	});

	res.status(200).json({
		success: true,
		product,
	});
});

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	//handle HTTP DELETE requests to delete a product from the database

	const product = await Product.findById(req.params.id); //ind the product in the database with the specified ID

	if (!product) {
		//If the product is not found, this line creates and throws a new ErrorHandler
		return next(new ErrorHandler("Product not found", 404));
	}

	// Deleting images associated with the product
	for (let i = 0; i < product.images.length; i++) {
		const result = await cloudinary.v2.uploader.destroy(
			product.images[i].public_id
		);
	} //uses the Cloudinary API to delete each image associated with the product.

	await product.remove(); //removes the product from the database.

	res.status(200).json({
		success: true,
		message: "Product is deleted.",
	});
});

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
	//handle HTTP POST requests to create a review for a product

	const { rating, comment, productId } = req.body; //de-structures the rating, comment, and productId properties

	// analyze sentiment of the review
	var Sentiment = require("sentiment");
	var sentiment = new Sentiment();
	var reviewSentimentResult = sentiment.analyze(comment);
	var sentiment = reviewSentimentResult.score;

	const review = {
		//creates a new review object, which will be added to the reviews array of the product.
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
		sentiment,
	};

	const product = await Product.findById(productId); //find the product in the database with the specified ID

	const isReviewed = product.reviews.find(
		(r) => r.user.toString() === req.user._id.toString()
	); // checks whether the user has already reviewed the product using ID of the current user.

	if (isReviewed) {
		//If the user has already reviewed the product,updates their existing review with the new rating and comment.
		product.reviews.forEach((review) => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
				review.sentiment = sentiment;
			}
		});
	} else {
		//adds the new review to the reviews array and updates the numOfReviews property
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	// calculates the average rating of the product by using the reduce()
	//add up the ratings of all the reviews, and then dividing the result by the total number of reviews.
	product.ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save({ validateBeforeSave: false }); //saves the updated product object to the database

	res.status(200).json({
		success: true,
	});
});

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	res.status(200).json({
		//review was created successfully.
		success: true,
		reviews: product.reviews,
	});
});

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
	// defines a function to delete a review of a product and exports it from the module.

	const product = await Product.findById(req.query.productId); //finds the product associated with the review to be deleted, using the productId

	console.log(product);

	// creates a new array of reviews that excludes the review to be deleted, using the id
	const reviews = product.reviews.filter(
		(review) => review._id.toString() !== req.query.id.toString()
	);

	const numOfReviews = reviews.length; //calculates the number of reviews remaining after the review is deleted.

	// calculates the average rating of the product after the review is deleted, using the remaining reviews.
	const ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		reviews.length;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{
			//updates the product with the new review data
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true, //returns the modified document,
			runValidators: true, //validates the updated document against the schema
			useFindAndModify: false, //uses the native findOneAndUpdate() method instead of findAndModify()
		}
	);

	res.status(200).json({
		//sends a success response to the client
		success: true,
	});
});
