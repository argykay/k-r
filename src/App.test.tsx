import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders hero video on default English home', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/introduction/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /pause video/i })).toBeInTheDocument();
});

test('renders hero video on /en', () => {
  render(
    <MemoryRouter initialEntries={['/en']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/introduction/i)).toBeInTheDocument();
});
