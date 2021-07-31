import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './store/root-reducer.js';
import { redirect } from './store/middlewares/redirect.js';
import { authorizationRequired } from './store/action.js';
import { createApi } from './services/api.js';

import { Router } from 'react-router-dom';
import browserHistory from './browser-history.js';

import App from './components/app/app.jsx';

import { AuthorizationStatus } from './consts.js';


const api = createApi(
  () => store.dispatch(authorizationRequired(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root'));
