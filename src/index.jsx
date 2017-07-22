import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './store';
import Home from './scenes/Home/index';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        logger,
    ),
);

render(
    <Provider store={store} >
        <Home />
    </Provider>,
    document.getElementById('app'),
);
