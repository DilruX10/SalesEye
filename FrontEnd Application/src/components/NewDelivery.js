import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newDelivery } from "../../actions/deliveryActions";
import { NEW_DELIVERY_RESET } from "../../constants/deliveryConstants";

const NewDelivery = ({ history }) => {
  const [name, setName] = useState("");
  const [adress, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [diliveryPerson, setdiliveryPerson] = useState("");
  const [remark, setRemark] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newDelivery);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/deliveries");
      alert.success("Dilivery added successfully");
      dispatch({ type: NEW_DELIVERY_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Phone number validation (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      alert.error("Please enter a valid 10-digit phone number");
      return;
    }

    // Email validation
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert.error("Please enter a valid email address");
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("adress", adress);
    formData.set("phoneNumber", phoneNumber);
    formData.set("email", email);
    formData.set("diliveryPerson", diliveryPerson);
    formData.set("remark", remark);

    dispatch(newDelivery(formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Delivery"} />
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
                <h1 className="mb-4">New Delivery</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Customer Name</label>
                  <input
                    type="text"
                    id="name_field"
                    pattern="^[a-zA-Z].{5,}$"
                    title="Name should start with a letter and contain 5 or more characters"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber_field">Phone Number</label>
                  <input
                    type="number"
                    id="phoneNumber_field"
                    className="form-control"
                    value={phoneNumber}
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="diliveryPerson_field">DeliveryPerson</label>
                  <input
                    type="text"
                    id="diliveryPerson_field"
                    className="form-control"
                    value={diliveryPerson}
                    onChange={(e) => setdiliveryPerson(e.target.value)}
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

export default NewDelivery;
