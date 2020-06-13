import {
    FETCH_ALL_DISCIPLINE_SUCCESS,
    FETCH_ALL_DISCIPLINE_FAIL,
} from '../actions/disciplineTypes';

const INITIAL_STATE = {
    disciplines: [],
    error: null,
}

const fetchAllDisciplines = (state, action) => {
    return {
        ...state,
        disciplines: action.payload
    }
}

const fetchAllDisciplinesFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const disciplineReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_DISCIPLINE_SUCCESS:
            return fetchAllDisciplines(state, action);
        case FETCH_ALL_DISCIPLINE_FAIL:
            return fetchAllDisciplinesFail(state, action);
        default:
            return state
    }
}

export default disciplineReducer;