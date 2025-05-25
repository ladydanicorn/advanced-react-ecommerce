import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock react-router-dom before importing the component
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    Link: ({ children, to }) => <a href={to} data-testid="link">{children}</a>,
  };
});

// Mock the useCart hook
jest.mock('../../hooks/useCart', () => ({
  __esModule: true,
  default: () => ({
    addItem: jest.fn(),
  }),
}));

// Import the component after mocking
import ProductCard from './ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    category: 'electronics',
    description: 'This is a test product',
    image: 'test.jpg'
  };

  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('viewDetails')).toBeInTheDocument();
    expect(screen.getByText('addToCart')).toBeInTheDocument();
  });
});