import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = ({ history }) => {
	const dispatch = useDispatch();

	const { cartItems } = useSelector((state) => state.cart);

	const removeCartItemHandler = (id) => {
		dispatch(removeItemFromCart(id));
	};

	const increaseQty = (id, quantity, stock) => {
		const newQty = quantity + 1;

		if (newQty > stock) return;

		dispatch(addItemToCart(id, newQty));
	};

	const decreaseQty = (id, quantity) => {
		const newQty = quantity - 1;

		if (newQty <= 0) return;

		dispatch(addItemToCart(id, newQty));
	};

	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
	};

	return (
		<Fragment>
			<MetaData title={"Your Cart"} />
			{cartItems.length === 0 ? (
				<h2 className="mt-5">Your Cart is Empty</h2>
			) : (
				<Fragment>
					<h2 className="mt-5">
						Your cart have{" "}
						<b>
							{cartItems.length}{" "}
							{cartItems.length === 1 ? "item" : "items"}
						</b>
					</h2>

					<div className="row d-flex justify-content-between">
						<div className="col-12 col-lg-8">
							{cartItems.map((item) => (
								<Fragment>
									<div
										className="cart-item bordergrey shadow-sm"
										key={item.product}
									>
										<br />
										<div className="row">
											<div className="col-4 col-lg-3">
												<img
													src={item.image}
													alt="Laptop"
													height="90"
													width="115"
												/>
											</div>

											<div className="col-5 col-lg-3">
												<Link to={`/products/${item.product}`}>
													{item.name}
												</Link>
											</div>

											<div className="col-4 col-lg-2">
												<p>Rs: {item.price.toFixed(2)}</p>
											</div>

											<div className="col-4 col-lg-3 mt-4 mt-lg-0">
												<div className="stockCounter d-inline">
													<span
														className="btn btn-warning minus"
														onClick={() =>
															decreaseQty(
																item.product,
																item.quantity
															)
														}
													>
														-
													</span>

													<input
														type="number"
														className="count d-inline"
														value={item.quantity}
														readOnly
													/>

													<span
														className="btn btn-warning plus"
														onClick={() =>
															increaseQty(
																item.product,
																item.quantity,
																item.stock
															)
														}
													>
														+
													</span>
												</div>
											</div>

											<div className="col-2 col-lg-1 mt-4 mt-lg-1">
												<i
													class="fa fa-trash btn btn-danger px-2 py-1"
													onClick={() =>
														removeCartItemHandler(item.product)
													}
												></i>
											</div>
										</div>
										<br />
									</div>
								</Fragment>
							))}
						</div>

						<div className="col-12 col-lg-3 my-4">
							<div id="" className="borderblack">
								<h4>Order Summary</h4>
								<hr />
								<p>
									No. of items:{" "}
									<span className="order-summary-values">
										{cartItems.reduce(
											(acc, item) => acc + Number(item.quantity),
											0
										)}{" "}
										(Units)
									</span>
								</p>
								<p>
									Est. total:{" "}
									<span className="order-summary-values">
										Rs:
										{cartItems
											.reduce(
												(acc, item) =>
													acc + item.quantity * item.price,
												0
											)
											.toFixed(2)}
									</span>
								</p>

								<hr />
								<button
									id="checkout_btn"
									className="btn btn-primary btn-block"
									onClick={checkoutHandler}
								>
									Check out
								</button>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Cart;
