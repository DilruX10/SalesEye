const Delivery = require("../models/delivery");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create new delivery =>   /api/v1/admin/delivery/new
exports.newDelivery = catchAsyncErrors(async (req, res, next) => {
	const delivery = await Delivery.create(req.body);

	res.status(201).json({
		success: true,
		delivery,
	});
});

// Get all delivery (Admin)  =>   /api/v1/admin/delivries
exports.getAdminDeliveries = catchAsyncErrors(async (req, res, next) => {
	const deliveries = await Delivery.find();

	res.status(200).json({
		success: true,
		deliveries,
	});
});

// Get single delivery details   =>   /api/v1/admin/delivery/:id
exports.getSingleDelivery = catchAsyncErrors(async (req, res, next) => {
	const delivery = await Delivery.findById(req.params.id); //specify the id of the delivery to retrieve from the database

	if (!delivery) {
		//checks if the delivery variable is existing
		return next(new ErrorHandler("Delivery not found", 404));
	}

	res.status(200).json({
		success: true,
		delivery,
	});
});

// Delete delivery   =>   /api/v1/admin/delivery/:id
exports.deleteDelivery = catchAsyncErrors(async (req, res, next) => {
	const delivery = await Delivery.findById(req.params.id);

	if (!delivery) {
		return next(new ErrorHandler("Delivery not found", 404));
	}

	await delivery.remove();

	res.status(200).json({
		success: true,
		message: "Delivery is deleted.",
	});
});

// Update Delivery   =>   /api/v1/admin/Delivery/:id
exports.updateDelivery = catchAsyncErrors(async (req, res, next) => {
	let delivery = await Delivery.findById(req.params.id);

	if (!delivery) {
		return next(new ErrorHandler("Delivery not found", 404));
	}

	delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		delivery,
	});
});
