import React from 'react';
import NavAuthorizedUser from './nav-authorized-user.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';

import { AuthorizationStatus } from '../../consts.js';

let history;
const mockStore = configureStore({});

describe('Component NavAuthorizedUser:', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render NavAuthorizedUser correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, userEmail: 'test@mail.ru', userAvatarUrl: null},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <NavAuthorizedUser />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/test@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
