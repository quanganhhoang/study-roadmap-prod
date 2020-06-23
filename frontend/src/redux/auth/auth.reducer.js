import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    FETCH_USER_SUCCESS
} from './auth.types'


const INITIAL_STATE = {
    token: null,
    error: null,
    loading: false,
    username: null,
    userId: null,
}

const authStart = (state) => {
    return {
        ...state,
        error: null,
        loading: true
    }
}

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        error: null,
        loading: false,
        username: action.username,
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    }
}

const authLogout = (state) => {
    return {
        ...state,
        token: null,
        username: null,
        userId: null
    }
}

const fetchUserSuccess = (state, action) => {
    return {
        ...state,
        userId: action.userId
    }
}

const authReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_START:
            return authStart(state, action)
        case AUTH_FAIL:
            return authFail(state, action)
        case AUTH_SUCCESS:
            return authSuccess(state, action)
        case AUTH_LOGOUT:
            return authLogout(state, action)
        case FETCH_USER_SUCCESS:
            return fetchUserSuccess(state, action)
        default:
            return state
    }
}

export default authReducer;