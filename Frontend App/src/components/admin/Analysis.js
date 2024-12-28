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
	const { orders, loading } = useSelector((state) => state.allOrders);

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

				<div className="col-12 col-md-10" style={{ left: "-20px" }}>
					<h1 className="my-4">
						<center>Data Analysis</center>
					</h1>

					{loading ? (
						<Loader />
					) : (
						<Fragment>
							<MetaData title={"Analysis"} />
							<iframe
								title="dash"
								width="1280"
								height="2160"
								src="https://app.powerbi.com/reportEmbed?reportId=c5f2d26b-9a71-4114-b259-8799b8da36f3&autoAuth=true&ctid=44e3cf94-19c9-4e32-96c3-14f5bf01391a&navContentPaneEnabled=false&filterPaneEnabled=false&pageName=ReportSection"
								frameborder="0"
								allowfullscreen="true"
							></iframe>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Dashboard;
