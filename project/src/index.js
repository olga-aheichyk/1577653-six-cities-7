import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createApi} from './services/api.js';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app.jsx';
//import {offers} from './mocks/offers.js';
import {reviews} from './mocks/reviews.js';
import {reducer} from './store/reducer.js';
import {ActionCreator} from './store/action.js';
import {checkAuth, fetchOffersList} from './store/api-actions.js';
import {AuthorizationStatus} from './consts.js';

const api = createApi(
  () => store.dispatch(ActionCreator.authorizationRequired(AuthorizationStatus.NO_AUTH)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(checkAuth());
store.dispatch(fetchOffersList());

ReactDOM.render(
  <Provider store={store}>
    <App
      // offers={offers}
      reviews={reviews}
    />
  </Provider>,
  document.getElementById('root'));
