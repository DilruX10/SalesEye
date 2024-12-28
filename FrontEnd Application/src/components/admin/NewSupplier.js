import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newSupplier } from "../../actions/supplierActions";
import { NEW_SUPPLIER_RESET } from "../../constants/supplierConstants";

const NewSupplier = ({ history }) => {
	const [name, setName] = useState("");
	const [nic, setNic] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");

	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, success } = useSelector(
		(state) => state.newSupplier
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			history.push("/admin/suppliers");
			alert.success("Supplier added successfully");
			dispatch({ type: NEW_SUPPLIER_RESET });
		}
	}, [dispatch, alert, error, success, history]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set("name", name);
		formData.set("nic", nic);
		formData.set("phoneNumber", phoneNumber);
		formData.set("email", email);

		dispatch(newSupplier(formData));
	};

	return (
		<Fragment>
			<MetaData title={"New Supplier"} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<div className="wrapper my-5">
							<form
								className="shadow-lg"
								onSubmit={submitHandler}
								encType="multipart/form-data"
							>
								<h1 className="mb-4">New Supplier</h1>

								<div className="form-group">
									<label htmlFor="name_field">Name</label>
									<input
										type="text"
										id="name_field"
										className="form-control"
										value={name}
										pattern="^[a-zA-Z].{5,}$"
										title="Supplier name should start with a letter and contain 5 or more characters"
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="nic_field">NIC</label>
									<input
										type="text"
										id="nic_field"
										className="form-control"
										value={nic}
										pattern="^[a-zA-Z0-9].{9,}$"
										title="NIC should contain 10 alphanumerical characters"
										onChange={(e) => setNic(e.target.value)}
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="phoneNumber_field">
										Phone Number
									</label>
									<input
										type="text"
										id="phoneNumber_field"
										className="form-control"
										value={phoneNumber}
										pattern="^[0-9].{9,}$"
										title="Phone Number should contain 10 digits"
										onChange={(e) => setPhoneNumber(e.target.value)}
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email_field">Email</label>
									<input
										type="text"
										id="email_field"
										className="form-control"
										value={email}
										title="Invalid Email"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								<button
									id="login_button"
									type="submit"
									className="btn btn-block py-3"
									disabled={loading ? true : false}
								>
									CREATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default NewSupplier;
