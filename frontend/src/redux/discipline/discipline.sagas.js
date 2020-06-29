import { takeLatest, call, put, all } from 'redux-saga/effects';

import DisciplineActionTypes from './discipline.type'
import { fetchAllDisciplineSuccess, fetchAllDisciplineFail } from './discipline.action'

import api from '../../api';


export function* fetchAllDisciplines() {
    try {
        const res = yield api.get('api/roadmaps/disciplines/')

        yield put(fetchAllDisciplineSuccess(res.data));
    } catch (error) {
        yield put(fetchAllDisciplineFail(error));
    }
}

export function* watchFetchDiscipline() {
    yield takeLatest(
        DisciplineActionTypes.FETCH_ALL_DISCIPLINE_START,
        fetchAllDisciplines
    )
}

export function* disciplineSagas() {
    yield all([
        call(watchFetchDiscipline)
    ])
}