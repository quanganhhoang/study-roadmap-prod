import { all, call } from 'redux-saga/effects'

import { authSagas } from './auth/auth.sagas'
import { roadmapSagas } from './roadmap/roadmap.sagas'
import { disciplineSagas } from './discipline/discipline.sagas'

export default function* rootSaga() {
    yield all([
        call(authSagas),
        // call(roadmapSagas), 
        // call(disciplineSagas)
    ])
}