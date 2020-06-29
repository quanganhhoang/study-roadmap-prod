import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import reduxLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer'
import rootSaga from './root-saga'


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(reduxLogger)
}

export const store = createStore(rootReducer, composeEnhancer(
    applyMiddleware(...middlewares)
));
// export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)