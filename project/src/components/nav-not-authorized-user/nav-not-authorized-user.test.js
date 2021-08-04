import React from 'react';
import NavNotAuthorizedUser from './nav-not-authorized-user.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';

import { AuthorizationStatus } from '../../consts.js';

let history;
const mockStore = configureStore({});

describe('Component NavNotAuthorizedUser:', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <NavNotAuthorizedUser />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
