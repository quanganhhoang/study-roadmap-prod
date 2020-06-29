import DisciplineActionTypes from './discipline.type'

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
        case DisciplineActionTypes.FETCH_ALL_DISCIPLINE_SUCCESS:
            return fetchAllDisciplines(state, action);
        case DisciplineActionTypes.FETCH_ALL_DISCIPLINE_FAIL:
            return fetchAllDisciplinesFail(state, action);
        default:
            return state
    }
}

export default disciplineReducer;