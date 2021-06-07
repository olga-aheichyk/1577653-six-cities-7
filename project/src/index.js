import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const MainSetting = {
  PLACES_COUNT: 315,
};

ReactDOM.render(
  <App
    placesCount={MainSetting.PLACES_COUNT}
  />,
  document.getElementById('root'));
