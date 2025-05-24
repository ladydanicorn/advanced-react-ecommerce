import React from 'react';
import { render, screen } from '@testing-library/react';


const ProductCard = ({ product }) => (
  <div className="product-card">
    <div className="product-title">{product.title}</div>
    <div className="product-category">{product.category}</div>
    <div className="product-price">${product.price.toFixed(2)}</div>
    <a href={`/product/${product.id}`}>View Details</a>
    <button>Add to Cart</button>
  </div>
);

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
    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
});