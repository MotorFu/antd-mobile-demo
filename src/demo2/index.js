import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Base from './Base';
import App from './App';
import Next from './Next';
import './index.css';
ReactDOM.render(
    (
        <Router history={hashHistory}>
          <Route path="/" component={Base}>
            <Route path="app" component={App}></Route>
            <Route path="next" component={Next}></Route>
          </Route>
        </Router>
    ),
    document.getElementById('root')
);
