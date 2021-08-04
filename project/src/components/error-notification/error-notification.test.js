import React from 'react';
import ErrorNotification from './error-notification.jsx';
import { render, screen } from '@testing-library/react';

describe('Component ErrorNotification:', () => {
  it('should render correctly', () => {
    render(<ErrorNotification />);
    expect(screen.getByText(/Something went wrong. Please retry later/i)).toBeInTheDocument();
  });
});
