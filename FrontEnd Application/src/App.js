import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

// Cart Imports
import Cart from "./components/cart/Cart";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import Payment from "./components/cart/Payment";
import Shipping from "./components/cart/Shipping";

// Order Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Auth or User imports
import ForgotPassword from "./components/user/ForgotPassword";
import Login from "./components/user/Login";
import NewPassword from "./components/user/NewPassword";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import UpdatePassword from "./components/user/UpdatePassword";
import UpdateProfile from "./components/user/UpdateProfile";

// Admin Imports
import AllReviews from "./components/admin/AllReviews";
import Analysis from "./components/admin/Analysis";
import Dashboard from "./components/admin/Dashboard";
import NewProduct from "./components/admin/NewProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import ProductReviews from "./components/admin/ProductReviews";
import ProductsList from "./components/admin/ProductsList";
import UpdateProduct from "./components/admin/UpdateProduct";
import UpdateUser from "./components/admin/UpdateUser";
import UserOrdersList from "./components/admin/UserOrdersList";
import UsersList from "./components/admin/UsersList";

import EmployeesList from "./components/admin/EmployeesList";
import NewEmployee from "./components/admin/NewEmployee";
import UpdateEmployee from "./components/admin/UpdateEmployee";

import NewSupplier from "./components/admin/NewSupplier";
import SupplierProductList from "./components/admin/SupplierProductsList";
import SuppliersList from "./components/admin/SuppliersList";
import UpdateSupplier from "./components/admin/UpdateSupplier";

import DeliveriesList from "./components/admin/DeliveriesList";
import NewDelivery from "./components/admin/NewDelivery";
import UpdateDelivery from "./components/admin/UpdateDelivery";

import axios from "axios";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";
import ProtectedRoute from "./components/route/ProtectedRoute";
import store from "./store";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
	const [stripeApiKey, setStripeApiKey] = useState("");

	useEffect(() => {
		store.dispatch(loadUser());

		async function getStripApiKey() {
			const { data } = await axios.get("/api/v1/stripeapi");

			setStripeApiKey(data.stripeApiKey);
		}

		getStripApiKey();
	}, []);

	const { user, isAuthenticated, loading } = useSelector(
		(state) => state.auth
	);

	return (
		<Router>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Route path="/" component={Home} exact />
					<Route path="/search/:keyword" component={Home} />
					<Route path="/product/:id" component={ProductDetails} exact />

					<Route path="/cart" component={Cart} exact />
					<ProtectedRoute path="/shipping" component={Shipping} />
					<ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
					<ProtectedRoute path="/success" component={OrderSuccess} />
					{stripeApiKey && (
						<Elements stripe={loadStripe(stripeApiKey)}>
							<ProtectedRoute path="/payment" component={Payment} />
						</Elements>
					)}

					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route
						path="/password/forgot"
						component={ForgotPassword}
						exact
					/>
					<Route
						path="/password/reset/:token"
						component={NewPassword}
						exact
					/>
					<ProtectedRoute path="/me" component={Profile} exact />
					<ProtectedRoute
						path="/me/update"
						component={UpdateProfile}
						exact
					/>
					<ProtectedRoute
						path="/password/update"
						component={UpdatePassword}
						exact
					/>

					<ProtectedRoute path="/orders/me" component={ListOrders} exact />
					<ProtectedRoute
						path="/order/:id"
						component={OrderDetails}
						exact
					/>
				</div>

				<ProtectedRoute
					path="/dashboard"
					isAdmin={true}
					component={Dashboard}
					exact
				/>

				<ProtectedRoute
					path="/admin/analysis"
					isAdmin={true}
					component={Analysis}
					exact
				/>

				<ProtectedRoute
					path="/admin/products"
					isAdmin={true}
					component={ProductsList}
					exact
				/>
				<ProtectedRoute
					path="/admin/product"
					isAdmin={true}
					component={NewProduct}
					exact
				/>
				<ProtectedRoute
					path="/admin/product/:id"
					isAdmin={true}
					component={UpdateProduct}
					exact
				/>
				<ProtectedRoute
					path="/admin/orders"
					isAdmin={true}
					component={OrdersList}
					exact
				/>
				<ProtectedRoute
					path="/admin/order/:id"
					isAdmin={true}
					component={ProcessOrder}
					exact
				/>
				<ProtectedRoute
					path="/admin/users"
					isAdmin={true}
					component={UsersList}
					exact
				/>
				<ProtectedRoute
					path="/admin/user/:id"
					isAdmin={true}
					component={UpdateUser}
					exact
				/>
				<ProtectedRoute
					path="/admin/reviews/"
					isAdmin={true}
					component={AllReviews}
					exact
				/>

				<ProtectedRoute
					path="/admin/employees"
					isAdmin={true}
					component={EmployeesList}
					exact
				/>
				<ProtectedRoute
					path="/admin/employee"
					isAdmin={true}
					component={NewEmployee}
					exact
				/>
				<ProtectedRoute
					path="/admin/employee/:id"
					isAdmin={true}
					component={UpdateEmployee}
					exact
				/>

				<ProtectedRoute
					path="/admin/suppliers"
					isAdmin={true}
					component={SuppliersList}
					exact
				/>
				<ProtectedRoute
					path="/admin/supplier"
					isAdmin={true}
					component={NewSupplier}
					exact
				/>
				<ProtectedRoute
					path="/admin/supplier/:id"
					isAdmin={true}
					component={UpdateSupplier}
					exact
				/>

				<ProtectedRoute
					path="/admin/userOrdersList/:id"
					isAdmin={true}
					component={UserOrdersList}
					exact
				/>

				<ProtectedRoute
					path="/admin/supplierProductList/:id"
					isAdmin={true}
					component={SupplierProductList}
					exact
				/>

				<ProtectedRoute
					path="/admin/productReviews/:id"
					isAdmin={true}
					component={ProductReviews}
					exact
				/>

				<ProtectedRoute
					path="/admin/deliveries"
					isAdmin={true}
					component={DeliveriesList}
					exact
				/>
				<ProtectedRoute
					path="/admin/delivery"
					isAdmin={true}
					component={NewDelivery}
					exact
				/>
				<ProtectedRoute
					path="/admin/delivery/:id"
					isAdmin={true}
					component={UpdateDelivery}
					exact
				/>

				<Footer />
			</div>
		</Router>
	);
}

export default App;
