import React from 'react';
import NotFoundScreen from './not-found-screen.jsx';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render } from '@testing-library/react';


describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {getByText} = render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>,
    );

    const headerElement = getByText('404. Page not found');
    const linkElement = getByText('Back to the main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
