import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    FETCH_USER_SUCCESS
} from './authTypes';

import api from '../../api';

export const authStart = () => {
    return {
        type: AUTH_START,
    }
}

export const authSuccess = (token, username, id) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        username: username,
        id: id
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
    // console.log('FETCH_USER ACTION CALLED', username)
    
    return dispatch => {
        api.get(`api/users/username/${username}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            dispatch(fetchUserSuccess(res.data.id))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const fetchUserSuccess = (userId) => {
    return {
        type: FETCH_USER_SUCCESS,
        userId: userId
    }
}

export const authLogin = (username, password) => {
    return (dispatch, getState) => {
        dispatch(authStart())
        api.post('rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            console.log('login res', res);
            const token = res.data.key
            
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

            localStorage.setItem('expirationDate', expirationDate)
            dispatch(fetchUser(token, username))
            const userId = getState().auth.userId
            dispatch(authSuccess(token, username, userId))            
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            // console.log(err)
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password, passwordConfirmed) => {
    return (dispatch, getState) => {
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
            const userId = getState().auth.userId
            dispatch(authSuccess(token, username, userId))     
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