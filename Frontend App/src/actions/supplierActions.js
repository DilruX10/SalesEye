import axios from "axios";

import {
	ADMIN_SUPPLIERS_REQUEST,
	ADMIN_SUPPLIERS_SUCCESS,
	ADMIN_SUPPLIERS_FAIL,
	NEW_SUPPLIER_REQUEST,
	NEW_SUPPLIER_SUCCESS,
	NEW_SUPPLIER_FAIL,
	DELETE_SUPPLIER_REQUEST,
	DELETE_SUPPLIER_SUCCESS,
	DELETE_SUPPLIER_FAIL,
	UPDATE_SUPPLIER_REQUEST,
	UPDATE_SUPPLIER_SUCCESS,
	UPDATE_SUPPLIER_FAIL,
	SUPPLIER_DETAILS_REQUEST,
	SUPPLIER_DETAILS_SUCCESS,
	SUPPLIER_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "../constants/supplierConstants";

export const newSupplier = (supplierData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_SUPPLIER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			`/api/v1/admin/supplier/new`,
			supplierData,
			config
		);

		dispatch({
			type: NEW_SUPPLIER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_SUPPLIER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Delete employee (Admin)
export const deleteSupplier = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_SUPPLIER_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/supplier/${id}`);

		dispatch({
			type: DELETE_SUPPLIER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_SUPPLIER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update Employee (ADMIN)
export const updateSupplier = (id, supplierData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_SUPPLIER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(
			`/api/v1/admin/supplier/${id}`,
			supplierData,
			config
		);

		dispatch({
			type: UPDATE_SUPPLIER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_SUPPLIER_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getAdminSuppliers = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_SUPPLIERS_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/suppliers`);

		dispatch({
			type: ADMIN_SUPPLIERS_SUCCESS,
			payload: data.suppliers,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_SUPPLIERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getSupplierDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: SUPPLIER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/supplier/${id}`);

		dispatch({
			type: SUPPLIER_DETAILS_SUCCESS,
			payload: data.supplier,
		});
	} catch (error) {
		dispatch({
			type: SUPPLIER_DETAILS_FAIL,
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
