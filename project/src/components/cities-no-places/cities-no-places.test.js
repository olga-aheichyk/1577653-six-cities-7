import React from 'react';
import CitiesNoPlaces from './cities-no-places.jsx';
import { render, screen } from '@testing-library/react';

describe('Component CitiesNoPlaces:', () => {
  it('should render correctly', () => {
    render(<CitiesNoPlaces activeCity={'Paris'} />);
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });
});
