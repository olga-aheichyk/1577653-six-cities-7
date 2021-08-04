import React from 'react';
import CommentPostForm from './comment-post-form.jsx';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


const mockStore = configureStore({});

describe('Component CommentPostForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({DATA: {isCommentSending: false}})}>
        <Router history={history}>
          <CommentPostForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByTestId('textarea'), 'Test comment text');
  });
});
