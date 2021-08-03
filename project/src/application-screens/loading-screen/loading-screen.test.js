import React from 'react';
import LoadingScreen from './loading-screen.jsx';
import { render, screen } from '@testing-library/react';

describe('Component LoadingScreen:', () => {
  it('should render correctly', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
