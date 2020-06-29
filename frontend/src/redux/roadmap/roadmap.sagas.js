import { takeLatest, call, put, all } from 'redux-saga/effects';

import RoadmapActionTypes from './roadmap.types';

export function* fetchAllRoadmaps() {
    yield console.log('Fetch all roadmaps saga fired');
}

export function* fetchAllRoadmapSuccess() {

}

export function* fetchMostPopularRoadmaps() {
    yield console.log('Fetch most popular roadmaps saga fired');
}

export function* fetchMostPopularRoadmapSuccess() {

}

export function* fetchHighestRatedRoadmaps() {
    yield console.log('Fetch highest rataed roadmaps saga fired');
}

export function* fetchHighestRatedRoadmapSuccess() {

}

export function* fetchRoadmapsByUser() {
    yield console.log('Fetch roadmaps by user saga fired');
}

export function* fetchRoadmapsByUserSuccess() {

}

export function* fetchRoadmaps() {
    try {
        const allRoadmaps = yield call(fetchAllRoadmaps);
        const mostPopularRoadmaps = yield call(fetchMostPopularRoadmaps);
        const highestRatedRoadmaps = yield call(fetchHighestRatedRoadmaps);
        const roadmapsByUser = yield call(fetchRoadmapsByUser);

        yield put(fetchAllRoadmapSuccess(allRoadmaps));
        yield put(fetchMostPopularRoadmapSuccess(mostPopularRoadmaps));
        yield put(fetchHighestRatedRoadmapSuccess(highestRatedRoadmaps));
        yield put(fetchRoadmapsByUserSuccess(roadmapsByUser));
    } catch (error) {
        yield put(fetchRoadmapsFailure(error.message));
    }
}

export function* fetchRoadmapsFailure(error) {

}

export function* fetchRoadmapStart() {
    yield takeLatest(
        RoadmapActionTypes.FETCH_ALL_ROADMAP,
        fetchRoadmaps
    )
}

export function* userSagas() {
    yield all([
        
    ]);
}
