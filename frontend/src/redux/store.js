import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import reduxLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware]
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(reduxLogger)
}

export const store = createStore(reducers, composeEnhancer(
    applyMiddleware(...middlewares)
));

// sagaMiddleware.run()

export const persistor = persistStore(store)

// export default { store, persistor };