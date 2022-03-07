import Cookie from 'js-cookie'
import { deleteData, getData, patchData, postData } from '../../utils/fetchData'
import {
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    GET_TOKEN_REQUEST, GET_TOKEN_SUCCESS, GET_TOKEN_FAIL,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    ACTIVATE_EMAIL_REQUEST, ACTIVATE_EMAIL_SUCCESS, ACTIVATE_EMAIL_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL,
    UPDATE_ROLE_REQUEST, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_FAIL,
    FETCH_CURRENT_USER_REQUEST, FETCH_CURRENT_USER_SUCCESS, FETCH_CURRENT_USER_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    FETCH_ALL_USER_REQUEST, FETCH_ALL_USER_SUCCESS, FETCH_ALL_USER_FAIL,
    FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAIL,
} from './types'

export const signin = (email, password, router) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        const data = await postData('user/login', { email, password })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        Cookie.set('refreshTokenn', data?.refresh_token, {
            path: 'api/user/refreshtoken',
            expires: 7
        })
        localStorage.setItem('firstLogin', true)
        router.push('/')
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        })
    }
}

export const signup = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })
        const data = await postData('user/register', { name, email, password })
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.msg,
        })
        console.log(data);
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        })
    }
}

export const getToken = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_TOKEN_REQUEST,
        })
        const data = await postData('user/refreshtoken', null)
        dispatch({
            type: GET_TOKEN_SUCCESS,
            payload: data.access_token,
        })
    } catch (error) {
        dispatch({
            type: GET_TOKEN_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        })
    }
}
export const getCurrentUser = (token) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_CURRENT_USER_REQUEST,
        })
        const data = await getData('user/current', token)
        dispatch({
            type: FETCH_CURRENT_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_CURRENT_USER_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        })
    }
}
export const activateEmail = (activation_token) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIVATE_EMAIL_REQUEST,
        })
        const data = await postData('user/activate', activation_token)
        dispatch({
            type: ACTIVATE_EMAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ACTIVATE_EMAIL_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        })
    }
}

export const deleteUser = (id, token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        })
        const data = await deleteData(`user/${id}`, token)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: DELETE_USER_FAIL,
            payload: message,
        })
    }
}

export const updateRoleUser = (id, role, token, router) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ROLE_REQUEST,
        })
        const data = await patchData(`user/${id}`, role, token)
        dispatch({
            type: UPDATE_ROLE_SUCCESS,
            payload: data,
        })
        router.push('/admin/users')
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: UPDATE_ROLE_FAIL,
            payload: message,
        })
    }
}

export const fetchUsers = (token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_ALL_USER_REQUEST,
        })
        const data = await getData('user', token)
        dispatch({
            type: FETCH_ALL_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: FETCH_ALL_USER_FAIL,
            payload: message,
        })
    }
}

export const forgotPass = (email) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        })
        const data = await postData(`user/forgotpassword`, email)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: message,
        })
    }
}

export const resetPass = (newPassword, token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        })
        const data = await patchData(`user/resetpassword`, newPassword, token)
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: message,
        })
    }
}

export const fetchUser = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_USER_REQUEST,
        })
        const data = await getData(`user/${id}`, token)
        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_USER_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        })
    }
}

export const updateProfile = (user, token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
        })
        const data = await patchData(`user/updateprofile`, user, token)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}