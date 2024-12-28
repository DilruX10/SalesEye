import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	deleteEmployee,
	getAdminEmployees,
} from "../../actions/employeeActions";
import { DELETE_EMPLOYEE_RESET } from "../../constants/employeeConstants";

const EmployeesList = ({ history }) => {
	const alert = useAlert(); //display alert messages
	const dispatch = useDispatch(); //dispatch actions

	//select and destructure the "loading", "error", and "employees" states
	const { loading, error, employees } = useSelector(
		(state) => state.employees
	);
	//select and destructure the "error" and "isDeleted" states
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.employee
	);

	useEffect(() => {
		dispatch(getAdminEmployees()); //get all the employees for the admin.

		if (error) {
			//if there is an error in the "employees" state
			alert.error(error);
			dispatch(clearErrors()); //clear the errors
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			//checks if a employee has been successfully deleted
			alert.success("Employee deleted successfully");
			history.push("/admin/employees"); //redirects the user to the admin employees page after the employee has been successfully deleted.
			dispatch({ type: DELETE_EMPLOYEE_RESET }); //reset the "employee" state to its initial state after a employee has been successfully deleted.
		}
	}, [dispatch, alert, error, deleteError, isDeleted, history]);

	const setEmployees = () => {
		//creates a table of employees data
		const data = {
			columns: [
				//columns --->array of objects that describe the columns of the table.
				{
					label: "ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Name",
					field: "name",
					sort: "asc",
				},
				{
					label: "Position",
					field: "position",
					sort: "asc",
				},
				{
					label: "Salary",
					field: "salary",
					sort: "asc",
				},
				{
					label: "Phone Number",
					field: "phoneNumber",
					sort: "asc",
				},
				{
					label: "Email",
					field: "email",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
				},
			],
			rows: [], //rows-->empty array that will be populated with the employee data later
		};

		employees.forEach((employee) => {
			data.rows.push({
				//creates an object with properties --->columns
				id: employee._id,
				name: employee.name,
				position: employee.position,
				salary: `Rs${employee.salary}`,
				phoneNumber: employee.phoneNumber,
				email: employee.email,
				actions: (
					<Fragment>
						<Link
							to={`/admin/employee/${employee._id}`}
							className="btn btn-primary py-1 px-2"
						>
							<i className="fa fa-pencil"></i>
						</Link>
						<button
							className="btn btn-danger py-1 px-2 ml-3"
							onClick={() => deleteEmployeeHandler(employee._id)}
						>
							<i className="fa fa-trash"></i>
						</button>
					</Fragment>
				),
			}); //first button--->edit    second button--->delete
		});

		return data;
	};

	const deleteEmployeeHandler = (id) => {
		dispatch(deleteEmployee(id)); // delete the product with that ID.
	};

	//generate pdf
	const generatePDF = () => {
		const doc = new jsPDF();
		const tableRows = [];

		// Add title
		const title = `NextLevel - Employee List - (${new Date().toLocaleDateString()})`;
		const titleX = doc.internal.pageSize.getWidth() / 2;
		doc.setFontSize(16);
		doc.text(titleX, 20, title, "center");

		// Add gap
		const gap = 5;
		let y = 20;

		// Add table headers
		const headers = [
			"ID",
			"Name",
			"Position",
			"Salary",
			"Phone Number",
			"Email",
		];
		tableRows.push(headers);

		// Add table data
		employees.forEach((employee) => {
			const employeeData = [
				employee._id,
				employee.name,
				employee.position,
				`Rs${employee.salary}`,
				employee.phoneNumber,
				employee.email,
			];
			tableRows.push(employeeData);
		});

		// Add table to PDF document
		doc.autoTable({
			head: [tableRows[0]],
			body: tableRows.slice(1),
			startY: y + gap,
		});

		// Save PDF file
		doc.save("Employees.pdf");
	};

	return (
		<Fragment>
			<MetaData title={"All Employees"} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<h1 className="my-5">All Employees</h1>
						<button
							className="btn btn-info py-1 px-2 ml-3"
							onClick={generatePDF}
						>
							<i className="fa fa-file-pdf-o"></i> Download Reports
						</button>

						{loading ? (
							<Loader />
						) : (
							<MDBDataTable
								data={setEmployees()}
								className="px-3"
								bordered
								striped
								hover
							/>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default EmployeesList;
