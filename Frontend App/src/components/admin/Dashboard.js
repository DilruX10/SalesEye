import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { allOrders } from "../../actions/orderActions";
import { getAdminProducts } from "../../actions/productActions";
import { allUsers } from "../../actions/userActions";

import buyerIcon from "../../assests/imgs/B1.png";
import analysisIcon from "../../assests/imgs/DP2.png";
import orderIcon from "../../assests/imgs/O1.png";
import productIcon from "../../assests/imgs/P1.png";

const Dashboard = () => {
	const dispatch = useDispatch();

	const { products } = useSelector((state) => state.products);
	const { users } = useSelector((state) => state.allUsers);
	const { orders, totalAmount, loading } = useSelector(
		(state) => state.allOrders
	);

	let outOfStock = 0;
	products.forEach((product) => {
		//Calculating the number of products that are out of stock
		if (product.stock === 0) {
			outOfStock += 1; //counting the ones that have a stock of 0.
		}
	});

	useEffect(() => {
		//dispatch the necessary actions to fetch data from the backend
		dispatch(getAdminProducts());
		dispatch(allOrders());
		dispatch(allUsers());
	}, [dispatch]);

	return (
		<Fragment>
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<h1 className="my-4">
						<center>Dashboard</center>
					</h1>
					<br />

					{loading ? (
						<Loader />
					) : (
						<Fragment>
							<MetaData title={"Admin Dashboard"} />

							{/*<div className="row pr-4">
								<div className="col-xl-12 col-sm-12 mb-3">
									<div className="card text-white bg-primary o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												Total Amount
												<br />{" "}
												<b>
													Rs{" "}
													{totalAmount && totalAmount.toFixed(2)}
												</b>
											</div>
										</div>
									</div>
								</div>
							</div>*/}

							<div className="row pr-4">
								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-success o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												<img
													width="150"
													height="150"
													src={productIcon}
													alt="Product-Icon"
												/>
												<br />
												<br />
											</div>
											<div className="text-center card-font-size">
												Products
												<br /> <b>{products && products.length}</b>
											</div>
										</div>
										<Link
											className="card-footer text-white clearfix small z-1"
											to="/admin/products"
										>
											<span className="float-left">
												View Details
											</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>

								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-danger o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												<img
													width="150"
													height="150"
													src={orderIcon}
													alt="Order-Icon"
												/>
												<br />
												<br />
											</div>
											<div className="text-center card-font-size">
												Orders
												<br /> <b>{orders && orders.length}</b>
											</div>
										</div>
										<Link
											className="card-footer text-white clearfix small z-1"
											to="/admin/orders"
										>
											<span className="float-left">
												View Details
											</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>

								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-warning o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												<img
													width="180"
													height="180"
													src={buyerIcon}
													alt="Product-Icon"
												/>
												<br />
											</div>
											<div className="text-center card-font-size">
												Users
												<br /> <b>{users && users.length}</b>
											</div>
										</div>
										<Link
											className="card-footer text-white clearfix small z-1"
											to="/admin/users"
										>
											<span className="float-left">
												View Details
											</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>

								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-primary o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												<img
													width="180"
													height="180"
													src={analysisIcon}
													alt="Analysis-Icon"
												/>
												<br />
											</div>
											<div className="text-center card-font-size">
												Analysis
												<br />
											</div>
										</div>
										<Link
											className="card-footer text-white clearfix small z-1"
											to="/dashboard"
										>
											<span className="float-left">
												View Details
											</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Dashboard;
