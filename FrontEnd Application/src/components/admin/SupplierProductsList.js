import jsPDF from "jspdf";
import "jspdf-autotable";
import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reportHeader from "../../assests/imgs/reportHeader.png";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	deleteProduct,
	getAdminProducts,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

import { getSupplierDetails } from "../../actions/supplierActions";

const ProductsList = ({ match, history }) => {
	const [sname, setSName] = useState("");

	const alert = useAlert(); //display alert messages
	const dispatch = useDispatch(); //dispatch actions

	//select and destructure the "loading", "error", and "products" states
	const { loading, error, products } = useSelector((state) => state.products);
	//select and destructure the "error" and "isDeleted" states
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.product
	);

	const { supplier } = useSelector((state) => state.supplierDetails);

	const supplierId = match.params.id;

	useEffect(() => {
		dispatch(getAdminProducts()); //get all the products for the admin.

		if (supplier && supplier._id !== supplierId) {
			dispatch(getSupplierDetails(supplierId));
		} else {
			setSName(supplier.name);
		}

		if (error) {
			//if there is an error in the "products" state
			alert.error(error);
			dispatch(clearErrors()); //clear the errors
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			//checks if a product has been successfully deleted
			alert.success("Product deleted successfully");
			history.push(`/admin/supplierProductList/${supplierId}`); //redirects the user to the admin products page after the product has been successfully deleted.
			dispatch({ type: DELETE_PRODUCT_RESET }); //reset the "product" state to its initial state after a product has been successfully deleted.
		}
	}, [
		dispatch,
		alert,
		error,
		deleteError,
		isDeleted,
		history,
		supplier,
		supplierId,
	]);

	const setProducts = () => {
		//creates a table of products data
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
					label: "Price",
					field: "price",
					sort: "asc",
				},
				{
					label: "Supplier",
					field: "seller",
					sort: "asc",
				},
				{
					label: "Stock",
					field: "stock",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
				},
			],
			rows: [], //rows-->empty array that will be populated with the product data later
		};

		products
			.filter((product) => product.seller === sname)
			.forEach((product) => {
				data.rows.push({
					//creates an object with properties --->columns
					id: product._id,
					name: product.name,
					price: `Rs ${product.price}`,
					seller: product.seller,
					stock: product.stock,
					actions: (
						<Fragment>
							<Link
								to={`/admin/product/${product._id}`}
								className="btn btn-primary py-1 px-2"
							>
								<i className="fa fa-pencil"></i>
							</Link>
							<button
								className="btn btn-danger py-1 px-2 ml-3"
								onClick={() => deleteProductHandler(product._id)}
							>
								<i className="fa fa-trash"></i>
							</button>
						</Fragment>
					),
				}); //first button--->edit    second button--->delete
			});

		return data;
	};

	const deleteProductHandler = (id) => {
		dispatch(deleteProduct(id)); // delete the product with that ID.
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
		doc.text(`Products by ${sname}`, pageWidth / 2, 60, { align: "center" });
		// Underline the text
		const textWidth =
			(doc.getStringUnitWidth(`Products by ${sname}`) *
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
		const headers = ["ID", "Name", "Price", "Seller", "Stock"];
		tableRows.push(headers);

		// Add table data
		products
			.filter((product) => product.seller === sname)
			.forEach((product) => {
				const productData = [
					product._id,
					product.name,
					`Rs ${product.price}`,
					product.seller,
					product.stock,
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
		doc.save(`SalesVision-Products_by_${sname}.pdf`);
	};

	const generateOutOfStockPDF = () => {
		const doc = new jsPDF();
		const tableRows = [];

		// Add title
		const title = `NextLevel - Out of Stock List - (${new Date().toLocaleDateString()})`;
		const titleX = doc.internal.pageSize.getWidth() / 2;
		doc.setFontSize(16);
		doc.text(titleX, 20, title, "center");

		// Add gap
		const gap = 5;
		let y = 20;

		// Add table headers
		const headers = ["ID", "Name", "Price", "Seller", "Stock"];
		tableRows.push(headers);

		// Filter out products with stock = 0
		const outOfStockProducts = products.filter(
			(product) => product.stock === 0
		);

		// Add table data
		outOfStockProducts
			.filter((product) => product.seller === sname)
			.forEach((product) => {
				const productData = [
					product._id,
					product.name,
					`Rs ${product.price}`,
					product.seller,
					product.stock,
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
		doc.save("out-of-stock-products.pdf");
	};

	return (
		<Fragment>
			<MetaData title={`Products by ${sname}`} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<h1 className="my-5">Products by {sname}</h1>

						<button
							className="btn btn-info py-1 px-2 ml-3"
							onClick={generatePDF}
						>
							<i className="fa fa-file-pdf-o"></i> Download Reports
						</button>

						<button
							className="btn btn-danger py-1 px-2 ml-3"
							onClick={generateOutOfStockPDF}
							style={{ marginRight: "10px" }}
						>
							<i className="fa fa-file-pdf-o"></i> Out of Stock Products
							Report
						</button>

						{loading ? (
							<Loader />
						) : (
							<MDBDataTable
								data={setProducts()}
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

export default ProductsList;
