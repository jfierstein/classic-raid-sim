import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import events from './events';

let debug = (process.env.NODE_ENV !== 'production');

const enhancers = [];
const middleware = [promise(), thunk, events];

if (debug) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    middleware.push(logger);
    if (typeof devToolsExtension === 'function')
        enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);


export default createStore(
    reducer,
    {},
    composedEnhancers
);