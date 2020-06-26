import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reduxLogger from 'redux-logger';

import reducers from './reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let middlewares = [reduxThunk]
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(reduxLogger)
}

export const store = createStore(reducers, composeEnhancer(
    applyMiddleware(...middlewares)
));

export const persistor = persistStore(store)

// export default { store, persistor };