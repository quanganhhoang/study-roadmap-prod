import AuthActionTypes from './auth.types'

const INITIAL_STATE = {
    token: null,
    error: null,
    loading: false,
    user: null,
}

// const signInStart = (state) => {
//     return {
//         ...state,
//         error: null,
//         loading: true
//     }
// }

const signInSuccess = (state, action) => {
    return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        error: null,
        loading: false,
    }
}

const signInFail = (state, action) => {
    return {
        ...state,
        error: action.payload,
        loading: false,
    }
}

const signUpSuccess = (state, action) => {
    return {
        ...state,
        token: action.payload.token,
        username: action.payload.username
    }
}

const signUpFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const logoutSuccess = (state) => {
    return {
        ...state,
        token: null,
        user: null,
        username: null
    }
}

const logoutFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const fetchUserSuccess = (state, action) => {
    return {
        ...state,
        user: action.payload,
        loading: false,
    }
}

const fetchUserFail = (state, action) => {
    return {
        ...state,
        user: null,
        loading: false,
        error: action.payload
    }
}

const authReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthActionTypes.SIGN_IN_FAIL:
            return signInFail(state, action)
        case AuthActionTypes.SIGN_IN_SUCCESS:
            return signInSuccess(state, action)

        case AuthActionTypes.SIGN_UP_SUCCESS:
            return signUpSuccess(state, action)
        case AuthActionTypes.SIGN_UP_FAIL:
            return signUpFail(state, action)

        case AuthActionTypes.LOGOUT_SUCCESS:
            return logoutSuccess(state, action)
        case AuthActionTypes.LOGOUT_FAIL:
            return logoutFail(state, action)

        case AuthActionTypes.FETCH_USER_SUCCESS:
            return fetchUserSuccess(state, action);
        case AuthActionTypes.FETCH_USER_FAIL:
            return fetchUserFail(state, action);

        default:
            return state
    }
}

export default authReducer;