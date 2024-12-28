import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getDeliveryDetails,
	updateDelivery,
} from "../../actions/deliveryActions";
import { UPDATE_DELIVERY_RESET } from "../../constants/deliveryConstants";

const UpdateDelivery = ({ match, history }) => {
	const [name, setName] = useState("");
	const [adress, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [diliveryPerson, setdiliveryPerson] = useState("");
	const [remark, setRemark] = useState("");

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, delivery } = useSelector((state) => state.deliveryDetails);
	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.delivery);

	const deliveryId = match.params.id;

	useEffect(() => {
		if (delivery && delivery._id !== deliveryId) {
			dispatch(getDeliveryDetails(deliveryId));
		} else {
			setName(delivery.name);
			setAddress(delivery.adress);
			setPhoneNumber(delivery.phoneNumber);
			setEmail(delivery.email);
			setdiliveryPerson(delivery.diliveryPerson);
			setRemark(delivery.remark);
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
			history.push("/admin/deliveries");
			alert.success("Delivery Updated Successfully");
			dispatch({ type: UPDATE_DELIVERY_RESET });
		}
	}, [
		dispatch,
		alert,
		error,
		isUpdated,
		history,
		updateError,
		delivery,
		deliveryId,
	]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set("name", name);
		formData.set("adress", adress);
		formData.set("phoneNumber", phoneNumber);
		formData.set("email", email);
		formData.set("diliveryPerson", diliveryPerson);
		formData.set("remark", remark);

		dispatch(updateDelivery(delivery._id, formData));
	};

	return (
		<Fragment>
			<MetaData title={"Update Delivery"} />
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
								<h1 className="mb-4">Update Delivery</h1>

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
									<label htmlFor="address_field">Address</label>
									<input
										type="text"
										id="address_field"
										className="form-control"
										value={adress}
										onChange={(e) => setAddress(e.target.value)}
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

								<div className="form-group">
									<label htmlFor="diliveryPerson_field">
										Delivered By
									</label>
									<input
										type="text"
										id="diliveryPerson_field"
										className="form-control"
										value={diliveryPerson}
										onChange={(e) =>
											setdiliveryPerson(e.target.value)
										}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="remark_field">Remark</label>
									<input
										type="text"
										id="remark_field"
										className="form-control"
										value={remark}
										onChange={(e) => setRemark(e.target.value)}
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

export default UpdateDelivery;
