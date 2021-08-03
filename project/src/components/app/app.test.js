import React from 'react';
import App from './app.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { testOffers } from '../../store/test-data.js';
import thunk from 'redux-thunk';
import { createApi } from '../../services/api.js';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';

import { AppRoute, AuthorizationStatus } from '../../consts.js';

let history = null;
let store = null;
let fakeApp = null;
let api = null;

describe('App routing for authorized user:', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    api = createApi(() => {});

    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      DATA: {isDataLoaded: true, offers: testOffers, favoriteOffers: [], nearestOffers: [], reviews: []},
      CHANGE: {activeCity: 'Paris'},
      USER: {authorizationStatus: AuthorizationStatus.AUTH, userEmail: 'test@mail.ru', userAvatarUrl: null},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.ROOT);
    render(fakeApp);

    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/test@mail.ru/i)).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.FAVORITES);
    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/test@mail.ru/i)).toBeInTheDocument();
  });

  it('should render "OfferPropertyScreen" with comment sending form when user navigate to "/offer/:id"', () => {
    history.push('/offer/111');
    render(fakeApp);

    expect(screen.getByText(/test@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('should render "MainScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.LOGIN);
    render(fakeApp);

    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/test@mail.ru/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-root');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to the main page')).toBeInTheDocument();
  });
});

describe('App routing for non-authorized user:', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    api = createApi(() => {});

    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      DATA: {isDataLoaded: true, offers: testOffers, favoriteOffers: [], nearestOffers: [], reviews: []},
      CHANGE: {activeCity: 'Paris'},
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH, userEmail: null, userAvatarUrl: null},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.ROOT);
    render(fakeApp);

    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.FAVORITES);
    render(fakeApp);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.LOGIN);
    render(fakeApp);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "OfferPropertyScreen" without comment sending form when user navigate to "/offer/:id"', () => {
    history.push('/offer/111');
    render(fakeApp);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-root');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to the main page')).toBeInTheDocument();
  });
});
