import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/cartSlice';
import Cart from './Cart';

// Mock the translation function
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => {
        // Return a simple mapping for keys used in the component
        const translations = {
          'yourShoppingCart': 'Your Shopping Cart',
          'emptyCart': 'Your cart is empty. Start shopping to add items to your cart!',
          'totalItems': 'Total Items',
          'totalAmount': 'Total Amount',
          'price': 'Price',
          'total': 'Total',
          'checkout': 'Checkout',
          'clearCart': 'Clear Cart',
          'remove': 'Remove',
          'orderSuccess': 'Thank you for your purchase! Your order has been placed.'
        };
        return translations[key] || key;
      }
    };
  }
}));

global.alert = jest.fn();

const setupStore = (initialState) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: initialState,
    },
  });
};

describe('Cart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty cart message when cart is empty', () => {
    const emptyCartState = {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
    
    const store = setupStore(emptyCartState);
    
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    
    expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty. Start shopping to add items to your cart!')).toBeInTheDocument();
  });
  
  test('renders cart items when cart has items', () => {
    const cartWithItemsState = {
      items: [
        {
          id: 1,
          title: 'Test Product 1',
          price: 29.99,
          image: 'https://fakestoreapi.com/img/test1.jpg',
          quantity: 2,
          totalPrice: 59.98,
        },
        {
          id: 2,
          title: 'Test Product 2',
          price: 49.99,
          image: 'https://fakestoreapi.com/img/test2.jpg',
          quantity: 1,
          totalPrice: 49.99,
        },
      ],
      totalQuantity: 3,
      totalAmount: 109.97,
    };
    
    const store = setupStore(cartWithItemsState);
    
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    
    // Check if cart summary and items are displayed
    expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Total Items: 3')).toBeInTheDocument();
    expect(screen.getByText('Total Amount: $109.97')).toBeInTheDocument();
    
    // Check if both products are displayed
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    
    // Check if product details are displayed
    expect(screen.getByText('Price: $29.99')).toBeInTheDocument();
    expect(screen.getByText('Total: $59.98')).toBeInTheDocument();
    expect(screen.getByText('Price: $49.99')).toBeInTheDocument();
    expect(screen.getByText('Total: $49.99')).toBeInTheDocument();
  });
  
  test('checkout button clears the cart and shows success message', () => {
    const cartWithItemsState = {
      items: [
        {
          id: 1,
          title: 'Test Product 1',
          price: 29.99,
          image: 'https://fakestoreapi.com/img/test1.jpg',
          quantity: 2,
          totalPrice: 59.98,
        }
      ],
      totalQuantity: 2,
      totalAmount: 59.98,
    };
    
    const store = setupStore(cartWithItemsState);
    
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    
    // Click Checkout button
    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);
    
    // Alert called with success message
    expect(global.alert).toHaveBeenCalledWith('Thank you for your purchase! Your order has been placed.');
    
    // Check if the cart is now empty
    expect(screen.getByText('Your cart is empty. Start shopping to add items to your cart!')).toBeInTheDocument();
  });
});