import React from 'react';
import FavoritesNotEmpty from './favorites-not-empty.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';
import { testOffer } from '../../test-data';

describe('Component FavoritesNotEmpty:', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const mockStore = configureStore({});

    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <FavoritesNotEmpty favoriteOffers={[testOffer]} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
