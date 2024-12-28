import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import reportHeader from "../../assests/imgs/reportHeader.png";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import jsPDF from "jspdf";
import "jspdf-autotable";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, clearErrors, deleteUser } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({ history }) => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, users } = useSelector((state) => state.allUsers);
	const { isDeleted } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(allUsers());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success("User deleted successfully");
			history.push("/admin/users");
			dispatch({ type: DELETE_USER_RESET });
		}
	}, [dispatch, alert, error, isDeleted, history]);

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	};

	const setUsers = () => {
		const data = {
			columns: [
				{
					label: "User ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Name",
					field: "name",
					sort: "asc",
				},
				{
					label: "Email",
					field: "email",
					sort: "asc",
				},
				{
					label: "Role",
					field: "role",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
				},
			],
			rows: [],
		};

		users
			.filter((user) => user.role === "user")
			.forEach((user) => {
				data.rows.push({
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,

					actions: (
						<Fragment>
							<Link
								to={`/admin/userOrdersList/${user._id}`}
								className="btn btn-success py-1 px-2"
							>
								<i className="fa fa-list"></i>
							</Link>
							<Link
								to={`/admin/user/${user._id}`}
								className="btn btn-primary py-1 px-2 ml-3"
							>
								<i className="fa fa-pencil"></i>
							</Link>
							<button
								className="btn btn-danger py-1 px-2 ml-3"
								onClick={() => deleteUserHandler(user._id)}
							>
								<i className="fa fa-trash"></i>
							</button>
						</Fragment>
					),
				});
			});

		return data;
	};

	//generate pdf
	const generatePDF = () => {
		const doc = new jsPDF();
		const tableRows = [];

		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, "0");
		const day = String(currentDate.getDate()).padStart(2, "0");
		const formattedDate = `${day}-${month}-${year}`;

		// Add the logo image to the document
		const logoWidth = 180;
		const logoHeight = 25;
		const pageWidth = doc.internal.pageSize.getWidth();
		const logoX = (pageWidth - logoWidth) / 2;
		doc.addImage(reportHeader, "PNG", logoX, 10, logoWidth, logoHeight); // (image, type, x, y, width, height)

		// Add custom text next to the report name
		doc.setFont("helvetica", "bold");
		doc.setFontSize(20);

		//Change report name accordingly
		doc.text("Customers Report", pageWidth / 2, 60, { align: "center" });
		// Underline the text
		const textWidth =
			(doc.getStringUnitWidth("Customers Report") *
				doc.internal.getFontSize()) /
			doc.internal.scaleFactor;
		doc.setLineWidth(0.5);
		doc.line(
			pageWidth / 2 - textWidth / 2,
			63,
			pageWidth / 2 + textWidth / 2,
			63
		);

		doc.setFont("arial", "normal");
		doc.setFontSize(12);
		doc.text("Date: " + formattedDate, 195, 75, { align: "right" });

		// Add gap
		const gap = 5;
		let y = 80;

		// Add table headers
		const headers = ["ID", "Name", "Email", "Role"];
		tableRows.push(headers);

		// Add table data
		users
			.filter((user) => user.role === "user")
			.forEach((users) => {
				const userData = [users._id, users.name, users.email, users.role];
				tableRows.push(userData);
			});

		// Add table to PDF document
		doc.autoTable({
			head: [tableRows[0]],
			body: tableRows.slice(1),
			startY: y + gap,
		});

		// Save PDF file
		doc.save("SalesVision-Customers_List.pdf");
	};

	return (
		<Fragment>
			<MetaData title={"All Customers"} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<h1 className="my-5">All Customers</h1>
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
								data={setUsers()}
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

export default UsersList;
