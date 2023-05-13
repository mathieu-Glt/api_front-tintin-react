import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App/App';

import { Provider } from 'react-redux';
import store from './store'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistStore}> */}
        <App />
    {/* </PersistGate> */}
  </Provider>,
  rootElement
);

