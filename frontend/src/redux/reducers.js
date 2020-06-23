import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // local storage

import authReducer from './auth/auth.reducer'
import roadmapReducer from './roadmap/roadmap.reducer'
import disciplineReducer from './discipline/discipline.reducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'roadmap', 'discipline']
}

const appReducer = combineReducers({
    auth: authReducer,
    roadmap: roadmapReducer,
    discipline: disciplineReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        storage.removeItem('persist:root');
        state = undefined;
    }
    
    return appReducer(state, action);
}

export default persistReducer(persistConfig, rootReducer)