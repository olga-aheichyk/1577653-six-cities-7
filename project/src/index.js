import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const MainSetting = {
  PLACES_COUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      placesCount={MainSetting.PLACES_COUNT}
    />
  </React.StrictMode>,
  document.getElementById('root'));
