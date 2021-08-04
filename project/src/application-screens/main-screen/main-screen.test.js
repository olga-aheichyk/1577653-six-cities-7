import React from 'react';
import MainScreen from './main-screen.jsx';

import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import { createApi } from '../../services/api.js';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AuthorizationStatus } from '../../consts.js';
import { testOffers } from '../../test-data.js';

let history = null;
let store = null;
let api = null;

describe('Component MainScreen:', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    api = createApi(() => {});

    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      DATA: {isDataLoaded: true, offers: testOffers, favoriteOffers: []},
      CHANGE: {activeCity: 'Paris'},
      USER: {authorizationStatus: AuthorizationStatus.AUTH, userEmail: 'test@mail.ru', userAvatarUrl: null},
    });
  });

  it('should invoke redux dispatch function on city click', () => {
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('city'));
    expect(useDispatch).toBeCalledTimes(2);
  });
});

