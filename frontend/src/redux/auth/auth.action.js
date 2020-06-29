import AuthActionTypes from './auth.types';

export const signInStart = (usernameAndPassword) => ({
    type: AuthActionTypes.SIGN_IN_START,
    payload: usernameAndPassword
})

export const signInSuccess = (token, username) => {
    return {
        type: AuthActionTypes.SIGN_IN_SUCCESS,
        payload: {
            token: token,
            username: username
        },
    }
}

export const signInFail = error => {
    return {
        type: AuthActionTypes.SIGN_IN_FAIL,
        payload: error,
    }
}

export const signUpStart = (userCredentials) => {
    return {
        type: AuthActionTypes.SIGN_UP_START,
        payload: userCredentials
    }
}

export const signUpSuccess = (token, username) => {
    return {
        type: AuthActionTypes.SIGN_UP_SUCCESS,
        payload: {
            token: token,
            username: username
        },
    }
}

export const signUpFail = (error) => {
    return {
        type: AuthActionTypes.SIGN_UP_FAIL,
        payload: error
    }
}

export const logoutStart = () => {
    return {
        type: AuthActionTypes.LOGOUT_START
    }
}

export const logoutSuccess = () => {
    return {
        type: AuthActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutFail = (error) => {
    return {
        type: AuthActionTypes.LOGOUT_FAIL,
        payload: error
    }
}

// export const checkAuthTimeout = expirationTime => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout())
//         }, expirationTime * 1000)
//     }
// }

export const fetchUserSuccess = (user) => {
    return {
        type: AuthActionTypes.FETCH_USER_SUCCESS,
        payload: user
    }
}

export const fetchUserFail = (err) => {
    return {
        type: AuthActionTypes.FETCH_USER_FAIL,
        payload: err
    }
}

// export const authLogin = (username, password) => {
//     return (dispatch) => {
//         dispatch(authStart())
//         api.post('rest-auth/login/', {
//             username: username,
//             password: password
//         })
//         .then(res => {
//             const token = res.data.key
            
//             const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

//             localStorage.setItem('expirationDate', expirationDate)
//             dispatch(fetchUser(token, username))
//             dispatch(authSuccess(token))            
//             dispatch(checkAuthTimeout(3600))
//         })
//         .catch(err => {
//             console.log(err)
//             dispatch(authFail(err))
//         })
//     }
// }

// export const authSignup = (username, email, password, passwordConfirmed) => {
//     // (dispatch, getState)
//     return (dispatch) => {
//         dispatch(authStart())
//         api.post('rest-auth/registration/', {
//             username: username,
//             email: email,
//             password: password,
//             passwordConfirmed: passwordConfirmed
//         })
//         .then(res => {
//             const token = res.data.key
//             const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

//             // save in browser
//             localStorage.setItem('expirationDate', expirationDate)
//             dispatch(fetchUser(token, username))
//             dispatch(authSuccess(token))     
//             dispatch(checkAuthTimeout(3600))
//         })
//         .catch(err => {
//             console.log('err', err)
//             dispatch(authFail(err))
//         })
//     }
// }

// export const authCheckState = () => {
//     return (dispatch, getState) => {
//         const token = getState().auth.token
//         if (token === undefined) {
//             dispatch(logout)
//         } else {
//             const expirationDate = new Date(localStorage.getItem('expirationDate'))
//             if (expirationDate <= new Date()) {
//                 dispatch(logout)
//             } else {
//                 dispatch(authSuccess(token))
//                 dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
//             }
//         }
//     }
// }