import React from 'react';
import FavoritesScreen from './favorites-screen.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createApi } from '../../services/api.js';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';

import { AuthorizationStatus } from '../../consts.js';
import { testOffers } from '../../test-data.js';

let store;
let api;

describe('Component FavoritesScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    api = createApi(() => {});
    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, userEmail: 'test@mail.ru'},
      DATA: {offers: testOffers, favoriteOffers: []},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/test@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});
