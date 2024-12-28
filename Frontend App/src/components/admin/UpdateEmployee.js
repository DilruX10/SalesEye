import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getEmployeeDetails,
	updateEmployee,
} from "../../actions/employeeActions";
import { UPDATE_EMPLOYEE_RESET } from "../../constants/employeeConstants";

const UpdateEmployee = ({ match, history }) => {
	//define state variables and their corresponding update functions.
	// These variables hold the form input values.
	const [name, setName] = useState("");
	const [nic, setNic] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState(0);

	const alert = useAlert(); //display alerts or notifications to the user.
	const dispatch = useDispatch(); //dispatch actions to update the application's state.

	//extract the relevant pieces of state from the application's global state.
	const { error, employee } = useSelector((state) => state.employeeDetails);
	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.employee);

	const employeeId = match.params.id; //assigns it the value of the id parameter from the match object.

	useEffect(() => {
		if (employee && employee._id !== employeeId) {
			//checks if the employee object exists and id property is not equal to employeeId
			dispatch(getEmployeeDetails(employeeId)); //true-->retrieve the employee details from the backend API.
		} else {
			// if the employee object exists
			// set the component's state to the employee's properties.
			setName(employee.name);
			setNic(employee.nic);
			setPhoneNumber(employee.phoneNumber);
			setEmail(employee.email);
			setPosition(employee.position);
			setSalary(employee.salary);
		}

		if (error) {
			//checks---->Error
			alert.error(error); // displays an error message
			dispatch(clearErrors()); // remove the error from the state.
		}

		if (updateError) {
			//checks --->updateError
			alert.error(updateError); //displays an error message
			dispatch(clearErrors()); //remove the error from the state.
		}

		if (isUpdated) {
			//if updated
			history.push("/admin/employees"); //navigates to the /admin/employees
			alert.success("Employee updated successfully");
			dispatch({ type: UPDATE_EMPLOYEE_RESET }); //reset the isUpdated property in the state.
		}
	}, [
		dispatch,
		alert,
		error,
		isUpdated,
		history,
		updateError,
		employee,
		employeeId,
	]);

	const submitHandler = (e) => {
		e.preventDefault(); //prevents the default form submission action from occurring.

		const formData = new FormData(); //FormData-->store and send data as key-value pairs.
		//sets a key-value pair on the formData
		formData.set("name", name);
		formData.set("nic", nic);
		formData.set("phoneNumber", phoneNumber);
		formData.set("email", email);
		formData.set("position", position);
		formData.set("salary", salary);

		dispatch(updateEmployee(employee._id, formData)); //update a product with the given _id and formData
	};

	return (
		<Fragment>
			<MetaData title={"Update Employee"} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<div className="wrapper my-5">
							<form
								className="shadow-lg"
								onSubmit={submitHandler}
								encType="multipart/form-data"
							>
								<h1 className="mb-4">Update Employee</h1>

								<div className="form-group">
									<label htmlFor="name_field">Name</label>
									<input
										type="text"
										id="name_field"
										className="form-control"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="nic_field">NIC</label>
									<input
										type="text"
										id="nic_field"
										className="form-control"
										value={nic}
										onChange={(e) => setNic(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="phoneNumber_field">
										Phone Number
									</label>
									<input
										type="number"
										id="phoneNumber_field"
										className="form-control"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email_field">Email</label>
									<input
										type="text"
										id="email_field"
										className="form-control"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="position_field">Position</label>
									<input
										type="text"
										id="position_field"
										className="form-control"
										value={position}
										onChange={(e) => setPosition(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="salary_field">Salary</label>
									<input
										type="text"
										id="salary_field"
										className="form-control"
										value={salary}
										onChange={(e) => setSalary(e.target.value)}
									/>
								</div>

								<button
									id="login_button"
									type="submit"
									className="btn btn-block py-3"
									disabled={loading ? true : false}
								>
									UPDATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateEmployee;
