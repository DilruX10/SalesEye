import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getSupplierDetails,
	updateSupplier,
} from "../../actions/supplierActions";
import { UPDATE_SUPPLIER_RESET } from "../../constants/supplierConstants";

const UpdateSupplier = ({ match, history }) => {
	const [name, setName] = useState("");
	const [nic, setNic] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, supplier } = useSelector((state) => state.supplierDetails);
	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.supplier);

	const supplierId = match.params.id;

	useEffect(() => {
		if (supplier && supplier._id !== supplierId) {
			dispatch(getSupplierDetails(supplierId));
		} else {
			setName(supplier.name);
			setNic(supplier.nic);
			setPhoneNumber(supplier.phoneNumber);
			setEmail(supplier.email);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			history.push("/admin/suppliers");
			alert.success("Supplier updated successfully");
			dispatch({ type: UPDATE_SUPPLIER_RESET });
		}
	}, [
		dispatch,
		alert,
		error,
		isUpdated,
		history,
		updateError,
		supplier,
		supplierId,
	]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set("name", name);
		formData.set("nic", nic);
		formData.set("phoneNumber", phoneNumber);
		formData.set("email", email);

		dispatch(updateSupplier(supplier._id, formData));
	};

	return (
		<Fragment>
			<MetaData title={"Update Supplier"} />
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
								<h1 className="mb-4">Update Supplier</h1>

								<div className="form-group">
									<label htmlFor="name_field">Name</label>
									<input
										type="text"
										id="name_field"
										className="form-control"
										value={name}
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
										onChange={(e) => setNic(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="phoneNumber_field">
										Phone Number
									</label>
									<input
										type="number"
										id="phoneNumber_field"
										className="form-control"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email_field">Email</label>
									<input
										type="text"
										id="email_field"
										className="form-control"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<button
									id="login_button"
									type="submit"
									className="btn btn-block py-3"
									disabled={loading ? true : false}
								>
									UPDATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateSupplier;
