import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
	return (
		<Fragment>
			<MetaData title={"Order Success"} />

			<div className="row justify-content-center">
				<div className="col-6 mt-1 text-center">
					<img
						className="my-5 img-fluid d-block mx-auto"
						src="/images/OrderConfirmed.jpg"
						alt="Order Success"
						width="400"
						height="400"
					/>
					<h3>✔ Your Order has been placed successfully.</h3>
					<br />
					<Link to="/orders/me" class="btn btn-success">
						{" "}
						Go to My Orders
					</Link>
				</div>
			</div>
			<br />
			<br />
		</Fragment>
	);
};

export default OrderSuccess;
