import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // local storage

import authReducer from './authReducer'
import roadmapReducer from './roadmapReducer'
import disciplineReducer from './disciplineReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'roadmap', 'discipline']
}

const rootReducer = combineReducers({
    auth: authReducer,
    roadmap: roadmapReducer,
    discipline: disciplineReducer,
});

export default persistReducer(persistConfig, rootReducer)