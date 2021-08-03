import React from 'react';
import LogInScreen from './log-in-screen.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppRoute } from '../../consts.js';

const mockStore = configureStore({});

describe('Component LogInScreen', () => {
  it('should render LogInScreen when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.LOGIN);

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <LogInScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/test@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
