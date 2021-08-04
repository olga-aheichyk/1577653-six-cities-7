import React from 'react';
import CitiesPlaces from './cities-places.jsx';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { render, screen } from '@testing-library/react';
import { testOffer } from '../../test-data.js';


const mockStore = configureStore({});
describe('Component CitiesPlaces:', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesPlaces
            activeCity={'Paris'}
            activeCityOffers={[testOffer]}
            onPlaceCardHover={() => {}}
            onPlaceCardAwayHover={() => {}}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/1 place to stay in Paris/i)).toBeInTheDocument();
  });
});
