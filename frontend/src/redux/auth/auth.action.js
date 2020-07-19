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

export const fetchUserRequested = () => {
    return {
        type: AuthActionTypes.FETCH_USER_REQUESTED,
    }
}

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