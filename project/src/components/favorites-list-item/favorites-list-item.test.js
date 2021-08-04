import React from 'react';
import FavoritesListItem from './favorites-list-item.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createApi } from '../../services/api.js';

import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppRoute, AuthorizationStatus } from '../../consts.js';
import { testOffers } from '../../test-data.js';

let history;
let store;
let api;

describe('Component FavoritesListItem:', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    api = createApi(() => {});
    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, userEmail: 'test@mail.ru'},
      DATA: {offers: testOffers, favoriteOffers: []},
    });
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push(AppRoute.FAVORITES);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <FavoritesListItem offers={testOffers} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    const [firstLink] = screen.getAllByRole('link');
    userEvent.click(firstLink);
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
