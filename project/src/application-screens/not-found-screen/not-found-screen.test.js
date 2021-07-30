import React from 'react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {render} from '@testing-library/react';
import NotFoundScreen from './not-found-screen.jsx';

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
