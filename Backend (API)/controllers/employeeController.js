const Employee = require("../models/employee");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Create new employee  =>   /api/v1/admin/employee/new
exports.newEmployee = catchAsyncErrors(async (req, res, next) => {
	//handles the creation of a new employee

	const employee = await Employee.create(req.body); //Creates a new Employee object with the details in the request body and stores it in the employee variable.

	res.status(201).json({
		//Sends a response to the client
		success: true,
		employee,
	});
});

// Get all employees (Admin)  =>   /api/v1/admin/employees
exports.getAdminEmployees = catchAsyncErrors(async (req, res, next) => {
	//admin can get all employees details

	const employees = await Employee.find();

	res.status(200).json({
		success: true,
		employees,
	});
});

// Get single employee details   =>   /api/v1/admin/employee/:id
exports.getSingleEmployee = catchAsyncErrors(async (req, res, next) => {
	const employee = await Employee.findById(req.params.id); //specify the id of the employee to retrieve from the database

	if (!employee) {
		//checks if the employee variable is existing
		return next(new ErrorHandler("Employee not found", 404));
	}

	res.status(200).json({
		success: true,
		employee,
	});
});

// Delete employee   =>   /api/v1/admin/employee/:id
exports.deleteEmployee = catchAsyncErrors(async (req, res, next) => {
	//handle HTTP DELETE requests to delete a employee from the database

	const employee = await Employee.findById(req.params.id); //find the employee in the database with the specified ID

	if (!employee) {
		//If the employee is not found, this line creates and throws a new ErrorHandler
		return next(new ErrorHandler("Employee not found", 404));
	}

	await employee.remove(); //removes the employee from the database.

	res.status(200).json({
		success: true,
		message: "Employee is deleted.",
	});
});

// Update Employee   =>   /api/v1/admin/employee/:id
exports.updateEmployee = catchAsyncErrors(async (req, res, next) => {
	let employee = await Employee.findById(req.params.id); //finds a single document in the Employee collection with the matching _id field.

	if (!employee) {
		//checks if the employee variable is existing
		return next(new ErrorHandler("Employee not found", 404));
	}

	employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
		//update the employee in the database by calling the id
		new: true, //return the updated document rather than the original document.
		runValidators: true, //run the validation rules defined on the Employee model for the updated fields.
		useFindAndModify: false, //tells Mongoose to use MongoDB's findOneAndUpdate() method instead of the deprecated findAndModify() method.
	});

	res.status(200).json({
		success: true,
		employee,
	});
});
