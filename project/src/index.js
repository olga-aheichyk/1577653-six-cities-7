import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {createApi} from './services/api.js';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import rootReducer from './store/root-reducer.js';
import {authorizationRequired} from './store/action.js';
import {AuthorizationStatus} from './consts.js';
import {redirect} from './store/middlewares/redirect.js';

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
    <App/>
  </Provider>,
  document.getElementById('root'));
