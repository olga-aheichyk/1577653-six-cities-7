import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createApi} from './services/api.js';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app.jsx';
import {reviews} from './mocks/reviews.js';
import {reducer} from './store/reducer.js';
import {ActionCreator} from './store/action.js';
import {checkAuth, fetchOffersList} from './store/api-actions.js';
import {AuthorizationStatus} from './consts.js';
import {redirect} from './store/middlewares/redirect.js';

const api = createApi(
  () => store.dispatch(ActionCreator.authorizationRequired(AuthorizationStatus.NO_AUTH)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

store.dispatch(checkAuth());
store.dispatch(fetchOffersList());

ReactDOM.render(
  <Provider store={store}>
    <App
      reviews={reviews}
    />
  </Provider>,
  document.getElementById('root'));
