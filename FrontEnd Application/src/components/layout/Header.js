import { MDBBadge } from "mdbreact";
import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { logout } from "../../actions/userActions";

import Search from "./Search";

import "../../App.css";

const Header = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { user, loading } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.cart);

	const logoutHandler = () => {
		dispatch(logout());
		alert.success("Logged out successfully.");
	};

	return (
		<Fragment>
			<nav className="navbar row">
				<div className="col-12 col-md-3">
					<div className="navbar-brand">
						<Link to="/">
							<img
								src="/images/shopit_logo.png"
								width="300"
								height="auto"
							/>
						</Link>
					</div>
				</div>

				{user ? (
					<div className="col-12 col-md-6 mt-2 mt-md-0">
						{user.role === "user" && (
							<Route
								render={({ history }) => <Search history={history} />}
							/>
						)}{" "}
					</div>
				) : (
					<div className="col-12 col-md-6 mt-2 mt-md-0">
						<Route
							render={({ history }) => <Search history={history} />}
						/>
					</div>
				)}

				<div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
					<Link
						to="/cart"
						style={{ textDecoration: "none" }}
						className="mx-3"
					>
						<div className="position-relative d-inline-block">
							<i
								class="fa fa-shopping-cart fa-2x"
								aria-hidden="true"
								color="warning"
							></i>

							<MDBBadge
								color="danger"
								light
								pill
								className="position-absolute translate-middle"
							>
								{cartItems.length}
							</MDBBadge>
						</div>
					</Link>

					{user ? (
						<div className="ml-4 dropdown d-inline">
							<Link
								to="#!"
								className="btn dropdown-toggle text-white mr-4"
								type="button"
								id="dropDownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<figure className="avatar avatar-nav">
									<img
										src={user.avatar && user.avatar.url}
										alt={user && user.name}
										className="rounded-circle"
									/>
								</figure>
								<span>{user && user.name}</span>
							</Link>

							<div
								className="dropdown-menu"
								aria-labelledby="dropDownMenuButton"
							>
								{user && user.role === "admin" && (
									<Link className="dropdown-item" to="/dashboard">
										Dashboard
									</Link>
								)}
								<Link className="dropdown-item" to="/orders/me">
									Orders
								</Link>
								<Link className="dropdown-item" to="/me">
									Profile
								</Link>
								<Link
									className="dropdown-item text-danger"
									to="/"
									onClick={logoutHandler}
								>
									Logout
								</Link>
							</div>
						</div>
					) : (
						!loading && (
							<Link to="/login" className="btn ml-4" id="login_btn">
								Login
							</Link>
						)
					)}
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
