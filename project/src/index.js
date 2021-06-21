import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app.jsx';
import {offers} from './mocks/offers.js';
import {reviews} from './mocks/reviews.js';
import {reducer} from './store/reducer.js';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <Provider store={store}>
    <App
      offers={offers}
      reviews={reviews}
    />
  </Provider>,
  document.getElementById('root'));
