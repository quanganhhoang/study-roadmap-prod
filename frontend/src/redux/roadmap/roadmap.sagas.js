import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import RoadmapActionTypes from './roadmap.types';
import * as roadmapActions from './roadmap.action'
import AuthActionTypes from '../auth/auth.types'
import api from '../../api';

const getAuth = state => state.auth;

export function* fetchAllRoadmaps() {
    try {
        const res = yield api.get('api/roadmaps/')
        
        yield put(roadmapActions.fetchAllRoadmapSuccess(res.data.results))
    } catch (error) {
        yield put(roadmapActions.fetchAllRoadmapFail(error))
    }
}

export function* fetchMostPopularRoadmaps() {
    try {
        const res = yield api.get('api/roadmaps/most-popular/')
        
        yield put(roadmapActions.fetchMostPopularRoadmapsSuccess(res.data))
    } catch (error) {
        yield put(roadmapActions.fetchMostPopularRoadmapsFail(error))
    }
}

export function* fetchHighestRatedRoadmaps() {
    try {
        const res = yield api.get('api/roadmaps/highest-rated/')

        yield put(roadmapActions.fetchHighestRatedRoadmapsSuccess(res.data))
    } catch (error) {
        yield put(roadmapActions.fetchHighestRatedRoadmapsFail(error))
    }
}

export function* fetchRoadmapsByUser() {
    const auth = yield select(getAuth);
    const { token, user } = auth;
    try {
        const res = yield api.get(`api/users/${user.id}/roadmaps/`, {
            headers: {
                Authorization: token ? `Token ${token}` : ''
            }
        })

        yield put(roadmapActions.fetchRoadmapsByUserSuccess(res.data.results));
    } catch (error) {
        yield put(roadmapActions.fetchRoadmapsByUserFail(error));
    }
}

export function* searchRoadmaps({ payload: searchTerm }) {
    try {
        const res = yield api.get(`api/roadmaps?search=${searchTerm}`)

        yield put(roadmapActions.searchRoadmapSuccess(res.data.results))
    } catch (error) {
        yield put(roadmapActions.searchRoadmapFail(error))
    }
}

export function* fetchAll() {
    yield all([
        call(fetchAllRoadmaps), 
        call(fetchMostPopularRoadmaps), 
        call(fetchHighestRatedRoadmaps)
    ])
}

export function* watchFetchRoadmaps() {
    yield takeLatest(
        RoadmapActionTypes.FETCH_ROADMAPS_REQUESTED,
        fetchAll
    )
}

export function* watchFetchUser() {
    yield takeLatest(
        AuthActionTypes.FETCH_USER_SUCCESS,
        fetchRoadmapsByUser
    )
}

export function* watchSearch() {
    yield takeLatest(
        RoadmapActionTypes.SEARCH_ROADMAPS_START,
        searchRoadmaps
    )
}

export function* roadmapSagas() {
    yield all([
        call(watchFetchUser),
        call(watchFetchRoadmaps),
        call(watchSearch)
    ]);
}
