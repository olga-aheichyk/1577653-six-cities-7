import React from 'react';
import OfferPropertyScreen from './offer-property-screen.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createApi } from '../../services/api.js';

import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';

import { AppRoute, AuthorizationStatus } from '../../consts.js';
import { testOffers, testReviews } from '../../test-data.js';

let store;
let api;

describe('Component OfferPropertyScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    api = createApi(() => {});
    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, userEmail: 'test@mail.ru'},
      DATA: {offers: testOffers, nearestOffers: testOffers, reviews: testReviews, isDataLoaded: true},
    });

    history.push('/offer/111');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.OFFER}
              render={() => <OfferPropertyScreen />}
            />
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/test@mail.ru/i)).toBeInTheDocument();
  });
});
