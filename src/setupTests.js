import React from 'react';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => React.createElement('div', { 'data-testid': 'browser-router' }, children),
  Routes: ({ children }) => React.createElement('div', { 'data-testid': 'routes' }, children),
  Route: ({ children }) => React.createElement('div', { 'data-testid': 'route' }, children),
  Navigate: () => React.createElement('div', { 'data-testid': 'navigate' }, 'Navigate'),
  Link: ({ children, to }) => React.createElement('a', { href: to, 'data-testid': 'link' }, children),
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/' }),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

// Mock components
jest.mock('./components/auth/Login', () => () => React.createElement('div', { 'data-testid': 'login-component' }, 'Login Component'));
jest.mock('./components/auth/Register', () => () => React.createElement('div', { 'data-testid': 'register-component' }, 'Register Component'));
jest.mock('./components/user/Profile', () => () => React.createElement('div', { 'data-testid': 'profile-component' }, 'Profile Component'));
jest.mock('./components/products/ProductList', () => () => React.createElement('div', { 'data-testid': 'product-list-component' }, 'ProductList Component'));
jest.mock('./components/products/ProductDetail', () => () => React.createElement('div', { 'data-testid': 'product-detail-component' }, 'ProductDetail Component'));
jest.mock('./components/cart/Cart', () => () => React.createElement('div', { 'data-testid': 'cart-component' }, 'Cart Component'));
jest.mock('./components/common/Navbar', () => () => React.createElement('div', { 'data-testid': 'navbar-component' }, 'Navbar Component'));
jest.mock('./components/orders/OrderHistory', () => () => React.createElement('div', { 'data-testid': 'order-history-component' }, 'OrderHistory Component'));
