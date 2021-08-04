import React from 'react';
import FavoritesEmpty from './favorites-empty.jsx';
import { render, screen } from '@testing-library/react';

describe('Component FavoritesEmpty:', () => {
  it('should render correctly', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips/i)).toBeInTheDocument();
  });
});
