import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {offers} from './mocks/offers.js';
import {reviews} from './mocks/reviews.js';

const MainSetting = {
  PLACES_COUNT: 315,
};

ReactDOM.render(
  <App
    placesCount={MainSetting.PLACES_COUNT}
    offers={offers}
    reviews={reviews}
  />,
  document.getElementById('root'));
