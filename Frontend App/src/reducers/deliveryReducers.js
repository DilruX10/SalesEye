import {
    
    ADMIN_DELIVERIES_REQUEST,
    ADMIN_DELIVERIES_SUCCESS,
    ADMIN_DELIVERIES_FAIL,
    NEW_DELIVERY_REQUEST,
    NEW_DELIVERY_SUCCESS,
    NEW_DELIVERY_RESET,
    NEW_DELIVERY_FAIL,
    DELETE_DELIVERY_REQUEST,
    DELETE_DELIVERY_SUCCESS,
    DELETE_DELIVERY_RESET,
    DELETE_DELIVERY_FAIL,
    UPDATE_DELIVERY_REQUEST,
    UPDATE_DELIVERY_SUCCESS,
    UPDATE_DELIVERY_RESET,
    UPDATE_DELIVERY_FAIL,
    DELIVERY_DETAILS_REQUEST,
    DELIVERY_DETAILS_SUCCESS,
    DELIVERY_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/deliveryConstants'

export const deliveriesReducer = (state = { deliveries: [] }, action) => {
    switch (action.type) {
        case ADMIN_DELIVERIES_REQUEST:
            return {
                loading: true,
                deliveries: []
            }

        case ADMIN_DELIVERIES_SUCCESS:
            return {
                loading: false,
                deliveries: action.payload
            }

        case ADMIN_DELIVERIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newDeliveryReducer = (state = { delivery: {} }, action) => {
    switch (action.type) {

        case NEW_DELIVERY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_DELIVERY_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                delivery: action.payload.delivery
            }

        case NEW_DELIVERY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_DELIVERY_RESET:
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

export const deliveryReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_DELIVERY_REQUEST:
        case UPDATE_DELIVERY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_DELIVERY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_DELIVERY_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload
                }


        case DELETE_DELIVERY_FAIL:
        case UPDATE_DELIVERY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_DELIVERY_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_DELIVERY_RESET:
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

export const deliveryDetailsReducer = (state = { delivery: {} }, action) => {
    switch (action.type) {

        case DELIVERY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELIVERY_DETAILS_SUCCESS:
            return {
                loading: false,
                delivery: action.payload
            }

        case DELIVERY_DETAILS_FAIL:
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