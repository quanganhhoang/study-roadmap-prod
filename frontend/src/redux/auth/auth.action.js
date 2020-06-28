import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    FETCH_USER_SUCCESS
} from './auth.types';

import api from '../../api';
import storage from 'redux-persist/lib/storage'; // local storage

export const authStart = () => {
    return {
        type: AUTH_START,
    }
}

export const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
    }
}

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    localStorage.removeItem('expirationDate')
    // clear storage used by redux-persist
    storage.removeItem('persist:root')
    return {
        type: AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const fetchUser = (token, username) => {
    return dispatch => {
        api.get(`api/users/username/${username}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            dispatch(fetchUserSuccess(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        user: user
    }
}

export const authLogin = (username, password) => {
    return (dispatch) => {
        dispatch(authStart())
        api.post('rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key
            
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

            localStorage.setItem('expirationDate', expirationDate)
            dispatch(fetchUser(token, username))
            dispatch(authSuccess(token))            
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password, passwordConfirmed) => {
    // (dispatch, getState)
    return (dispatch) => {
        dispatch(authStart())
        api.post('rest-auth/registration/', {
            username: username,
            email: email,
            password1: password,
            password2: passwordConfirmed
        })
        .then(res => {
            const token = res.data.key
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

            // save in browser
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(fetchUser(token, username))
            dispatch(authSuccess(token))     
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            console.log('err', err)
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        if (token === undefined) {
            dispatch(logout)
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout)
            } else {
                const username = getState().auth.username
                const userId = getState().auth.userId
                dispatch(authSuccess(token, username, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}