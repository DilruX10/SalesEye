import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useSelector } from "react-redux";

const ConfirmOrder = ({ history }) => {
	const { cartItems, shippingInfo } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.auth);

	// Calculate Order Prices
	const itemsPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	const shippingPrice = itemsPrice > 200 ? 0 : 25;
	const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
	const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

	const processToPayment = () => {
		const data = {
			itemsPrice: itemsPrice.toFixed(2),
			shippingPrice,
			taxPrice,
			totalPrice,
		};

		sessionStorage.setItem("orderInfo", JSON.stringify(data));
		history.push("/payment");
	};

	return (
		<Fragment>
			<MetaData title={"Confirm Order"} />

			<CheckoutSteps shipping confirmOrder />

			<div className="row d-flex justify-content-between">
				<div className="col-12 col-lg-8 mt-5 order-confirm">
					<div className="bordergold shadow-sm">
						<h4 className="mb-3">
							Shipping Info{" "}
							<i
								class="fa fa-info-circle fa-lg float-right"
								aria-hidden="true"
							></i>{" "}
						</h4>
						<hr />
						<ul>
							<li>
								<b>Name:</b> &nbsp; &nbsp; &nbsp; &nbsp;
								{user && user.name}
							</li>
							<li>
								<b>Phone:</b> &nbsp; &nbsp; &nbsp;{" "}
								{shippingInfo.phoneNo}
							</li>
							<li className="mb-4">
								<b>Address:</b> &nbsp; &nbsp;
								{`${shippingInfo.postalCode}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`}
							</li>
						</ul>
					</div>

					<br />
					<h4 className="mt-4 ">Your Cart Items:</h4>
					<hr />
					<table>
						{cartItems.map((item) => (
							/* <tr className="shadow-sm">
								<td className="borderblack">
									<img
										src={item.image}
										alt="Laptop"
										height="45"
										width="65"
									/>
								</td>
								<td>
									<Link to={`/product/${item.product}`}>
										{item.name}
									</Link>
								</td>
								<td>
									<p>
										{item.quantity} x Rs: {item.price}{" "}
										&nbsp;&nbsp;&nbsp;&nbsp;{" "}
										<b>
											Rs: {(item.quantity * item.price).toFixed(2)}
										</b>
									</p>
								</td>
							</tr> */
							<Fragment>
								<div
									className="cart-item my-2 bordergrey"
									key={item.product}
								>
									<br />

									<div className="row">
										<div className="col-4 col-lg-2">
											<img
												src={item.image}
												alt="Laptop"
												height="45"
												width="65"
											/>
										</div>

										<div className="col-5 col-lg-4">
											<Link to={`/product/${item.product}`}>
												{item.name}
											</Link>
										</div>

										<div className="col-4 col-lg-6 mt-4 mt-lg-0">
											<p>
												{item.quantity} x Rs: {item.price}{" "}
												&nbsp;&nbsp;&nbsp;&nbsp;{" "}
												<b>
													Rs:{" "}
													{(item.quantity * item.price).toFixed(2)}
												</b>
											</p>
										</div>
									</div>
									<br />
								</div>
							</Fragment>
						))}
					</table>
				</div>

				<div className="col-12 col-lg-3 my-4">
					<div className="borderblack">
						<h4>Order Summary</h4>
						<hr />
						<p>
							Subtotal:{" "}
							<span className="order-summary-values">
								Rs: {itemsPrice.toFixed(2)}
							</span>
						</p>
						<p>
							Shipping:{" "}
							<span className="order-summary-values">Rs: 750.00</span>
						</p>
						<p>
							Tax:{" "}
							<span className="order-summary-values">Rs: 250.00</span>
						</p>

						<hr />

						<p>
							Total:{" "}
							<span className="order-summary-values">
								Rs: {totalPrice}
							</span>
						</p>

						<hr />
						<button
							id="checkout_btn"
							className="btn btn-primary btn-block"
							onClick={processToPayment}
						>
							Proceed to Payment
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ConfirmOrder;
