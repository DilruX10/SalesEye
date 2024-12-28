import { MDBBadge, MDBDataTable } from "mdbreact";
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
import {
	allOrders,
	clearErrors,
	deleteOrder,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = ({ match, history }) => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, orders } = useSelector((state) => state.allOrders);
	const { isDeleted } = useSelector((state) => state.order);

	const userId = match.params.id;

	useEffect(() => {
		dispatch(allOrders());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success("Order deleted successfully");
			history.push("/admin/orders");
			dispatch({ type: DELETE_ORDER_RESET });
		}
	}, [dispatch, alert, error, isDeleted, history]);

	const deleteOrderHandler = (id) => {
		dispatch(deleteOrder(id));
	};

	const setOrders = () => {
		const data = {
			columns: [
				{
					label: "Order ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "No of Items",
					field: "numofItems",
					sort: "asc",
				},
				{
					label: "Amount",
					field: "amount",
					sort: "asc",
				},
				{
					label: "Status",
					field: "status",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
				},
			],
			rows: [],
		};

		orders
			.filter((order) => order.user === userId)
			.forEach((order) => {
				data.rows.push({
					id: order._id,
					numofItems: order.orderItems.length,
					amount: `Rs: ${order.totalPrice}`,
					status:
						order.orderStatus &&
						String(order.orderStatus).includes("Delivered") ? (
							<MDBBadge color="success">{order.orderStatus}</MDBBadge>
						) : String(order.orderStatus).includes("Shipped") ? (
							<MDBBadge color="info">{order.orderStatus}</MDBBadge>
						) : (
							<MDBBadge color="warning">{order.orderStatus}</MDBBadge>
						),
					actions: (
						<Fragment>
							<Link
								to={`/admin/order/${order._id}`}
								className="btn btn-primary py-1 px-2"
							>
								<i className="fa fa-eye"></i>
							</Link>
							<button
								className="btn btn-danger py-1 px-2 ml-3"
								onClick={() => deleteOrderHandler(order._id)}
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
		doc.text("Orders Report", pageWidth / 2, 60, { align: "center" });
		// Underline the text
		const textWidth =
			(doc.getStringUnitWidth("Orders Report") *
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

		doc.setFont("arial", "normal");
		doc.setFontSize(12);
		doc.text("User: " + userId, 195, 75, { align: "left" });

		// Add gap
		const gap = 5;
		let y = 80;

		// Add table headers
		const headers = ["ID", "No Of Items", "Amount", "Status"];
		tableRows.push(headers);

		// Add table data
		orders
			.filter((order) => order.user === userId)
			.forEach((orders) => {
				const productData = [
					orders._id,
					orders.orderItems.length,
					`Rs${orders.totalPrice}`,
					orders.orderStatus &&
						String(orders.orderStatus).includes("Delivered"),
				];
				tableRows.push(productData);
			});

		// Add table to PDF document
		doc.autoTable({
			head: [tableRows[0]],
			body: tableRows.slice(1),
			startY: y + gap,
		});

		// Save PDF file
		doc.save("SalesVision-User_Orders_List.pdf");
	};

	return (
		<Fragment>
			<MetaData title={"All Orders"} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<h1 className="my-5">All Orders</h1>
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
								data={setOrders()}
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

export default OrdersList;
