// handles the state updates for the employee-related actions
//reducer==>take->currentState--->return--->new state object based

import {
    
    ADMIN_EMPLOYEES_REQUEST,
    ADMIN_EMPLOYEES_SUCCESS,
    ADMIN_EMPLOYEES_FAIL,
    NEW_EMPLOYEE_REQUEST,
    NEW_EMPLOYEE_SUCCESS,
    NEW_EMPLOYEE_RESET,
    NEW_EMPLOYEE_FAIL,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_RESET,
    DELETE_EMPLOYEE_FAIL,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_RESET,
    UPDATE_EMPLOYEE_FAIL,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_SUCCESS,
    EMPLOYEE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/employeeConstants'

//managing state related to employees
export const employeesReducer = (state = { employees: [] }, action) => {
    switch (action.type) {
        case ADMIN_EMPLOYEES_REQUEST:
            return {
                loading: true,
                employees: []
            }

        case ADMIN_EMPLOYEES_SUCCESS:
            return {
                loading: false,
                employees: action.payload
            }

        case ADMIN_EMPLOYEES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null//returns a new state object with error set to null
            }

        default:
            return state;
    }
}

export const newEmployeeReducer = (state = { employee: {} }, action) => {
    switch (action.type) {

        case NEW_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                employee: action.payload.employee
            }

        case NEW_EMPLOYEE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_EMPLOYEE_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const employeeReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_EMPLOYEE_REQUEST:
        case UPDATE_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_EMPLOYEE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload
                }


        case DELETE_EMPLOYEE_FAIL:
        case UPDATE_EMPLOYEE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_EMPLOYEE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_EMPLOYEE_RESET:
                return {
                    ...state,
                    isUpdated: false
                }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const employeeDetailsReducer = (state = { employee: {} }, action) => {
    switch (action.type) {

        case EMPLOYEE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case EMPLOYEE_DETAILS_SUCCESS:
            return {
                loading: false,
                employee: action.payload
            }

        case EMPLOYEE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}