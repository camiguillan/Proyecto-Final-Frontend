import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

// Esta funcion no existe y ademas no se llama nunca. para que es esto?
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
