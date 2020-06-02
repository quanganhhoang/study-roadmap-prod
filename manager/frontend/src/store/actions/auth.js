import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, username) => {
    console.log('authSuccess', username)
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username,
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('expirationDate')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://localhost:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key
            
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

            // save in browser
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('username', username)
            dispatch(authSuccess(token, username))
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password, passwordConfirmed) => {
  return dispatch => {
    dispatch(authStart())
    axios.post('http://localhost:8000/rest-auth/registration/', {
      username: username,
      email: email,
      password1: password,
      password2: passwordConfirmed
    })
    .then(res => {
        const token = res.data.key
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

        // save in browser
        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('username', username)
        dispatch(authSuccess(token, username))
        dispatch(checkAuthTimeout(3600))
    })
    .catch(err => {
        dispatch(authFail(err))
    })
  }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (token === undefined) {
            dispatch(logout)
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout)
            } else {
                console.log("authCheckState called")
                const username = localStorage.getItem('username')
                dispatch(authSuccess(token, username))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}