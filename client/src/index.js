import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from 'store'
import history from 'routes/history';
import { Router, Route } from 'react-router-dom';

import 'css/flatly-bootstrap.min.css';
import 'css/main.css';

import Header from 'components/Header';
import Home from 'components/Home';
import Reports from 'components/Reports';
import ToastContainer from './components/common/toast/ToastContainer';



const app = document.getElementById('root');

render(
    <Provider store={store}>
        <div style={{ height: '100%' }}>
            <Header />
            <Router history={history}>
                <div style={{ height: '100%' }}>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/reports' component={Reports} />
                </div>
            </Router>
            <ToastContainer />
        </div>
    </Provider>
    , app);