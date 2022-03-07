import {
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    GET_TOKEN_REQUEST, GET_TOKEN_SUCCESS, GET_TOKEN_FAIL,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    ACTIVATE_EMAIL_REQUEST, ACTIVATE_EMAIL_SUCCESS, ACTIVATE_EMAIL_FAIL,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL,
    UPDATE_ROLE_REQUEST, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    FETCH_CURRENT_USER_REQUEST, FETCH_CURRENT_USER_SUCCESS, FETCH_CURRENT_USER_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    FETCH_ALL_USER_REQUEST, FETCH_ALL_USER_SUCCESS, FETCH_ALL_USER_FAIL,
    FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAIL,
} from '../actions/types'

export const userLoginReducer = (state = { auth: {} }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                isLogged: true,
                auth: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                msg: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
export const getTokenReducer = (state = { token: '' }, action) => {
    switch (action.type) {
        case GET_TOKEN_REQUEST:
            return {
                loading: true
            }
        case GET_TOKEN_SUCCESS:
            return {
                loading: false,
                token: action.payload
            }
        case GET_TOKEN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getAllUsersReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_USER_REQUEST:
            return {
                loading: true
            }
        case FETCH_ALL_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case FETCH_ALL_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getCurrentUserReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CURRENT_USER_REQUEST:
            return {
                loading: true
            }
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case FETCH_CURRENT_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getUserReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case FETCH_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                msg: action.payload,
            };
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        default:
            return state
    }
}
export const activateEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIVATE_EMAIL_REQUEST:
            return {
                loading: true
            }
        case ACTIVATE_EMAIL_SUCCESS:
            return {
                loading: false,
                activatetoken: action.payload
            }
        case ACTIVATE_EMAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return { loading: true }
        case DELETE_USER_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case DELETE_USER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateRoleUserReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ROLE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                user: action.payload,
            };
        case UPDATE_ROLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        default:
            return state
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                msg: action.payload,
            };
        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        default:
            return state
    }
}

export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                msg: action.payload,
            };
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        default:
            return state
    }
}