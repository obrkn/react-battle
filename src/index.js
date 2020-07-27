import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import reducer from './reducers';
import Registration from './components/Registration';
import Battle from './components/Battle';
import * as serviceWorker from './serviceWorker';

// const enhancer = process.env.NODE_ENV === 'development' ?
//   composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
// const store = createStore(reducer, enhancer)
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Registration} />
        <Route exact path="/battle" component={Battle} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();