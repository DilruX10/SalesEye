import axios from "axios";

import {
	ADMIN_DELIVERIES_FAIL,
	ADMIN_DELIVERIES_REQUEST,
	ADMIN_DELIVERIES_SUCCESS,
	CLEAR_ERRORS,
	DELETE_DELIVERY_FAIL,
	DELETE_DELIVERY_REQUEST,
	DELETE_DELIVERY_SUCCESS,
	DELIVERY_DETAILS_FAIL,
	DELIVERY_DETAILS_REQUEST,
	DELIVERY_DETAILS_SUCCESS,
	NEW_DELIVERY_FAIL,
	NEW_DELIVERY_REQUEST,
	NEW_DELIVERY_SUCCESS,
	UPDATE_DELIVERY_FAIL,
	UPDATE_DELIVERY_REQUEST,
	UPDATE_DELIVERY_SUCCESS,
} from "../constants/deliveryConstants";

export const newDelivery = (deliveryData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_DELIVERY_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			`/api/v1/admin/delivery/new`,
			deliveryData,
			config
		);

		dispatch({
			type: NEW_DELIVERY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_DELIVERY_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Delete delivery (Admin)
export const deleteDelivery = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_DELIVERY_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/delivery/${id}`);

		dispatch({
			type: DELETE_DELIVERY_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_DELIVERY_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update Delivery (ADMIN)
export const updateDelivery = (id, deliveryData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_DELIVERY_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(
			`/api/v1/admin/delivery/${id}`,
			deliveryData,
			config
		);

		dispatch({
			type: UPDATE_DELIVERY_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_DELIVERY_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getAdminDeliveries = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELIVERIES_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/deliveries`);

		dispatch({
			type: ADMIN_DELIVERIES_SUCCESS,
			payload: data.deliveries,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_DELIVERIES_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getDeliveryDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELIVERY_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/delivery/${id}`);

		dispatch({
			type: DELIVERY_DETAILS_SUCCESS,
			payload: data.delivery,
		});
	} catch (error) {
		dispatch({
			type: DELIVERY_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
