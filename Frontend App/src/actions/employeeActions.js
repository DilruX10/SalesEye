import axios from "axios";

import {
	ADMIN_EMPLOYEES_FAIL,
	ADMIN_EMPLOYEES_REQUEST,
	ADMIN_EMPLOYEES_SUCCESS,
	CLEAR_ERRORS,
	DELETE_EMPLOYEE_FAIL,
	DELETE_EMPLOYEE_REQUEST,
	DELETE_EMPLOYEE_SUCCESS,
	EMPLOYEE_DETAILS_FAIL,
	EMPLOYEE_DETAILS_REQUEST,
	EMPLOYEE_DETAILS_SUCCESS,
	NEW_EMPLOYEE_FAIL,
	NEW_EMPLOYEE_REQUEST,
	NEW_EMPLOYEE_SUCCESS,
	UPDATE_EMPLOYEE_FAIL,
	UPDATE_EMPLOYEE_REQUEST,
	UPDATE_EMPLOYEE_SUCCESS,
} from "../constants/employeeConstants";

export const newEmployee = (employeeData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_EMPLOYEE_REQUEST }); //indicate that a request has been initiated.

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}; //configuration object that will be passed as an argument to the axios.post method.\

		//makes a POST request to the specified API endpoint
		const { data } = await axios.post(
			`/api/v1/admin/employee/new`,
			employeeData,
			config
		);

		dispatch({
			type: NEW_EMPLOYEE_SUCCESS,
			payload: data,
		}); // successful response has been received from the server.
	} catch (error) {
		dispatch({
			type: NEW_EMPLOYEE_FAIL, // error occurred during the request
			payload: error.response.data.message,
		});
	}
};

// Delete employee (Admin)
export const deleteEmployee = (id) => async (dispatch) => {
	//accepts a id parameter for delete
	try {
		dispatch({ type: DELETE_EMPLOYEE_REQUEST }); //dispatch an action which gives signals the start of the deletion process

		// sends a DELETE request---->employee id
		const { data } = await axios.delete(`/api/v1/admin/employee/${id}`);

		dispatch({
			type: DELETE_EMPLOYEE_SUCCESS, //dispatches an action of type
			payload: data.success, //indicating that the deletion was successful
		});
	} catch (error) {
		dispatch({
			type: DELETE_EMPLOYEE_FAIL, //dispatches an action of type
			payload: error.response.data.message, //indicating that the deletion has failed.
		});
	}
};

// Update Employee (ADMIN)
export const updateEmployee = (id, employeeData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(
			`/api/v1/admin/employee/${id}`,
			employeeData,
			config
		);

		dispatch({
			type: UPDATE_EMPLOYEE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_EMPLOYEE_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getAdminEmployees = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_EMPLOYEES_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/employees`);

		dispatch({
			type: ADMIN_EMPLOYEES_SUCCESS,
			payload: data.employees,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_EMPLOYEES_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getEmployeeDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: EMPLOYEE_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/employee/${id}`);

		dispatch({
			type: EMPLOYEE_DETAILS_SUCCESS,
			payload: data.employee,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear Errors
//clear any errors that may have been previously set in the store
//useful--->can start fresh without errors happened in previous
//this clear previous errors and start freshly
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
