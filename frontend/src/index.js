import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store/store'

import App from './App'

console.log('REDUX STORE', store.getState())

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={ persistor }>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);