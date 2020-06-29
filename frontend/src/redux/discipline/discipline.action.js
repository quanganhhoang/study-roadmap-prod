import DisciplineActionTypes from './discipline.type';


export const fetchAllDisciplineStart = () => {
    return {
        type: DisciplineActionTypes.FETCH_ALL_DISCIPLINE_START
    }
}

export const fetchAllDisciplineSuccess = (data) => {
    return {
        type: DisciplineActionTypes.FETCH_ALL_DISCIPLINE_SUCCESS,
        payload: data
    }
}

export const fetchAllDisciplineFail = (err) => {
    return {
        type: DisciplineActionTypes.FETCH_ALL_DISCIPLINE_FAIL,
        payload: err
    }
}